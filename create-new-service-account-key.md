# Create New Service Account Key

## Current Issue
The service account key is invalid/expired. We need to create a new key for the existing service account.

## Service Account Details
- **Email**: `kitesafaris-analytics@kite-safaris.iam.gserviceaccount.com`
- **Project**: `kite-safaris`
- **Property ID**: `496346573`

## Steps to Create New Key

### 1. Go to Google Cloud Console
1. Open [Google Cloud Console](https://console.cloud.google.com/)
2. Select project: `kite-safaris`

### 2. Navigate to Service Accounts
1. Go to **IAM & Admin** > **Service Accounts**
2. Find: `kitesafaris-analytics@kite-safaris.iam.gserviceaccount.com`

### 3. Create New Key
1. Click on the service account email
2. Go to **Keys** tab
3. Click **Add Key** > **Create new key**
4. Select **JSON** format
5. Click **Create** - this downloads the new key file

### 4. Update Environment Variable
1. Open the downloaded JSON file
2. Copy the entire JSON content
3. Replace the `GA4_SERVICE_ACCOUNT_JSON` value in `.env.local`

### 5. Verify Permissions
Make sure the service account has access to:
- **Google Analytics 4 Property**: `496346573`
- **Google Search Console**: `https://kitesafaris.com`

## Quick Test
After updating the environment variable, restart the dev server and test:
```bash
curl -s "http://localhost:3000/api/analytics/website" | jq '.success'
```

Should return `true` with real data instead of mock data.
