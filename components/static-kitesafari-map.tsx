'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Waves, Anchor } from 'lucide-react';

interface KiteSpot {
  id: string;
  name: string;
  day: number;
  coordinates: { lat: number; lng: number };
  type: 'marina' | 'kiting' | 'exploration';
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const kiteSpots: KiteSpot[] = [
  {
    id: 'jolly-harbour',
    name: 'Jolly Harbour Marina',
    day: 1,
    coordinates: { lat: 17.0167, lng: -61.7833 },
    type: 'marina',
    description: 'Starting point - luxury catamaran boarding',
    difficulty: 'beginner'
  },
  {
    id: 'hansons-bay',
    name: 'Hansons Bay',
    day: 2,
    coordinates: { lat: 17.0333, lng: -61.7500 },
    type: 'kiting',
    description: 'Perfect beginner conditions',
    difficulty: 'beginner'
  },
  {
    id: 'nonsuch-bay',
    name: 'Nonsuch Bay',
    day: 3,
    coordinates: { lat: 17.0500, lng: -61.7167 },
    type: 'kiting',
    description: 'Advanced kiting with boat support',
    difficulty: 'intermediate'
  },
  {
    id: 'great-bird-island',
    name: 'Great Bird Island',
    day: 4,
    coordinates: { lat: 17.0833, lng: -61.6667 },
    type: 'exploration',
    description: 'Remote island adventure',
    difficulty: 'intermediate'
  },
  {
    id: 'barbuda',
    name: 'Barbuda',
    day: 5,
    coordinates: { lat: 17.6167, lng: -61.8333 },
    type: 'exploration',
    description: 'Pink beaches discovery',
    difficulty: 'advanced'
  },
  {
    id: 'codrington-lagoon',
    name: 'Codrington Lagoon',
    day: 6,
    coordinates: { lat: 17.6500, lng: -61.8500 },
    type: 'kiting',
    description: 'Flat water paradise',
    difficulty: 'advanced'
  }
];

const getSpotIcon = (type: string) => {
  switch (type) {
    case 'marina':
      return <Anchor className="w-4 h-4" />;
    case 'kiting':
      return <Waves className="w-4 h-4" />;
    case 'exploration':
      return <MapPin className="w-4 h-4" />;
    default:
      return <MapPin className="w-4 h-4" />;
  }
};

const getSpotColor = (type: string) => {
  switch (type) {
    case 'marina':
      return 'bg-blue-500 border-blue-600';
    case 'kiting':
      return 'bg-cyan-500 border-cyan-600';
    case 'exploration':
      return 'bg-emerald-500 border-emerald-600';
    default:
      return 'bg-gray-500 border-gray-600';
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
    case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export default function StaticKitesafariMap() {
  // Create Google Maps URL without markers (embed API doesn't support markers)
  const createMapUrl = () => {
    const baseUrl = 'https://www.google.com/maps/embed/v1/view';
    const center = '17.3167,-61.7500'; // Center between Antigua and Barbuda
    const zoom = '9';
    
    return `${baseUrl}?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyBFw0Qbyq9zTFTd-tUY6dOWWg'}&center=${center}&zoom=${zoom}`;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Kitesafari Route
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Navigate through the most beautiful kiteboarding spots in the Caribbean, accessible only by luxury catamaran
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Google Maps Embed */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <iframe
                src={createMapUrl()}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-3xl"
              ></iframe>
            </div>
          </motion.div>

          {/* Kite Spots List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Kitesafari Locations</h3>
            
            {kiteSpots.map((spot, index) => (
              <motion.div
                key={spot.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-cyan-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full ${getSpotColor(spot.type)} flex items-center justify-center text-white border-2`}>
                      {getSpotIcon(spot.type)}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{spot.name}</h4>
                      <p className="text-sm text-gray-500">Day {spot.day}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(spot.difficulty)}`}>
                    {spot.difficulty}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-3">{spot.description}</p>
                
                <div className="flex items-center text-sm text-gray-500">
                  <Navigation className="w-4 h-4 mr-2" />
                  <span>{spot.coordinates.lat.toFixed(4)}°, {spot.coordinates.lng.toFixed(4)}°</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Legend */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-blue-600"></div>
            <span className="text-sm text-gray-600">Marina & Departure</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-cyan-500 rounded-full border-2 border-cyan-600"></div>
            <span className="text-sm text-gray-600">Kiteboarding Spots</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-emerald-600"></div>
            <span className="text-sm text-gray-600">Exploration & Adventure</span>
          </div>
        </div>

        {/* Route Highlights */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-6 text-white mb-4">
              <Navigation className="w-8 h-8 mx-auto mb-3" />
              <h3 className="text-lg font-bold">7 Days</h3>
              <p className="text-cyan-100 text-sm">Adventure Duration</p>
            </div>
            <p className="text-gray-600 text-sm">From Antigua to Barbuda and back, covering the best kiteboarding spots in the Caribbean</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white mb-4">
              <Waves className="w-8 h-8 mx-auto mb-3" />
              <h3 className="text-lg font-bold">6 Locations</h3>
              <p className="text-emerald-100 text-sm">Unique Spots</p>
            </div>
            <p className="text-gray-600 text-sm">Each location offers different conditions, from beginner-friendly bays to advanced flat water paradise</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white mb-4">
              <Anchor className="w-8 h-8 mx-auto mb-3" />
              <h3 className="text-lg font-bold">Luxury Catamaran</h3>
              <p className="text-orange-100 text-sm">Exclusive Access</p>
            </div>
            <p className="text-gray-600 text-sm">Access remote locations only reachable by boat, with luxury amenities and professional crew</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
