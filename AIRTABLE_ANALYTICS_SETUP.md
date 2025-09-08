# Airtable Analytics Setup Guide

This guide will help you set up the Airtable base for storing analytics data from the KiteSafaris website.

## 1. Create Airtable Base

1. Go to [Airtable.com](https://airtable.com) and create a new base
2. Name it "KiteSafaris Analytics"
3. Choose "Start from scratch" or use the template provided below

## 2. Create the Analytics Data Table

Create a table named **"Analytics Data"** with the following fields:

### Field Configuration

| Field Name | Field Type | Options/Notes |
|------------|------------|---------------|
| **Date** | Date | Primary field, format: YYYY-MM-DD |
| **Timestamp** | Date & Time | Auto-generated timestamp |
| **Data Source** | Single Select | Options: "Analytics Dashboard", "Daily Cron", "Manual" |
| **Range** | Single Select | Options: "7d", "30d", "90d", "1y" |

### Website Analytics Fields

| Field Name | Field Type | Options/Notes |
|------------|------------|---------------|
| **Total Visitors** | Number | Format: Integer |
| **Total Page Views** | Number | Format: Integer |
| **Total Sessions** | Number | Format: Integer |
| **Bounce Rate** | Number | Format: Percent (2 decimal places) |
| **Avg Session Duration** | Number | Format: Integer (seconds) |
| **New Visitors** | Number | Format: Integer |
| **Returning Visitors** | Number | Format: Integer |

### SEO Metrics Fields

| Field Name | Field Type | Options/Notes |
|------------|------------|---------------|
| **SEO Score** | Number | Format: Integer (0-100) |
| **Total Keywords** | Number | Format: Integer |
| **Organic Traffic** | Number | Format: Integer |
| **Avg Position** | Number | Format: Number (1 decimal place) |
| **Position Growth** | Number | Format: Percent (1 decimal place) |
| **Keyword Growth** | Number | Format: Percent (1 decimal place) |
| **Traffic Growth** | Number | Format: Percent (1 decimal place) |
| **SEO Growth** | Number | Format: Percent (1 decimal place) |

### Device & Traffic Breakdown Fields

| Field Name | Field Type | Options/Notes |
|------------|------------|---------------|
| **Desktop %** | Number | Format: Percent (0 decimal places) |
| **Mobile %** | Number | Format: Percent (0 decimal places) |
| **Tablet %** | Number | Format: Percent (0 decimal places) |
| **Organic Traffic %** | Number | Format: Percent (0 decimal places) |
| **Direct Traffic %** | Number | Format: Percent (0 decimal places) |
| **Social Traffic %** | Number | Format: Percent (0 decimal places) |
| **Referral Traffic %** | Number | Format: Percent (0 decimal places) |

## 3. Environment Variables

Add these environment variables to your `.env.local` file:

```bash
# Airtable Configuration
AIRTABLE_API_KEY=your_airtable_api_key_here
AIRTABLE_BASE_ID=your_airtable_base_id_here
```

### How to Get Your Airtable Credentials:

1. **API Key**: 
   - Go to [Airtable Account](https://airtable.com/account)
   - Scroll down to "Personal access tokens"
   - Click "Create new token"
   - Give it a name like "KiteSafaris Analytics"
   - Select scopes: `data.records:read`, `data.records:write`, `schema.bases:read`
   - Copy the generated token

2. **Base ID**:
   - Go to your Airtable base
   - Click "Help" in the top right
   - Click "API documentation"
   - Copy the Base ID from the URL (starts with `app...`)

## 4. Views Setup (Optional but Recommended)

Create these views in your Analytics Data table:

### 1. "Recent Data" View
- **Filter**: None
- **Sort**: Timestamp (Descending)
- **Group**: None

### 2. "Last 30 Days" View
- **Filter**: `{Date} >= TODAY() - 30`
- **Sort**: Date (Descending)
- **Group**: None

### 3. "By Data Source" View
- **Filter**: None
- **Sort**: Timestamp (Descending)
- **Group**: Data Source

### 4. "Weekly Summary" View
- **Filter**: `{Range} = "7d"`
- **Sort**: Date (Descending)
- **Group**: None

## 5. Automation Setup (Optional)

You can set up Airtable automations to:

1. **Send weekly reports** when new data is added
2. **Create alerts** when SEO score drops below a threshold
3. **Generate charts** automatically when data is updated

## 6. Data Collection Schedule

The system will automatically collect data:

- **On Analytics Page Visit**: Every time someone visits `/analytics`
- **Daily Cron Job**: Every day at 9:00 AM UTC via Vercel cron
- **Manual Trigger**: Via API endpoint `/api/analytics/store`

## 7. API Endpoints

### Store Analytics Data
```bash
POST /api/analytics/store?range=30d
```

### Get Recent Analytics
```bash
GET /api/analytics/store?limit=30
```

### Get Analytics Summary
```bash
GET /api/analytics/store?summary=true&days=7
```

### Trigger Cron Job
```bash
POST /api/analytics/cron
```

### Get Cron Status
```bash
GET /api/analytics/cron
```

## 8. Testing

To test the setup:

1. Visit `/analytics` page - this should store data automatically
2. Check your Airtable base for new records
3. Test the cron job manually: `POST /api/analytics/cron?force=true`

## 9. Monitoring

Monitor the system by:

1. Checking Vercel function logs for cron job execution
2. Monitoring Airtable for new records
3. Using the cron status endpoint to check job health

## 10. Troubleshooting

### Common Issues:

1. **"Missing Airtable configuration"**: Check environment variables
2. **"Airtable API error"**: Verify API key permissions
3. **"No data stored"**: Check if analytics APIs are working
4. **"Cron job not running"**: Verify Vercel cron configuration

### Debug Commands:

```bash
# Test Airtable connection
curl -X GET "https://api.airtable.com/v0/YOUR_BASE_ID/Analytics%20Data?maxRecords=1" \
  -H "Authorization: Bearer YOUR_API_KEY"

# Test analytics storage
curl -X POST "http://localhost:3000/api/analytics/store?range=30d"

# Test cron job
curl -X POST "http://localhost:3000/api/analytics/cron?force=true"
```

## 11. Data Retention

Consider setting up data retention policies:

- Keep detailed data for 1 year
- Archive older data to separate tables
- Create summary tables for long-term trends

## 12. Security Notes

- Keep your Airtable API key secure
- Use environment variables for all credentials
- Regularly rotate API keys
- Monitor API usage in Airtable dashboard
