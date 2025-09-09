# Kitespots Airtable Import Setup

This guide explains how to set up the Airtable "Kitespots" table and import the kitespot data from the JSON file.

## 📋 Prerequisites

1. **Airtable Account**: You need an Airtable account with API access
2. **Environment Variables**: Set up your Airtable credentials in `.env.local`
3. **Base ID**: Create or identify your Airtable base

## 🔧 Environment Setup

Add these variables to your `.env.local` file:

```bash
# Airtable Configuration for Kitespots
KITESPOTS_AIRTABLE_API_KEY=your_kitespots_api_key_here
KITESPOTS_AIRTABLE_BASE_ID=your_kitespots_base_id_here
```

**Note**: 
- This uses a separate Airtable API key and base specifically for kitespots data
- Keeps kitespots data completely separate from your main application database

### Getting Your Airtable Credentials

1. **Kitespots API Key**: 
   - Go to https://airtable.com/create/tokens
   - Create a new personal access token
   - Make sure it has access to your kitespots base
   - Copy the token value

2. **Kitespots Base ID**:
   - Go to your **kitespots** Airtable base (separate from your main app)
   - Copy the Base ID from the URL: `https://airtable.com/appXXXXXXXXXXXXXX/...`
   - The Base ID is the part after `/app` and before the next `/`
   - This should be different from your main application's base ID

## 📊 Airtable Table Setup

Create a table named **"Kitespots"** with the following fields:

| Field Name | Field Type | Description |
|------------|------------|-------------|
| `ID` | Single line text | Unique identifier from the original database |
| `Name` | Single line text | Name of the kitespot |
| `Airport Code` | Single line text | IATA airport code |
| `Country Code` | Single line text | ISO3 country code |
| `Latitude` | Number | Latitude coordinate |
| `Longitude` | Number | Longitude coordinate |
| `Description` | Long text | Description or additional info |
| `Timezone` | Single line text | Timezone information |
| `Status` | Single select | Active/Inactive (default: Active) |
| `Source` | Single line text | Data source (default: Windchaser Database) |
| `Import Date` | Date | Date when imported |

### Field Configuration Details

- **ID**: Primary field, should be unique
- **Latitude/Longitude**: Number fields with appropriate decimal places
- **Status**: Single select with options: "Active", "Inactive"
- **Import Date**: Date field, will be automatically set during import

## 🚀 Running the Import

### Option 1: Using npm script (Recommended)

```bash
pnpm run import-kitespots
```

### Option 2: Direct node command

```bash
node scripts/import-kitespots-to-airtable.js
```

## 📈 Import Process

The script will:

1. **Load Data**: Read kitespots from `/data/kitespots.json`
2. **Check Existing**: Query Airtable for existing records
3. **Filter New**: Only import records that don't already exist
4. **Batch Import**: Import in batches of 10 records (Airtable limit)
5. **Error Handling**: Retry failed batches individually
6. **Summary**: Display import statistics

### Expected Output

```
🚀 Starting kitespots import to Airtable...
📊 Base ID: appXXXXXXXXXXXXXX
📋 Table: Kitespots
📁 Loading data from: /path/to/data/kitespots.json
📈 Found 1775 kitespots to import
🔍 Checking existing records...
📋 Found 0 existing records
✨ 1775 new kitespots to import
📦 Importing in batches of 10...
📤 Importing batch 1/178 (10 records)...
✅ Batch 1 imported successfully
...
📊 Import Summary:
✅ Successfully imported: 1775 records
❌ Errors: 0 records
📋 Total existing: 0 records
📈 Total in Airtable: 1775 records

🎉 Import completed successfully!
```

## 🔄 Re-running the Import

The script is **idempotent** - it's safe to run multiple times:

- ✅ **Skips existing records** based on ID field
- ✅ **Only imports new records**
- ✅ **No duplicates created**
- ✅ **Safe to re-run anytime**

## 🛠️ Troubleshooting

### Common Issues

1. **Missing API Key**:
   ```
   ❌ Missing Airtable configuration!
   Please ensure AIRTABLE_API_KEY and AIRTABLE_BASE_ID are set in .env.local
   ```
   **Solution**: Add the environment variables to `.env.local`

2. **Table Not Found**:
   ```
   Failed to create record: 404 Not Found
   ```
   **Solution**: Ensure the table is named exactly "Kitespots" (case-sensitive)

3. **Rate Limiting**:
   ```
   Failed to create batch: 429 Too Many Requests
   ```
   **Solution**: The script includes delays, but if you hit limits, wait a few minutes and re-run

4. **Field Mismatch**:
   ```
   Failed to create record: 422 Unprocessable Entity
   ```
   **Solution**: Check that all required fields exist in your Airtable table

### Field Validation

Ensure your Airtable fields match exactly:
- Field names are case-sensitive
- Field types must match (Number for lat/lng, etc.)
- Required fields cannot be empty

## 📊 Data Overview

The import includes **1,775 kitespots** from the Windchaser database with:

- **Global Coverage**: Spots from all continents
- **Detailed Coordinates**: Precise latitude/longitude
- **Airport Codes**: IATA codes for easy travel planning
- **Country Information**: ISO3 country codes
- **Timezone Data**: For accurate local time calculations

## 🔗 Integration with kAIte

Once imported, this data can be used by:

- **kAIte Agent**: For intelligent kitespot recommendations
- **Trip Planning**: Location-based trip suggestions
- **Weather Integration**: Coordinate-based weather data
- **Booking System**: Destination-specific offerings

## 📝 Next Steps

After successful import:

1. **Verify Data**: Check a few records in Airtable
2. **Update kAIte**: Modify kAIte to use Airtable data instead of JSON
3. **Add Enhancements**: Consider adding more fields like:
   - Wind conditions
   - Difficulty levels
   - Best seasons
   - Local amenities
4. **Regular Updates**: Set up periodic data refreshes

## 🆘 Support

If you encounter issues:

1. Check the console output for specific error messages
2. Verify your Airtable credentials and base ID
3. Ensure the table structure matches the requirements
4. Check Airtable's API documentation for field requirements
