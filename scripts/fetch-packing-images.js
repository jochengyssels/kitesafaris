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
    'kite harness',
    'kite control bar'
  ],
  'tropical-clothing': [
    'tropical vacation clothes',
    'beach wear',
    'swimwear',
    'rash guard',
    'sun protection clothing'
  ],
  'sun-protection': [
    'sunscreen',
    'sun hat',
    'sunglasses',
    'sun protection',
    'tropical sun safety'
  ],
  'travel-essentials': [
    'travel packing',
    'vacation suitcase',
    'travel essentials',
    'beach bag',
    'waterproof bag'
  ],
  'caribbean-travel': [
    'caribbean vacation',
    'tropical travel',
    'island vacation',
    'beach vacation',
    'tropical paradise'
  ]
};

async function fetchPixabayImages(query, category) {
  const apiKey = process.env.PIXABAY_API_KEY;
  
  if (!apiKey) {
    console.error('❌ PIXABAY_API_KEY environment variable not set');
    return [];
  }

  const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&orientation=all&category=places,nature,sports&min_width=1920&min_height=1080&per_page=3&safesearch=true&order=popular`;

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.hits && result.hits.length > 0) {
            console.log(`✅ Found ${result.hits.length} images for "${query}"`);
            resolve(result.hits.map(hit => ({
              id: hit.id,
              url: hit.largeImageURL,
              webUrl: hit.webformatURL,
              tags: hit.tags,
              user: hit.user,
              category: category
            })));
          } else {
            console.log(`⚠️  No images found for "${query}"`);
            resolve([]);
          }
        } catch (error) {
          console.error(`❌ Error parsing response for "${query}":`, error.message);
          resolve([]);
        }
      });
    }).on('error', (error) => {
      console.error(`❌ Error fetching images for "${query}":`, error.message);
      resolve([]);
    });
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
  console.log('🚀 Starting to fetch packing-related images from Pixabay...\n');
  
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
        const images = await fetchPixabayImages(query, category);
        
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
              tags: image.tags,
              photographer: image.user,
              pixabayId: image.id
            });
            
            // Add a small delay to be respectful to the API
            await new Promise(resolve => setTimeout(resolve, 1000));
            
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
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main };
