#!/usr/bin/env node

/**
 * Import Kitespots Data to Airtable
 * 
 * This script imports kitespot data from the JSON file into Airtable's "Kitespots" table.
 * 
 * Usage:
 *   node scripts/import-kitespots-to-airtable.js
 * 
 * Requirements:
 *   - AIRTABLE_API_KEY and AIRTABLE_BASE_ID in .env.local
 *   - "Kitespots" table in Airtable with appropriate fields
 */

const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') })

// Airtable configuration for kitespots
const AIRTABLE_API_KEY = process.env.KITESPOTS_AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.KITESPOTS_AIRTABLE_BASE_ID

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
  console.error('❌ Missing Kitespots Airtable configuration!')
  console.error('Please ensure both KITESPOTS_AIRTABLE_API_KEY and KITESPOTS_AIRTABLE_BASE_ID are set in .env.local')
  console.error('')
  console.error('Example:')
  console.error('KITESPOTS_AIRTABLE_API_KEY=patXXXXXXXXXXXXXX.XXXXXXXXXXXXXX  # Your kitespots API key')
  console.error('KITESPOTS_AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX                 # Your kitespots base ID')
  process.exit(1)
}

const BASE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`
const TABLE_NAME = 'Kitespots'

// Airtable API helper functions
async function createRecord(fields) {
  const url = `${BASE_URL}/${TABLE_NAME}`
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ fields })
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to create record: ${response.status} ${error}`)
  }

  return response.json()
}

async function createRecordsBatch(records) {
  const url = `${BASE_URL}/${TABLE_NAME}`
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ records })
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to create batch: ${response.status} ${error}`)
  }

  return response.json()
}

async function getExistingRecords() {
  const url = `${BASE_URL}/${TABLE_NAME}`
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    const error = await response.text()
    console.error(`❌ API Error: ${response.status} ${error}`)
    
    if (response.status === 403) {
      console.error('')
      console.error('🔧 Troubleshooting steps:')
      console.error('1. Make sure the "Kitespots" table exists in your Airtable base')
      console.error('2. Check that your API key has access to this base')
      console.error('3. Verify the base ID is correct')
      console.error('')
      console.error('📋 To create the table:')
      console.error('- Go to your Airtable base')
      console.error('- Create a new table named "Kitespots"')
      console.error('- Add the required fields (see KITESPOTS_AIRTABLE_SETUP.md)')
      console.error('')
      console.error('🔑 To check API key permissions:')
      console.error('- Go to https://airtable.com/create/tokens')
      console.error('- Make sure your token has access to the kitespots base')
    }
    
    throw new Error(`Failed to get existing records: ${response.status} ${error}`)
  }

  return response.json()
}

// Parse kitespots data from JSON
function parseKitespotsData(data) {
  if (Array.isArray(data)) {
    // Find the table data
    const tableData = data.find(item => item.type === 'table' && item.name === 'spots')
    if (tableData && tableData.data) {
      return tableData.data
    }
  }
  
  // Fallback: assume data is already the spots array
  return data
}

// Transform kitespot data for Airtable
function transformKitespotForAirtable(kitespot) {
  // Keep latitude and longitude as strings (since Airtable fields are configured as text)
  const latitude = kitespot.latitude && kitespot.latitude.trim() !== '' 
    ? kitespot.latitude.trim() 
    : null
  const longitude = kitespot.longitude && kitespot.longitude.trim() !== '' 
    ? kitespot.longitude.trim() 
    : null

  // Debug: Log the first few records to see what we're sending
  if (Math.random() < 0.01) { // Log ~1% of records for debugging
    console.log(`🔍 Debug - ${kitespot.name}: lat="${kitespot.latitude}" -> "${latitude}", lng="${kitespot.longitude}" -> "${longitude}"`)
  }

  // Only include latitude/longitude if they are valid strings
  const fields = {
    'ID': kitespot.id,
    'Name': kitespot.name || '',
    'Airport Code': kitespot.airport_code || '',
    'Country Code': kitespot.iso3 || '',
    'Description': kitespot.description || '',
    'Timezone': kitespot.timezone || '',
    'Status': 'Active',
    'Source': 'Windchaser Database',
    'Import Date': new Date().toISOString().split('T')[0]
  }

  // Only add coordinates if they are valid strings
  if (latitude !== null) {
    fields['Latitude'] = latitude
  }
  if (longitude !== null) {
    fields['Longitude'] = longitude
  }

  return { fields }
}

// Main import function
async function importKitespots() {
  try {
    console.log('🚀 Starting kitespots import to Airtable...')
    console.log(`📊 Base ID: ${AIRTABLE_BASE_ID}`)
    console.log(`📋 Table: ${TABLE_NAME}`)

    // Load kitespots data
    const kitespotsPath = path.join(__dirname, '..', 'data', 'kitespots.json')
    console.log(`📁 Loading data from: ${kitespotsPath}`)
    
    const rawData = fs.readFileSync(kitespotsPath, 'utf8')
    const jsonData = JSON.parse(rawData)
    const kitespots = parseKitespotsData(jsonData)
    
    console.log(`📈 Found ${kitespots.length} kitespots to import`)

    // Check existing records to avoid duplicates
    console.log('🔍 Checking existing records...')
    const existingRecords = await getExistingRecords()
    const existingIds = new Set(existingRecords.records.map(record => record.fields.ID))
    
    console.log(`📋 Found ${existingRecords.records.length} existing records`)
    
    // Debug: Show the structure of an existing record
    if (existingRecords.records.length > 0) {
      console.log('🔍 Sample existing record structure:')
      console.log(JSON.stringify(existingRecords.records[0].fields, null, 2))
    }

    // Filter out existing records
    const newKitespots = kitespots.filter(kitespot => !existingIds.has(kitespot.id))
    console.log(`✨ ${newKitespots.length} new kitespots to import`)

    if (newKitespots.length === 0) {
      console.log('✅ No new kitespots to import. All records already exist!')
      return
    }

    // Transform data for Airtable
    const airtableRecords = newKitespots.map(transformKitespotForAirtable)
    
    // Import in batches (Airtable limit: 10 records per batch)
    const batchSize = 10
    let imported = 0
    let errors = 0

    console.log(`📦 Importing in batches of ${batchSize}...`)

    for (let i = 0; i < airtableRecords.length; i += batchSize) {
      const batch = airtableRecords.slice(i, i + batchSize)
      const batchNumber = Math.floor(i / batchSize) + 1
      const totalBatches = Math.ceil(airtableRecords.length / batchSize)
      
      try {
        console.log(`📤 Importing batch ${batchNumber}/${totalBatches} (${batch.length} records)...`)
        
        const result = await createRecordsBatch(batch)
        imported += result.records.length
        
        console.log(`✅ Batch ${batchNumber} imported successfully`)
        
        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200))
        
      } catch (error) {
        console.error(`❌ Error importing batch ${batchNumber}:`, error.message)
        errors++
        
        // Try individual records if batch fails
        console.log(`🔄 Trying individual records for batch ${batchNumber}...`)
        for (const record of batch) {
          try {
            await createRecord(record.fields)
            imported++
            console.log(`✅ Individual record imported: ${record.fields.Name}`)
          } catch (individualError) {
            console.error(`❌ Failed to import ${record.fields.Name}:`, individualError.message)
            errors++
          }
          await new Promise(resolve => setTimeout(resolve, 100))
        }
      }
    }

    // Summary
    console.log('\n📊 Import Summary:')
    console.log(`✅ Successfully imported: ${imported} records`)
    console.log(`❌ Errors: ${errors} records`)
    console.log(`📋 Total existing: ${existingRecords.records.length} records`)
    console.log(`📈 Total in Airtable: ${existingRecords.records.length + imported} records`)

    if (errors === 0) {
      console.log('\n🎉 Import completed successfully!')
    } else {
      console.log('\n⚠️  Import completed with some errors. Check the logs above.')
    }

  } catch (error) {
    console.error('💥 Import failed:', error.message)
    process.exit(1)
  }
}

// Run the import
if (require.main === module) {
  importKitespots()
}

module.exports = { importKitespots }
