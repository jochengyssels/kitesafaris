"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Plus, Edit, Trash2, Search, Filter, GripVertical, Eye, EyeOff, RefreshCw, Menu, Save, X } from "lucide-react"
import type { NavigationItem } from "@/lib/navigation-service"

interface NavigationManagerProps {
  className?: string
}

interface MenuItemFormData {
  menu_id: string
  label: string
  type: "main" | "submenu"
  parent_id?: string
  url: string
  icon?: string
  is_enabled: boolean
  sort_order: number
}

export function NavigationManager({ className }: NavigationManagerProps) {
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "main" | "submenu">("all")
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<NavigationItem | null>(null)
  const [draggedItem, setDraggedItem] = useState<NavigationItem | null>(null)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<MenuItemFormData>({
    menu_id: "",
    label: "",
    type: "main",
    parent_id: "",
    url: "",
    icon: "",
    is_enabled: true,
    sort_order: 1,
  })
  const [formErrors, setFormErrors] = useState<Partial<MenuItemFormData>>({})

  useEffect(() => {
    loadNavigationItems()
  }, [])

  const loadNavigationItems = async () => {
    try {
      setLoading(true)
      console.log("[v0] Navigation Manager: Loading navigation items")

      const response = await fetch("/api/admin/navigation")
      const result = await response.json()

      if (result.success) {
        setNavigationItems(result.data)
        console.log("[v0] Navigation Manager: Loaded", result.data.length, "items")
      } else {
        console.error("[v0] Navigation Manager: Failed to load items:", result.error)
      }
    } catch (error) {
      console.error("[v0] Navigation Manager: Error loading items:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredItems = navigationItems.filter((item) => {
    const matchesSearch =
      item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.url.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || item.type === filterType
    return matchesSearch && matchesFilter
  })

  const mainMenuItems = filteredItems.filter((item) => item.type === "main")
  const submenuItems = filteredItems.filter((item) => item.type === "submenu")

  const handleToggleEnabled = async (item: NavigationItem) => {
    try {
      setSaving(true)
      console.log("[v0] Navigation Manager: Toggling enabled status for", item.label)

      const response = await fetch("/api/admin/navigation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          id: item.id,
          is_enabled: !item.is_enabled,
        }),
      })

      const result = await response.json()
      if (result.success) {
        setNavigationItems((prev) =>
          prev.map((navItem) => (navItem.id === item.id ? { ...navItem, is_enabled: !navItem.is_enabled } : navItem)),
        )
      } else {
        console.error("[v0] Navigation Manager: Failed to toggle item:", result.error)
      }
    } catch (error) {
      console.error("[v0] Navigation Manager: Error toggling item:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteItem = async (item: NavigationItem) => {
    try {
      setSaving(true)
      console.log("[v0] Navigation Manager: Deleting item", item.label)

      const response = await fetch("/api/admin/navigation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete",
          id: item.id,
        }),
      })

      const result = await response.json()
      if (result.success) {
        setNavigationItems((prev) => prev.filter((navItem) => navItem.id !== item.id))
      } else {
        console.error("[v0] Navigation Manager: Failed to delete item:", result.error)
      }
    } catch (error) {
      console.error("[v0] Navigation Manager: Error deleting item:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleDragStart = (item: NavigationItem) => {
    setDraggedItem(item)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = async (e: React.DragEvent, targetItem: NavigationItem) => {
    e.preventDefault()
    if (!draggedItem || draggedItem.id === targetItem.id) return

    try {
      setSaving(true)
      console.log("[v0] Navigation Manager: Reordering items")

      // Create new order based on drag and drop
      const itemsOfSameType = navigationItems.filter((item) => item.type === draggedItem.type)
      const otherItems = navigationItems.filter((item) => item.type !== draggedItem.type)

      const reorderedItems = itemsOfSameType.filter((item) => item.id !== draggedItem.id)
      const targetIndex = reorderedItems.findIndex((item) => item.id === targetItem.id)

      reorderedItems.splice(targetIndex, 0, draggedItem)

      // Update sort orders
      const updates = reorderedItems.map((item, index) => ({
        id: item.id,
        sort_order: index + 1,
      }))

      const response = await fetch("/api/admin/navigation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "batch-reorder",
          updates,
        }),
      })

      const result = await response.json()
      if (result.success) {
        // Update local state
        const updatedItems = [
          ...otherItems,
          ...reorderedItems.map((item, index) => ({
            ...item,
            sort_order: index + 1,
          })),
        ].sort((a, b) => a.sort_order - b.sort_order)

        setNavigationItems(updatedItems)
      } else {
        console.error("[v0] Navigation Manager: Failed to reorder items:", result.error)
      }
    } catch (error) {
      console.error("[v0] Navigation Manager: Error reordering items:", error)
    } finally {
      setSaving(false)
      setDraggedItem(null)
    }
  }

  const renderNavigationTable = (items: NavigationItem[], title: string) => (
    <Card className="bg-white/10 backdrop-blur-md border-turquoise-200/20">
      <CardHeader>
        <CardTitle className="font-montserrat text-deep-navy-900 flex items-center gap-2">
          <Menu className="w-5 h-5" />
          {title}
          <Badge variant="secondary" className="ml-2">
            {items.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg overflow-hidden border border-turquoise-200/20">
          <Table>
            <TableHeader>
              <TableRow className="bg-turquoise-50/50">
                <TableHead className="w-8"></TableHead>
                <TableHead className="font-montserrat text-deep-navy-800">Label</TableHead>
                <TableHead className="font-montserrat text-deep-navy-800">URL</TableHead>
                <TableHead className="font-montserrat text-deep-navy-800">Parent</TableHead>
                <TableHead className="font-montserrat text-deep-navy-800">Status</TableHead>
                <TableHead className="font-montserrat text-deep-navy-800">Order</TableHead>
                <TableHead className="font-montserrat text-deep-navy-800">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-turquoise-50/30 transition-colors"
                  draggable
                  onDragStart={() => handleDragStart(item)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, item)}
                >
                  <TableCell>
                    <GripVertical className="w-4 h-4 text-gray-400 cursor-grab" />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {item.icon && <span className="text-sm">{item.icon}</span>}
                      {item.label}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-gray-600">{item.url}</TableCell>
                  <TableCell>
                    {item.parent_id ? (
                      <Badge variant="outline" className="text-xs">
                        {navigationItems.find((p) => p.id === item.parent_id)?.label || "Unknown"}
                      </Badge>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={item.is_enabled}
                        onCheckedChange={() => handleToggleEnabled(item)}
                        disabled={saving}
                      />
                      {item.is_enabled ? (
                        <Eye className="w-4 h-4 text-green-600" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {item.sort_order}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleEditItem(item)} className="h-8 w-8 p-0">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Navigation Item</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{item.label}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteItem(item)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )

  const validateForm = (): boolean => {
    const errors: Partial<MenuItemFormData> = {}

    if (!formData.label.trim()) {
      errors.label = "Label is required"
    }

    if (!formData.url.trim()) {
      errors.url = "URL is required"
    } else if (!isValidUrl(formData.url)) {
      errors.url = "Please enter a valid URL (e.g., /page or https://example.com)"
    }

    if (formData.type === "submenu" && !formData.parent_id) {
      errors.parent_id = "Parent menu is required for submenu items"
    }

    if (!formData.menu_id.trim()) {
      errors.menu_id = "Menu ID is required"
    } else if (!/^[a-z0-9-_]+$/.test(formData.menu_id)) {
      errors.menu_id = "Menu ID can only contain lowercase letters, numbers, hyphens, and underscores"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValidUrl = (url: string): boolean => {
    // Allow relative URLs starting with / or absolute URLs
    return url.startsWith("/") || /^https?:\/\/.+/.test(url)
  }

  const generateMenuId = (label: string): string => {
    return label
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const resetForm = () => {
    const nextSortOrder = Math.max(...navigationItems.map((item) => item.sort_order), 0) + 1
    setFormData({
      menu_id: "",
      label: "",
      type: "main",
      parent_id: "",
      url: "",
      icon: "",
      is_enabled: true,
      sort_order: nextSortOrder,
    })
    setFormErrors({})
  }

  const handleEditItem = (item: NavigationItem) => {
    setEditingItem(item)
    setFormData({
      menu_id: item.menu_id,
      label: item.label,
      type: item.type,
      parent_id: item.parent_id || "",
      url: item.url,
      icon: item.icon || "",
      is_enabled: item.is_enabled,
      sort_order: item.sort_order,
    })
    setFormErrors({})
    setIsEditModalOpen(true)
  }

  const handleAddItem = () => {
    setEditingItem(null)
    resetForm()
    setIsEditModalOpen(true)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setSaving(true)
      console.log("[v0] Navigation Manager: Submitting form", editingItem ? "edit" : "create")

      const action = editingItem ? "update" : "create"
      const payload = editingItem ? { action, id: editingItem.id, ...formData } : { action, ...formData }

      const response = await fetch("/api/admin/navigation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const result = await response.json()
      if (result.success) {
        if (editingItem) {
          // Update existing item
          setNavigationItems((prev) =>
            prev.map((item) => (item.id === editingItem.id ? { ...item, ...formData } : item)),
          )
        } else {
          // Add new item
          setNavigationItems((prev) => [...prev, result.data])
        }
        setIsEditModalOpen(false)
        resetForm()
      } else {
        console.error("[v0] Navigation Manager: Failed to save item:", result.error)
        // You could show an error toast here
      }
    } catch (error) {
      console.error("[v0] Navigation Manager: Error saving item:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleLabelChange = (label: string) => {
    setFormData((prev) => ({
      ...prev,
      label,
      menu_id: prev.menu_id || generateMenuId(label), // Only auto-generate if menu_id is empty
    }))
  }

  const availableParents = mainMenuItems.filter((item) => item.id !== editingItem?.id)

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="w-6 h-6 animate-spin text-turquoise-500" />
        <span className="ml-2 text-deep-navy-700">Loading navigation settings...</span>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-montserrat font-bold text-deep-navy-900">Navigation Manager</h2>
          <p className="text-deep-navy-600 font-open-sans">
            Manage menu items, visibility, and ordering for the main navigation
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={loadNavigationItems}
            variant="outline"
            size="sm"
            disabled={loading}
            className="border-turquoise-200 hover:bg-turquoise-50 bg-transparent"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={handleAddItem} className="bg-coral-orange-500 hover:bg-coral-orange-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Menu Item
          </Button>
        </div>
      </div>

      <Card className="bg-white/10 backdrop-blur-md border-turquoise-200/20">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search menu items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/50 border-turquoise-200/40"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
                <SelectTrigger className="bg-white/50 border-turquoise-200/40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Items</SelectItem>
                  <SelectItem value="main">Main Menu</SelectItem>
                  <SelectItem value="submenu">Submenus</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {(filterType === "all" || filterType === "main") && renderNavigationTable(mainMenuItems, "Main Menu Items")}
        {(filterType === "all" || filterType === "submenu") && renderNavigationTable(submenuItems, "Submenu Items")}
      </div>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-montserrat text-deep-navy-900">
              {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
            </DialogTitle>
            <DialogDescription className="font-open-sans text-deep-navy-600">
              {editingItem ? "Update the menu item details below." : "Create a new menu item for the navigation."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Label Field */}
              <div className="space-y-2">
                <Label htmlFor="label" className="font-montserrat font-medium text-deep-navy-800">
                  Menu Label *
                </Label>
                <Input
                  id="label"
                  value={formData.label}
                  onChange={(e) => handleLabelChange(e.target.value)}
                  placeholder="e.g., Destinations"
                  className={`bg-white/50 border-turquoise-200/40 ${formErrors.label ? "border-red-500" : ""}`}
                />
                {formErrors.label && <p className="text-sm text-red-600">{formErrors.label}</p>}
              </div>

              {/* Menu ID Field */}
              <div className="space-y-2">
                <Label htmlFor="menu_id" className="font-montserrat font-medium text-deep-navy-800">
                  Menu ID *
                </Label>
                <Input
                  id="menu_id"
                  value={formData.menu_id}
                  onChange={(e) => setFormData((prev) => ({ ...prev, menu_id: e.target.value }))}
                  placeholder="e.g., destinations"
                  className={`bg-white/50 border-turquoise-200/40 font-mono text-sm ${
                    formErrors.menu_id ? "border-red-500" : ""
                  }`}
                />
                {formErrors.menu_id && <p className="text-sm text-red-600">{formErrors.menu_id}</p>}
                <p className="text-xs text-gray-500">Lowercase letters, numbers, hyphens, and underscores only</p>
              </div>

              {/* Type Field */}
              <div className="space-y-2">
                <Label htmlFor="type" className="font-montserrat font-medium text-deep-navy-800">
                  Menu Type *
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: "main" | "submenu") =>
                    setFormData((prev) => ({ ...prev, type: value, parent_id: value === "main" ? "" : prev.parent_id }))
                  }
                >
                  <SelectTrigger className="bg-white/50 border-turquoise-200/40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main Menu Item</SelectItem>
                    <SelectItem value="submenu">Submenu Item</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Parent Menu Field (only for submenu) */}
              {formData.type === "submenu" && (
                <div className="space-y-2">
                  <Label htmlFor="parent_id" className="font-montserrat font-medium text-deep-navy-800">
                    Parent Menu *
                  </Label>
                  <Select
                    value={formData.parent_id}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, parent_id: value }))}
                  >
                    <SelectTrigger
                      className={`bg-white/50 border-turquoise-200/40 ${formErrors.parent_id ? "border-red-500" : ""}`}
                    >
                      <SelectValue placeholder="Select parent menu" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableParents.map((parent) => (
                        <SelectItem key={parent.id} value={parent.id}>
                          {parent.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formErrors.parent_id && <p className="text-sm text-red-600">{formErrors.parent_id}</p>}
                </div>
              )}

              {/* URL Field */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="url" className="font-montserrat font-medium text-deep-navy-800">
                  URL *
                </Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) => setFormData((prev) => ({ ...prev, url: e.target.value }))}
                  placeholder="e.g., /destinations or https://example.com"
                  className={`bg-white/50 border-turquoise-200/40 font-mono text-sm ${
                    formErrors.url ? "border-red-500" : ""
                  }`}
                />
                {formErrors.url && <p className="text-sm text-red-600">{formErrors.url}</p>}
              </div>

              {/* Icon Field */}
              <div className="space-y-2">
                <Label htmlFor="icon" className="font-montserrat font-medium text-deep-navy-800">
                  Icon (Optional)
                </Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData((prev) => ({ ...prev, icon: e.target.value }))}
                  placeholder="e.g., 🏝️ or shopping-bag"
                  className="bg-white/50 border-turquoise-200/40"
                />
                <p className="text-xs text-gray-500">Emoji or icon identifier</p>
              </div>

              {/* Sort Order Field */}
              <div className="space-y-2">
                <Label htmlFor="sort_order" className="font-montserrat font-medium text-deep-navy-800">
                  Sort Order
                </Label>
                <Input
                  id="sort_order"
                  type="number"
                  min="1"
                  value={formData.sort_order}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, sort_order: Number.parseInt(e.target.value) || 1 }))
                  }
                  className="bg-white/50 border-turquoise-200/40"
                />
              </div>

              {/* Enabled Toggle */}
              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center space-x-3">
                  <Switch
                    id="is_enabled"
                    checked={formData.is_enabled}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_enabled: checked }))}
                  />
                  <Label htmlFor="is_enabled" className="font-montserrat font-medium text-deep-navy-800">
                    Enable this menu item
                  </Label>
                </div>
                <p className="text-xs text-gray-500">Disabled items will not appear in the navigation</p>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
                disabled={saving}
                className="border-turquoise-200 hover:bg-turquoise-50"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={saving}
                className="bg-coral-orange-500 hover:bg-coral-orange-600 text-white"
              >
                {saving ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                {editingItem ? "Update Item" : "Create Item"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {saving && (
        <div className="fixed bottom-4 right-4 bg-turquoise-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin" />
          Saving changes...
        </div>
      )}
    </div>
  )
}
