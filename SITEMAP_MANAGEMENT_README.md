# Sitemap Management - Admin Dashboard

## Overview

The Sitemap Management section provides administrators with a comprehensive, real-time view of the entire KiteSafaris.com site structure. This tool automatically scans the file system to generate up-to-date sitemap data and provides insights into site organization, SEO issues, and content management.

## Access

Navigate to `/admin/sitemap` in your admin dashboard to access the Sitemap Management interface.

## Features

### 🏠 **Main Pages**
- Homepage (`/`)
- XML Sitemap (`/sitemap.xml`)

### 🗺️ **Destinations**
- Destinations overview (`/destinations`)
- Dynamic destination pages (`/destinations/[slug]`)
  - Caribbean/Antigua
  - Greece
  - Sardinia

### ⛵ **Fleet & Booking**
- Fleet information (`/fleet`)
- Booking system (`/booking`)
- Package information (`/packages`)

### 🛍️ **Shop & E-commerce**
- Shop homepage (`/shop`)
- Checkout process (`/shop/checkout`)

### 📚 **Guides & Content**
- Guides overview (`/guides`)
- Dynamic guide pages (`/guides/[slug]`)
- Blog section (`/blog`)
- Image gallery (`/gallery`)

### ✈️ **Travel & Flights**
- Flight options (`/flights-europe-antigua`)
- Specific trip pages (December 2025, January 2026, February 2026)

### 🏆 **About & Information**
- Why choose us (`/why-us`)
- Expert guides (`/expert-guides`)
- Small groups (`/small-groups`)
- Premium equipment (`/premium-equipment`)
- Guaranteed wind (`/guaranteed-wind`)
- Customer reviews (`/reviews`)
- Contact information (`/contact`)

### 📋 **Policies & Legal**
- Policies overview (`/policies`)
- Cancellation policy (`/policies/cancellation`)
- Insurance information (`/policies/insurance`)
- Privacy policy (`/policies/privacy`)
- Refund policy (`/policies/refund`)
- Safety guidelines (`/policies/safety`)
- Terms of service (`/terms`)

### 🔧 **Admin & Management**
- Admin dashboard (`/admin`)
- SEO agent (`/admin/seo-agent`)
- Trip management (`/admin/trips`)
- Shop management (`/admin/shop`)
- Navigation manager (`/admin/navigation`)
- API management (`/admin/api-management`)
- Gallery configuration (`/admin/gallery-config`)
- Analytics (`/analytics`)
- Content management (`/content`)
- User management (`/users`)
- System settings (`/settings`)

### 🔌 **API Routes**
- Admin API endpoints (`/api/admin/*`)
- Lead capture (`/api/leads`)
- Image search (`/api/pixabay/search`)
- SEO optimization (`/api/seo-agent/*`)
- Shop API (`/api/shop/*`)
- Trip management (`/api/trips/*`)

### 📱 **Special Features**
- Sardinian awakening campaign (`/sardinian-awakening`)
- FAQ section (`/faq`)

## Functionality

### **Real-time Scanning**
- Automatically scans the `app` directory for all page files
- Extracts metadata (titles, descriptions) from page components
- Identifies dynamic routes and their parameters
- Tracks file modifications and sizes

### **Status Indicators**
- ✅ **Active**: Pages that are functioning normally
- ⚠️ **Missing**: Pages with issues or missing content
- 🔒 **Protected**: Admin-only or protected routes

### **SEO Analysis**
- Identifies pages missing titles or descriptions
- Tracks orphaned pages not linked from navigation
- Monitors for potential broken internal links

### **Export Options**
- **JSON Export**: Complete sitemap data in structured format
- **XML Export**: Standard sitemap format for search engines

### **Search & Filtering**
- Search across page paths, titles, and descriptions
- Filter by category or status
- Collapsible category sections for better organization

## Technical Details

### **API Endpoint**
- **Route**: `/api/admin/sitemap`
- **Method**: GET
- **Response**: JSON with categorized page information
- **Caching**: 5-minute cache for performance

### **File System Integration**
- Uses Node.js `fs` and `glob` for file scanning
- Parses TypeScript/JSX files for metadata extraction
- Handles dynamic routes with parameter extraction
- Supports Next.js App Router structure

### **Performance Features**
- Lazy loading of category details
- Efficient file system operations
- Client-side search and filtering
- Responsive design for mobile devices

## Usage Instructions

1. **Access the Dashboard**: Navigate to `/admin/sitemap`
2. **Generate Sitemap**: Click "Refresh Sitemap" to scan the file system
3. **Explore Categories**: Click on category headers to expand/collapse sections
4. **Search Pages**: Use the search bar to find specific pages or content
5. **Export Data**: Use export buttons to download JSON or XML formats
6. **Monitor Issues**: Check the SEO Issues section for potential improvements

## Security Features

- Admin authentication required
- Rate limiting on API endpoints
- Protected route identification
- Secure file system access

## Troubleshooting

### **Common Issues**
- **Build Errors**: Ensure all dependencies are installed (`pnpm install`)
- **API Errors**: Check server logs for file system access issues
- **Missing Pages**: Verify page files exist in the `app` directory
- **Metadata Issues**: Ensure pages have proper `export const metadata` declarations

### **Performance Tips**
- Use the refresh button sparingly (data is cached for 5 minutes)
- Export data for offline analysis when needed
- Monitor the SEO Issues section for quick wins

## Future Enhancements

- **Broken Link Detection**: Automated internal link validation
- **SEO Scoring**: Page-by-page SEO performance metrics
- **Content Analytics**: Page view and engagement tracking
- **Automated Reports**: Scheduled sitemap health reports
- **Integration**: Connect with Google Search Console and other SEO tools

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Maintainer**: KiteSafaris Development Team
