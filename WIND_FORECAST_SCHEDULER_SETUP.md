# Wind Forecast Scheduler Setup Guide

## Overview

This system replaces direct Stormglass API calls with a scheduled approach that:
1. Fetches wind forecast data every 3 hours from Stormglass API
2. Stores the data in Airtable for fast access
3. Serves wind data to visitors from Airtable instead of making direct API calls
4. Falls back to Stormglass API if Airtable data is unavailable

## Benefits

- **API Limit Compliance**: Respects Stormglass 10 calls/day limit
- **Better Performance**: Faster response times from cached Airtable data
- **Reliability**: Fallback mechanism ensures data availability
- **Cost Efficiency**: Reduces API usage and potential overage charges

## Setup Steps

### 1. Create Airtable Table

Follow the detailed instructions in `WIND_FORECAST_AIRTABLE_SETUP.md` to create the `wind_forecasts` table with all required fields.

### 2. Environment Variables

Add these variables to your `.env.local` file:

```bash
# Existing Airtable configuration
AIRTABLE_API_KEY=your_airtable_api_key_here
AIRTABLE_BASE_ID=your_airtable_base_id_here

# Wind Forecast Scheduler Configuration
WIND_FORECAST_SCHEDULER_ENABLED=true
WIND_FORECAST_SCHEDULE_HOURS=3
WIND_FORECAST_LOCATION_LAT=39.112133995367714
WIND_FORECAST_LOCATION_LNG=8.437520043416788
WIND_FORECAST_LOCATION_NAME="Punta Trettu, Sardinia"

# Security tokens (generate secure random strings)
WIND_SCHEDULER_SECRET=your_wind_scheduler_secret_here
ADMIN_API_SECRET=your_admin_api_secret_here

# Existing Stormglass API key
STORMGLASS_API_KEY=your_stormglass_api_key_here
```

### 3. Deploy to Vercel

The system uses Vercel's cron jobs for scheduling. The `vercel-cron.json` file is already configured to run every 3 hours.

**Important**: After deploying to Vercel, you need to enable cron jobs in your Vercel dashboard:

1. Go to your project in Vercel dashboard
2. Navigate to Settings → Functions
3. Enable "Cron Jobs"
4. The cron job will automatically start running

### 4. Test the System

#### Test the Scheduler
```bash
# Manual trigger (replace with your actual domain)
curl -X POST https://your-domain.vercel.app/api/wind-forecast/scheduler \
  -H "Authorization: Bearer your_wind_scheduler_secret_here"
```

#### Test the API
```bash
# Test wind forecast API
curl https://your-domain.vercel.app/api/wind-forecast/airtable?hours=6
```

#### Check Scheduler Status
```bash
# Check scheduler status
curl https://your-domain.vercel.app/api/wind-forecast/scheduler
```

### 5. Monitor the System

#### Airtable Monitoring
- Check the `wind_forecasts` table for new records
- Verify data quality and completeness
- Monitor record count and cleanup

#### API Monitoring
- Test the wind forecast API endpoints
- Verify fallback behavior when Airtable is unavailable
- Check response times and caching

#### Vercel Monitoring
- Monitor cron job execution in Vercel dashboard
- Check function logs for errors
- Verify scheduled runs are happening every 3 hours

## API Endpoints

### 1. Wind Forecast Data (Public)
- **URL**: `/api/wind-forecast/airtable`
- **Method**: GET
- **Parameters**:
  - `hours` (optional): Number of hours to fetch (default: 24, max: 168)
  - `lat` (optional): Latitude (default: 39.112133995367714)
  - `lng` (optional): Longitude (default: 8.437520043416788)
  - `location` (optional): Location name (default: "Punta Trettu, Sardinia")

### 2. Scheduler (Internal)
- **URL**: `/api/wind-forecast/scheduler`
- **Method**: POST (trigger), GET (status)
- **Authentication**: Requires `WIND_SCHEDULER_SECRET` token

### 3. Manual Refresh (Admin)
- **URL**: `/api/wind-forecast/airtable`
- **Method**: POST
- **Authentication**: Requires `ADMIN_API_SECRET` token

## Data Flow

```
Vercel Cron (every 3 hours)
    ↓
/api/wind-forecast/scheduler
    ↓
Stormglass API (1 call)
    ↓
Airtable (store 24 hours of data)
    ↓
/api/wind-forecast/airtable (serves to visitors)
    ↓
Frontend Components (WindForecastCard, WindOverlay)
```

## Fallback Strategy

If Airtable data is unavailable, the system automatically falls back to direct Stormglass API calls:

1. **Primary**: Serve data from Airtable
2. **Fallback**: Direct Stormglass API call
3. **Error Handling**: Graceful degradation with error messages

## Maintenance

### Regular Tasks
- Monitor API usage and costs
- Check data quality in Airtable
- Verify cron job execution
- Review error logs

### Data Cleanup
- Old records (>7 days) are automatically deleted
- Monitor table size and performance
- Consider archiving historical data if needed

### Troubleshooting

#### Common Issues

1. **Cron job not running**
   - Check Vercel cron job configuration
   - Verify environment variables are set
   - Check function logs for errors

2. **No data in Airtable**
   - Verify Airtable API key and base ID
   - Check table name matches exactly: `wind_forecasts`
   - Test manual scheduler trigger

3. **API fallback not working**
   - Verify Stormglass API key is valid
   - Check API quota and limits
   - Review error logs for specific issues

4. **Slow response times**
   - Check Airtable performance
   - Verify caching headers are working
   - Consider increasing cache duration

## Security Considerations

- Keep API keys secure and rotate regularly
- Use strong, unique tokens for scheduler authentication
- Monitor API usage for unusual patterns
- Implement rate limiting if needed

## Performance Optimization

- Airtable data is cached for 30 minutes
- Fallback data is cached for 5 minutes
- Automatic cleanup of old records
- Efficient filtering and sorting in Airtable queries

## Cost Management

- Stormglass API: 1 call every 3 hours = 8 calls/day (within 10/day limit)
- Airtable: Minimal cost for data storage and retrieval
- Vercel: Cron job execution costs (very minimal)

## Support

For issues or questions:
1. Check the error logs in Vercel dashboard
2. Verify all environment variables are set correctly
3. Test individual components (scheduler, API, Airtable)
4. Review the setup documentation
