# Google Analytics 4 & Search Console Setup Guide

## Current Issue
The Google Analytics API is failing with "Invalid JWT Signature" errors. This typically means:
- Service account key is expired or corrupted
- Service account doesn't have proper permissions
- Service account isn't added to the GA4 property

## Solution: Create New Service Account

### Step 1: Create Service Account in Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select project: `kite-safaris`
3. Navigate to **IAM & Admin** > **Service Accounts**
4. Click **Create Service Account**
5. Fill in details:
   - **Name**: `kitesafaris-analytics-v2`
   - **Description**: `Service account for Kite Safaris analytics dashboard`
6. Click **Create and Continue**

### Step 2: Grant Permissions

1. In the **Grant this service account access to project** section:
   - Add role: **Viewer** (basic access)
   - Add role: **Analytics Viewer** (if available)
2. Click **Continue** and **Done**

### Step 3: Create and Download Key

1. Find your new service account in the list
2. Click on the service account email
3. Go to **Keys** tab
4. Click **Add Key** > **Create new key**
5. Select **JSON** format
6. Click **Create** - this downloads the key file

### Step 4: Add Service Account to GA4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property: **Kite Safaris**
3. Go to **Admin** (gear icon)
4. In **Property** column, click **Property access management**
5. Click **+** to add user
6. Add email: `kitesafaris-analytics-v2@kite-safaris.iam.gserviceaccount.com`
7. Select role: **Viewer**
8. Click **Add**

### Step 5: Add Service Account to Search Console

1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Select property: `https://kitesafaris.com`
3. Go to **Settings** > **Users and permissions**
4. Click **Add user**
5. Add email: `kitesafaris-analytics-v2@kite-safaris.iam.gserviceaccount.com`
6. Select permission: **Full** (or **Restricted** if you prefer)
7. Click **Add**

### Step 6: Update Environment Variables

1. Open the downloaded JSON key file
2. Copy the entire JSON content
3. Update `.env.local`:
   ```bash
   # Replace the existing GA4_SERVICE_ACCOUNT_JSON with the new one
   GA4_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"kite-safaris",...}
   ```

### Step 7: Test the Setup

Run the test script:
```bash
node test-ga-auth.js
```

## Alternative: Use OAuth2 Instead of Service Account

If service account continues to have issues, you can use OAuth2:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** > **Credentials**
3. Click **Create Credentials** > **OAuth 2.0 Client IDs**
4. Configure OAuth consent screen if needed
5. Create OAuth2 credentials
6. Use OAuth2 flow in the application

## Current Fallback System

The application currently uses mock data as a fallback when Google APIs fail. This ensures the dashboard remains functional while the real APIs are being configured.

## Troubleshooting

### Common Issues:

1. **"Invalid JWT Signature"**
   - Service account key is expired → Create new key
   - Private key format is corrupted → Re-download key
   - Service account doesn't exist → Check Google Cloud Console

2. **"Permission denied"**
   - Service account not added to GA4 property → Add to property
   - Service account doesn't have Analytics Viewer role → Grant proper roles

3. **"Property not found"**
   - GA4_PROPERTY_ID is incorrect → Verify property ID in GA4
   - Property doesn't exist → Check if property is active

### Verification Steps:

1. Check service account exists in Google Cloud Console
2. Verify service account has proper roles
3. Confirm service account is added to GA4 property
4. Test authentication with the test script
5. Check GA4 property ID is correct

## Support

If issues persist:
1. Check Google Cloud Console for any service account errors
2. Verify GA4 property is active and accessible
3. Consider using OAuth2 instead of service account
4. Contact Google Cloud support if needed
