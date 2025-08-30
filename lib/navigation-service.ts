export interface NavigationItem {
  id: string
  menu_id: string
  label: string
  type: "main" | "submenu"
  parent_id?: string
  url: string
  icon?: string
  is_enabled: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface NavigationSettings {
  items: NavigationItem[]
  lastUpdated: string
}

export class NavigationService {
  private baseUrl = "https://api.airtable.com/v0"
  private baseId = process.env.AIRTABLE_BASE_ID
  private apiKey = process.env.AIRTABLE_API_KEY
  private tableName = "Navigation Settings"

  private criticalPages = ["home", "contact", "booking"]

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
    }
  }

  async getAllNavigationItems(): Promise<NavigationItem[]> {
    try {
      if (!this.baseId || !this.apiKey) {
        console.log("[v0] Navigation API: Missing Airtable credentials")
        return this.getDefaultNavigation()
      }

      const url = `${this.baseUrl}/${this.baseId}/${encodeURIComponent(this.tableName)}?sort[0][field]=sort_order&sort[0][direction]=asc`

      console.log("[v0] Navigation API: Fetching navigation items from Airtable")
      const response = await fetch(url, {
        headers: this.getHeaders(),
        cache: "no-store",
      })

      if (!response.ok) {
        console.log("[v0] Navigation API: Failed to fetch from Airtable:", response.status)
        return this.getDefaultNavigation()
      }

      const data = await response.json()

      const items: NavigationItem[] = data.records.map((record: any) => ({
        id: record.id,
        menu_id: record.fields.menu_id || "",
        label: record.fields.label || "",
        type: record.fields.type || "main",
        parent_id: record.fields.parent_id || null,
        url: record.fields.url || "",
        icon: record.fields.icon || null,
        is_enabled: record.fields.is_enabled !== false,
        sort_order: record.fields.sort_order || 0,
        created_at: record.fields.created_at || new Date().toISOString(),
        updated_at: record.fields.updated_at || new Date().toISOString(),
      }))

      console.log("[v0] Navigation API: Successfully fetched", items.length, "navigation items")
      return items
    } catch (error) {
      console.error("[v0] Navigation API: Error fetching navigation items:", error)
      return this.getDefaultNavigation()
    }
  }

  async updateNavigationItem(id: string, updates: Partial<NavigationItem>): Promise<NavigationItem | null> {
    try {
      if (!this.baseId || !this.apiKey) {
        throw new Error("Missing Airtable credentials")
      }

      const url = `${this.baseUrl}/${this.baseId}/${encodeURIComponent(this.tableName)}/${id}`

      const response = await fetch(url, {
        method: "PATCH",
        headers: this.getHeaders(),
        body: JSON.stringify({
          fields: {
            ...updates,
            updated_at: new Date().toISOString(),
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to update navigation item: ${response.status}`)
      }

      const data = await response.json()
      return this.mapRecordToNavigationItem(data)
    } catch (error) {
      console.error("[v0] Navigation API: Error updating navigation item:", error)
      return null
    }
  }

  async createNavigationItem(
    item: Omit<NavigationItem, "id" | "created_at" | "updated_at">,
  ): Promise<NavigationItem | null> {
    try {
      if (!this.baseId || !this.apiKey) {
        throw new Error("Missing Airtable credentials")
      }

      const url = `${this.baseUrl}/${this.baseId}/${encodeURIComponent(this.tableName)}`

      const response = await fetch(url, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({
          fields: {
            ...item,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to create navigation item: ${response.status}`)
      }

      const data = await response.json()
      return this.mapRecordToNavigationItem(data)
    } catch (error) {
      console.error("[v0] Navigation API: Error creating navigation item:", error)
      return null
    }
  }

  async deleteNavigationItem(id: string): Promise<boolean> {
    try {
      if (!this.baseId || !this.apiKey) {
        throw new Error("Missing Airtable credentials")
      }

      const item = await this.getNavigationItemById(id)
      if (item && this.criticalPages.includes(item.menu_id.toLowerCase())) {
        console.warn("[v0] Navigation Service: Attempted to delete critical page:", item.menu_id)
        throw new Error(`Cannot delete critical page: ${item.label}`)
      }

      const url = `${this.baseUrl}/${this.baseId}/${encodeURIComponent(this.tableName)}/${id}`

      const response = await fetch(url, {
        method: "DELETE",
        headers: this.getHeaders(),
      })

      return response.ok
    } catch (error) {
      console.error("[v0] Navigation API: Error deleting navigation item:", error)
      return false
    }
  }

  async getNavigationItemById(id: string): Promise<NavigationItem | null> {
    try {
      if (!this.baseId || !this.apiKey) {
        return null
      }

      const url = `${this.baseUrl}/${this.baseId}/${encodeURIComponent(this.tableName)}/${id}`

      const response = await fetch(url, {
        headers: this.getHeaders(),
        cache: "no-store",
      })

      if (!response.ok) {
        return null
      }

      const data = await response.json()
      return this.mapRecordToNavigationItem(data)
    } catch (error) {
      console.error("[v0] Navigation API: Error fetching navigation item:", error)
      return null
    }
  }

  async createBackup(): Promise<{ success: boolean; backup?: NavigationItem[]; error?: string }> {
    try {
      const items = await this.getAllNavigationItems()
      const backup = {
        timestamp: new Date().toISOString(),
        items,
      }

      // Store backup in localStorage for now (could be enhanced to use a proper backup service)
      if (typeof window !== "undefined") {
        const backups = JSON.parse(localStorage.getItem("navigation_backups") || "[]")
        backups.unshift(backup)
        // Keep only last 10 backups
        backups.splice(10)
        localStorage.setItem("navigation_backups", JSON.stringify(backups))
      }

      return { success: true, backup: items }
    } catch (error) {
      console.error("[v0] Navigation Service: Error creating backup:", error)
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
    }
  }

  async restoreFromBackup(backupItems: NavigationItem[]): Promise<boolean> {
    try {
      // First, delete all existing items (except critical ones)
      const currentItems = await this.getAllNavigationItems()
      for (const item of currentItems) {
        if (!this.criticalPages.includes(item.menu_id.toLowerCase())) {
          await this.deleteNavigationItem(item.id)
        }
      }

      // Then restore from backup
      for (const item of backupItems) {
        const { id, created_at, updated_at, ...itemData } = item
        await this.createNavigationItem(itemData)
      }

      return true
    } catch (error) {
      console.error("[v0] Navigation Service: Error restoring from backup:", error)
      return false
    }
  }

  async validateNavigationStructure(): Promise<{ isValid: boolean; errors: string[] }> {
    const errors: string[] = []
    const items = await this.getAllNavigationItems()
    const enabledItems = items.filter((item) => item.is_enabled)

    // Check if there's at least one enabled main menu item
    const enabledMainItems = enabledItems.filter((item) => item.type === "main")
    if (enabledMainItems.length === 0) {
      errors.push("At least one main menu item must be enabled")
    }

    // Check if all submenu items have valid parents
    const submenuItems = enabledItems.filter((item) => item.type === "submenu")
    const mainItemIds = enabledMainItems.map((item) => item.id)

    for (const submenu of submenuItems) {
      if (submenu.parent_id && !mainItemIds.includes(submenu.parent_id)) {
        errors.push(`Submenu "${submenu.label}" has invalid or disabled parent`)
      }
    }

    // Check for duplicate menu_ids
    const menuIds = items.map((item) => item.menu_id)
    const duplicateIds = menuIds.filter((id, index) => menuIds.indexOf(id) !== index)
    if (duplicateIds.length > 0) {
      errors.push(`Duplicate menu IDs found: ${duplicateIds.join(", ")}`)
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  async batchUpdateSortOrder(updates: { id: string; sort_order: number }[]): Promise<boolean> {
    try {
      if (!this.baseId || !this.apiKey) {
        throw new Error("Missing Airtable credentials")
      }

      const url = `${this.baseUrl}/${this.baseId}/${encodeURIComponent(this.tableName)}`

      const records = updates.map((update) => ({
        id: update.id,
        fields: {
          sort_order: update.sort_order,
          updated_at: new Date().toISOString(),
        },
      }))

      const response = await fetch(url, {
        method: "PATCH",
        headers: this.getHeaders(),
        body: JSON.stringify({ records }),
      })

      return response.ok
    } catch (error) {
      console.error("[v0] Navigation API: Error batch updating sort order:", error)
      return false
    }
  }

  private mapRecordToNavigationItem(record: any): NavigationItem {
    return {
      id: record.id,
      menu_id: record.fields.menu_id || "",
      label: record.fields.label || "",
      type: record.fields.type || "main",
      parent_id: record.fields.parent_id || null,
      url: record.fields.url || "",
      icon: record.fields.icon || null,
      is_enabled: record.fields.is_enabled !== false,
      sort_order: record.fields.sort_order || 0,
      created_at: record.fields.created_at || new Date().toISOString(),
      updated_at: record.fields.updated_at || new Date().toISOString(),
    }
  }

  private getDefaultNavigation(): NavigationItem[] {
    return [
      {
        id: "default-1",
        menu_id: "home",
        label: "Home",
        type: "main",
        url: "/",
        is_enabled: true,
        sort_order: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "default-2",
        menu_id: "destinations",
        label: "Destinations",
        type: "main",
        url: "/destinations",
        is_enabled: true,
        sort_order: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "default-3",
        menu_id: "fleet-booking",
        label: "Fleet & Booking",
        type: "main",
        url: "/fleet",
        is_enabled: true,
        sort_order: 3,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "default-4",
        menu_id: "shop",
        label: "Shop",
        type: "main",
        url: "/shop",
        is_enabled: true,
        sort_order: 4,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "default-5",
        menu_id: "about",
        label: "About",
        type: "main",
        url: "/about",
        is_enabled: true,
        sort_order: 5,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]
  }
}

export const navigationService = new NavigationService()
