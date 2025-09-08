#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Create placeholder images with text overlays for packing categories
const packingCategories = {
  'kitesurfing-equipment': {
    title: 'Kitesurfing Equipment',
    description: 'Essential kiteboarding gear for your Antigua adventure',
    color: '#3B82F6', // Blue
    icon: '🪁'
  },
  'tropical-clothing': {
    title: 'Tropical Clothing',
    description: 'Quick-dry and sun-protective clothing essentials',
    color: '#10B981', // Green
    icon: '👕'
  },
  'sun-protection': {
    title: 'Sun Protection',
    description: 'Critical sun safety items for Caribbean conditions',
    color: '#F59E0B', // Orange
    icon: '☀️'
  },
  'travel-essentials': {
    title: 'Travel Essentials',
    description: 'Must-have items for your kitesafari adventure',
    color: '#8B5CF6', // Purple
    icon: '🎒'
  },
  'caribbean-travel': {
    title: 'Caribbean Travel',
    description: 'Perfect for your tropical kitesurfing vacation',
    color: '#06B6D4', // Cyan
    icon: '🏝️'
  }
};

// Create SVG placeholder images
function createSVGPlaceholder(category, config) {
  const { title, description, color, icon } = config;
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color}20;stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color}40;stop-opacity:1" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="rgba(0,0,0,0.1)"/>
    </filter>
  </defs>
  
  <!-- Background -->
  <rect width="800" height="600" fill="url(#bg)"/>
  
  <!-- Decorative elements -->
  <circle cx="100" cy="100" r="60" fill="${color}30" opacity="0.3"/>
  <circle cx="700" cy="500" r="80" fill="${color}20" opacity="0.4"/>
  <circle cx="650" cy="150" r="40" fill="${color}40" opacity="0.2"/>
  
  <!-- Main content area -->
  <rect x="50" y="150" width="700" height="300" rx="20" fill="white" filter="url(#shadow)" opacity="0.95"/>
  
  <!-- Icon -->
  <text x="400" y="250" text-anchor="middle" font-size="80" font-family="Arial, sans-serif">${icon}</text>
  
  <!-- Title -->
  <text x="400" y="320" text-anchor="middle" font-size="32" font-family="Arial, sans-serif" font-weight="bold" fill="${color}">
    ${title}
  </text>
  
  <!-- Description -->
  <text x="400" y="360" text-anchor="middle" font-size="18" font-family="Arial, sans-serif" fill="#666666">
    ${description}
  </text>
  
  <!-- KiteSafaris branding -->
  <text x="400" y="420" text-anchor="middle" font-size="14" font-family="Arial, sans-serif" fill="#999999">
    KiteSafaris.com - Antigua Packing Guide
  </text>
</svg>`;
}

async function main() {
  console.log('🎨 Creating placeholder images for packing categories...\n');
  
  const publicDir = path.join(__dirname, '..', 'public', 'packing-images');
  
  // Ensure directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  const allImages = [];
  
  // Create images for each category
  for (const [category, config] of Object.entries(packingCategories)) {
    console.log(`📂 Creating placeholder for: ${category}`);
    const categoryDir = path.join(publicDir, category);
    
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }
    
    // Create main category image
    const svgContent = createSVGPlaceholder(category, config);
    const svgFilename = `${category}-main.svg`;
    const svgFilepath = path.join(categoryDir, svgFilename);
    
    fs.writeFileSync(svgFilepath, svgContent);
    
    // Store image metadata
    allImages.push({
      filename: `packing-images/${category}/${svgFilename}`,
      category: category,
      title: config.title,
      description: config.description,
      type: 'placeholder',
      alt: `${config.title} - ${config.description}`
    });
    
    console.log(`✅ Created: ${svgFilename}`);
  }
  
  // Save metadata
  const metadataFile = path.join(publicDir, 'images-metadata.json');
  fs.writeFileSync(metadataFile, JSON.stringify(allImages, null, 2));
  
  console.log(`\n✅ Completed! Created ${allImages.length} placeholder images`);
  console.log(`📄 Metadata saved to: ${metadataFile}`);
  console.log(`📁 Images saved to: ${publicDir}`);
  
  // Display summary
  console.log('\n📊 Created placeholder images:');
  allImages.forEach(img => {
    console.log(`   ${img.category}: ${img.title}`);
  });
  
  console.log('\n💡 These placeholder images can be replaced with real Pixabay images when the API key is available.');
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main };
