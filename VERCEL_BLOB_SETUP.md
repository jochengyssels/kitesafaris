# Vercel Blob Setup Guide

## Environment Variables

To use Vercel Blob for photo uploads, you need to set up the following environment variable:

### 1. Get your Blob Token

1. Go to your Vercel dashboard
2. Navigate to your project
3. Go to Settings → Environment Variables
4. Add a new environment variable:
   - **Name**: `BLOB_READ_WRITE_TOKEN`
   - **Value**: Your Vercel Blob token (starts with `vercel_blob_rw_`)

### 2. Local Development

Create a `.env.local` file in your project root with:

```bash
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_your_token_here
```

## Usage

### Upload Photos

1. Navigate to `/admin/upload-photos` in your application
2. Select one or multiple photos
3. Click "Upload" to upload to Vercel Blob
4. Copy the generated URLs to use in your application

### Using Uploaded Images

Once uploaded, you can use the images in your Next.js application:

```tsx
import Image from 'next/image';

// The URL from Vercel Blob
const imageUrl = "https://your-blob-url.vercel-storage.com/image.jpg";

<Image
  src={imageUrl}
  alt="Description"
  width={800}
  height={600}
/>
```

## Features

- ✅ Multiple file upload
- ✅ File size validation (10MB max)
- ✅ Image format validation
- ✅ Progress indication
- ✅ Copy URL functionality
- ✅ Public access by default
- ✅ Optimized for Next.js Image component

## File Structure

- `app/api/upload/route.ts` - API endpoint for file uploads
- `components/PhotoUpload.tsx` - Upload component
- `app/admin/upload-photos/page.tsx` - Admin upload page

## Security Notes

- Files are publicly accessible by default
- Consider implementing authentication for the upload endpoint in production
- Validate file types and sizes on both client and server side
- Consider adding rate limiting for uploads
