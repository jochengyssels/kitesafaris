#!/usr/bin/env node

// Test script to trigger the wind forecast scheduler
const fetch = require('node-fetch');

async function testScheduler() {
  try {
    console.log('🚀 Testing Wind Forecast Scheduler...');
    
    // Test local endpoint
    const response = await fetch('http://localhost:3000/api/wind-forecast/scheduler', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer kitesafaris',
        'Content-Type': 'application/json'
      }
    });
    
    const result = await response.json();
    console.log('📊 Scheduler Response:', JSON.stringify(result, null, 2));
    
    if (result.success) {
      console.log('✅ Scheduler executed successfully!');
      console.log(`📈 Inserted ${result.insertedRecords} records`);
      console.log(`🗑️ Deleted ${result.deletedRecords} old records`);
    } else {
      console.log('❌ Scheduler failed:', result.message);
    }
    
  } catch (error) {
    console.error('💥 Error testing scheduler:', error.message);
  }
}

testScheduler();
