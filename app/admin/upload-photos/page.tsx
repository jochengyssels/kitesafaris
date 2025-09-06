'use client';

import { Navigation } from "@/components/navigation";
import PhotoUpload from "@/components/PhotoUpload";

export default function UploadPhotosPage() {
  const handleUploadComplete = (files: any[]) => {
    console.log('Uploaded files:', files);
    // You can add additional logic here, like saving to a database
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Upload Photos</h1>
            <p className="mt-2 text-gray-600">
              Upload photos to Vercel Blob storage for use throughout the KiteSafaris application.
            </p>
          </div>

          <PhotoUpload onUploadComplete={handleUploadComplete} />

          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Usage Instructions</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Select one or multiple photos to upload</li>
              <li>• Maximum file size: 10MB per photo</li>
              <li>• Supported formats: JPG, PNG, GIF, WebP</li>
              <li>• After upload, you can copy the URL to use in your application</li>
              <li>• URLs are publicly accessible and can be used in Next.js Image components</li>
            </ul>
          </div>

          <div className="mt-6 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="text-lg font-medium text-yellow-900 mb-2">Important Notes</h3>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Make sure you have the BLOB_READ_WRITE_TOKEN environment variable set</li>
              <li>• Uploaded files are stored in Vercel Blob storage</li>
              <li>• Files are publicly accessible by default</li>
              <li>• Consider optimizing images before upload for better performance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
