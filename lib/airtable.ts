export class AirtableService {
  private apiKey: string
  private baseId: string
  private baseUrl: string

  constructor() {
    this.apiKey = process.env.AIRTABLE_API_KEY!
    this.baseId = process.env.AIRTABLE_BASE_ID!
    this.baseUrl = `https://api.airtable.com/v0/${this.baseId}`
    
    if (!this.apiKey || !this.baseId) {
      throw new Error('Missing Airtable configuration: AIRTABLE_API_KEY and AIRTABLE_BASE_ID are required')
    }
  }

  async getRecords(tableName: string, options: {
    maxRecords?: number
    filterByFormula?: string
    sort?: Array<{ field: string; direction: 'asc' | 'desc' }>
  } = {}) {
    const params = new URLSearchParams()
    
    if (options.maxRecords) params.append('maxRecords', options.maxRecords.toString())
    if (options.filterByFormula) params.append('filterByFormula', options.filterByFormula)
    if (options.sort) {
      options.sort.forEach(sort => {
        params.append('sort[0][field]', sort.field)
        params.append('sort[0][direction]', sort.direction)
      })
    }

    const url = `${this.baseUrl}/${tableName}?${params.toString()}`
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  async createRecord(tableName: string, fields: Record<string, any>) {
    const url = `${this.baseUrl}/${tableName}`
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fields
      })
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Airtable API error: ${response.status} ${response.statusText} - ${error}`)
    }

    return response.json()
  }

  async updateRecord(tableName: string, recordId: string, fields: Record<string, any>) {
    const url = `${this.baseUrl}/${tableName}/${recordId}`
    
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fields
      })
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Airtable API error: ${response.status} ${response.statusText} - ${error}`)
    }

    return response.json()
  }

  async deleteRecord(tableName: string, recordId: string) {
    const url = `${this.baseUrl}/${tableName}/${recordId}`
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Airtable API error: ${response.status} ${response.statusText} - ${error}`)
    }

    return response.json()
  }
}
