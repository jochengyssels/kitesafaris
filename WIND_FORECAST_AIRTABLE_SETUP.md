# Wind Forecast Airtable Table Setup

## Table Name: `wind_forecasts`

### Table Structure

Create a new table in your Airtable base with the following fields:

| Field Name | Field Type | Description | Required |
|------------|------------|-------------|----------|
| `forecast_id` | Auto number | Unique identifier for each forecast record | Auto-generated |
| `location_name` | Single line text | Name of the location (e.g., "Punta Trettu, Sardinia") | Yes |
| `latitude` | Number | Latitude coordinate (e.g., 39.112133995367714) | Yes |
| `longitude` | Number | Longitude coordinate (e.g., 8.437520043416788) | Yes |
| `forecast_time` | Date and time | The specific time this forecast is for (ISO format) | Yes |
| `wind_speed_knots` | Number | Wind speed in knots (converted from m/s) | Yes |
| `wind_direction_degrees` | Number | Wind direction in degrees (0-360) | Yes |
| `wind_direction_cardinal` | Single line text | Wind direction as cardinal direction (N, NE, E, SE, S, SW, W, NW) | Yes |
| `wind_gust_knots` | Number | Wind gust speed in knots | Yes |
| `temperature_celsius` | Number | Air temperature in Celsius | Yes |
| `humidity_percent` | Number | Humidity percentage (0-100) | Yes |
| `data_source` | Single line text | Source of the data (e.g., "stormglass") | Yes |
| `api_cost` | Number | Cost of the API call (for tracking) | No |
| `created_at` | Date and time | When this record was created (auto-set to "Created Time") | Auto |
| `updated_at` | Date and time | When this record was last updated (auto-set to "Last Modified Time") | Auto |

### Field Configuration Details

#### `forecast_id`
- **Type**: Auto number
- **Format**: Sequential numbering (1, 2, 3, ...)
- **Purpose**: Primary key for the table

#### `location_name`
- **Type**: Single line text
- **Default value**: "Punta Trettu, Sardinia"
- **Purpose**: Human-readable location identifier

#### `latitude` & `longitude`
- **Type**: Number
- **Decimal places**: 15 (for precision)
- **Purpose**: Geographic coordinates for the forecast location

#### `forecast_time`
- **Type**: Date and time
- **Format**: ISO 8601 (e.g., "2024-01-15T14:00:00.000Z")
- **Purpose**: The specific time this forecast data represents

#### `wind_speed_knots` & `wind_gust_knots`
- **Type**: Number
- **Decimal places**: 1
- **Purpose**: Wind speeds converted from m/s to knots

#### `wind_direction_degrees`
- **Type**: Number
- **Decimal places**: 0
- **Purpose**: Wind direction in degrees (0-360)

#### `wind_direction_cardinal`
- **Type**: Single line text
- **Purpose**: Human-readable wind direction

#### `temperature_celsius`
- **Type**: Number
- **Decimal places**: 1
- **Purpose**: Air temperature in Celsius

#### `humidity_percent`
- **Type**: Number
- **Decimal places**: 0
- **Purpose**: Humidity as percentage

#### `data_source`
- **Type**: Single line text
- **Default value**: "stormglass"
- **Purpose**: Track which API provided the data

#### `api_cost`
- **Type**: Number
- **Decimal places**: 4
- **Purpose**: Track API usage costs

### Views Configuration

#### 1. "Recent Forecasts" View
- **Sort**: `forecast_time` (Descending)
- **Filter**: `forecast_time` is within the last 7 days
- **Purpose**: Show most recent forecast data

#### 2. "Current Location" View
- **Filter**: `location_name` is "Punta Trettu, Sardinia"
- **Sort**: `forecast_time` (Descending)
- **Purpose**: Show forecasts for the main location

#### 3. "API Usage Tracking" View
- **Group by**: `data_source`
- **Sort**: `created_at` (Descending)
- **Purpose**: Monitor API usage and costs

### Automation Setup (Optional)

#### 1. Auto-delete old records
- **Trigger**: When `created_at` is older than 30 days
- **Action**: Delete record
- **Purpose**: Keep table size manageable

#### 2. Data validation
- **Trigger**: When record is created
- **Action**: Validate that `wind_speed_knots` is between 0-100
- **Purpose**: Ensure data quality

### API Access Configuration

1. **Create a Personal Access Token** in Airtable:
   - Go to https://airtable.com/create/tokens
   - Create a token with scopes: `data.records:read`, `data.records:write`
   - Add the token to your environment variables as `AIRTABLE_API_KEY`

2. **Get your Base ID**:
   - Open your Airtable base
   - Copy the Base ID from the URL (starts with `app...`)
   - Add it to your environment variables as `AIRTABLE_BASE_ID`

### Environment Variables

Add these to your `.env.local` file:

```bash
# Existing Airtable configuration
AIRTABLE_API_KEY=your_airtable_api_key_here
AIRTABLE_BASE_ID=your_airtable_base_id_here

# Wind forecast scheduler configuration
WIND_FORECAST_SCHEDULER_ENABLED=true
WIND_FORECAST_SCHEDULE_HOURS=3
WIND_FORECAST_LOCATION_LAT=39.112133995367714
WIND_FORECAST_LOCATION_LNG=8.437520043416788
WIND_FORECAST_LOCATION_NAME="Punta Trettu, Sardinia"

# Stormglass API (existing)
STORMGLASS_API_KEY=your_stormglass_api_key_here
```

### Data Retention Policy

- **Active data**: Keep last 7 days of hourly forecasts
- **Archive data**: Keep last 30 days of 3-hourly forecasts
- **Cleanup**: Automatically delete data older than 30 days

### Monitoring and Alerts

Set up monitoring for:
- Failed API calls to Stormglass
- Missing forecast data (gaps in time series)
- API quota usage approaching limits
- Data quality issues (unrealistic wind speeds, etc.)

### Backup Strategy

- **Daily exports**: Export table data to CSV daily
- **Version history**: Airtable automatically maintains version history
- **Cross-region backup**: Consider duplicating critical data to another base
