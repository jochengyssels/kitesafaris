#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

// Packing-related search terms for different categories
const packingCategories = {
  'kitesurfing-equipment': [
    'kitesurfing equipment',
    'kiteboarding gear',
    'kite board',
    'kite harness'
  ],
  'tropical-clothing': [
    'tropical vacation clothes',
    'beach wear',
    'swimwear',
    'rash guard'
  ],
  'sun-protection': [
    'sunscreen',
    'sun hat',
    'sunglasses',
    'sun protection'
  ],
  'travel-essentials': [
    'travel packing',
    'vacation suitcase',
    'travel essentials',
    'beach bag'
  ],
  'caribbean-travel': [
    'caribbean vacation',
    'tropical travel',
    'island vacation',
    'beach vacation'
  ]
};

async function fetchFromPixabayAPI(query) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const apiUrl = `${baseUrl}/api/pixabay/search?query=${encodeURIComponent(query)}&per_page=3`;

  return new Promise((resolve, reject) => {
    const url = new URL(apiUrl);
    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname + url.search,
      method: 'GET',
      headers: {
        'User-Agent': 'KiteSafaris-Packing-Image-Fetcher/1.0'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.success && result.images && result.images.length > 0) {
            console.log(`✅ Found ${result.images.length} images for "${query}"`);
            resolve(result.images);
          } else {
            console.log(`⚠️  No images found for "${query}"`);
            resolve([]);
          }
        } catch (error) {
          console.error(`❌ Error parsing response for "${query}":`, error.message);
          resolve([]);
        }
      });
    });

    req.on('error', (error) => {
      console.error(`❌ Error fetching images for "${query}":`, error.message);
      resolve([]);
    });

    req.end();
  });
}

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filename);
    
    https.get(url, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`📥 Downloaded: ${path.basename(filename)}`);
        resolve(true);
      });
      
      file.on('error', (error) => {
        fs.unlink(filename, () => {}); // Delete the file on error
        console.error(`❌ Error downloading ${filename}:`, error.message);
        reject(error);
      });
    }).on('error', (error) => {
      console.error(`❌ Error downloading ${url}:`, error.message);
      reject(error);
    });
  });
}

async function main() {
  console.log('🚀 Starting to fetch packing-related images via KiteSafaris API...\n');
  
  const publicDir = path.join(__dirname, '..', 'public', 'packing-images');
  
  // Ensure directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  const allImages = [];
  
  // Fetch images for each category
  for (const [category, queries] of Object.entries(packingCategories)) {
    console.log(`\n📂 Processing category: ${category}`);
    const categoryDir = path.join(publicDir, category);
    
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }
    
    for (const query of queries) {
      console.log(`🔍 Searching for: "${query}"`);
      
      try {
        const images = await fetchFromPixabayAPI(query);
        
        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          const filename = `${category}-${image.id}-${i + 1}.jpg`;
          const filepath = path.join(categoryDir, filename);
          
          // Skip if file already exists
          if (fs.existsSync(filepath)) {
            console.log(`⏭️  Skipping existing file: ${filename}`);
            continue;
          }
          
          try {
            await downloadImage(image.url, filepath);
            
            // Store image metadata
            allImages.push({
              filename: `packing-images/${category}/${filename}`,
              category: category,
              query: query,
              title: image.title,
              photographer: image.photographer,
              pixabayId: image.id,
              alt: image.alt
            });
            
            // Add a small delay to be respectful
            await new Promise(resolve => setTimeout(resolve, 500));
            
          } catch (error) {
            console.error(`❌ Failed to download ${filename}:`, error.message);
          }
        }
      } catch (error) {
        console.error(`❌ Error processing query "${query}":`, error.message);
      }
    }
  }
  
  // Save metadata
  const metadataFile = path.join(publicDir, 'images-metadata.json');
  fs.writeFileSync(metadataFile, JSON.stringify(allImages, null, 2));
  
  console.log(`\n✅ Completed! Downloaded ${allImages.length} images`);
  console.log(`📄 Metadata saved to: ${metadataFile}`);
  console.log(`📁 Images saved to: ${publicDir}`);
  
  // Display summary
  const categoryCounts = {};
  allImages.forEach(img => {
    categoryCounts[img.category] = (categoryCounts[img.category] || 0) + 1;
  });
  
  console.log('\n📊 Summary by category:');
  Object.entries(categoryCounts).forEach(([category, count]) => {
    console.log(`   ${category}: ${count} images`);
  });
  
  if (allImages.length === 0) {
    console.log('\n💡 Note: If no images were downloaded, make sure:');
    console.log('   1. The development server is running (npm run dev)');
    console.log('   2. The PIXABAY_API_KEY is configured in your .env.local file');
    console.log('   3. The API route /api/pixabay/search is working');
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main };
