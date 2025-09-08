'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  MapPin, 
  Wind, 
  Calendar, 
  Users, 
  Anchor, 
  Waves, 
  Sun, 
  Star,
  ChevronRight,
  Clock,
  Navigation,
  Camera,
  Utensils,
  Wifi,
  Shield
} from 'lucide-react';
import KitesafariRouteMap from './kitesafari-route-map';

interface DayActivity {
  day: number;
  date: string;
  title: string;
  location: string;
  activity: string;
  description: string;
  windConditions: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  highlights: string[];
  icon: React.ReactNode;
  color: string;
  image: string;
  imageAlt: string;
}

const itineraryData: DayActivity[] = [
  {
    day: 1,
    date: 'Dec 6',
    title: 'Arrival & Welcome',
    location: 'Jolly Harbour Marina',
    activity: 'Welcome & Safety Briefing',
    description: 'Board our luxury catamaran and meet your crew and fellow kiters. Enjoy a welcome dinner while we brief you on safety protocols and the week ahead.',
    windConditions: 'Light winds',
    difficulty: 'beginner',
    highlights: ['Luxury catamaran boarding', 'Meet crew & fellow kiters', 'Welcome dinner', 'Safety briefing'],
    icon: <Anchor className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-500',
    image: '/antigua-aerial-harbor-view-new.jpg',
    imageAlt: 'Aerial view of Jolly Harbour Marina in Antigua'
  },
  {
    day: 2,
    date: 'Dec 7',
    title: 'Hansons Bay',
    location: 'Hansons Bay, Antigua',
    activity: 'Perfect Beginner Conditions',
    description: 'Start your kitesafari adventure in Hansons Bay with perfect beginner-friendly conditions. Shallow turquoise waters and consistent trade winds make this ideal for all skill levels.',
    windConditions: '15-20 knots',
    difficulty: 'beginner',
    highlights: ['Shallow turquoise waters', 'Consistent trade winds', 'Beginner-friendly', 'Perfect learning conditions'],
    icon: <Waves className="w-6 h-6" />,
    color: 'from-cyan-400 to-teal-500',
    image: '/kiteboarding-lesson-turquoise-water.png',
    imageAlt: 'Kiteboarding lesson in turquoise waters at Hansons Bay'
  },
  {
    day: 3,
    date: 'Dec 8',
    title: 'Nonsuch Bay',
    location: 'Nonsuch Bay, Antigua',
    activity: 'Advanced Kiting',
    description: 'Experience advanced kiting in the protected bay conditions of Nonsuch Bay. With boat launches and rescue support, push your limits in safety.',
    windConditions: '18-22 knots',
    difficulty: 'intermediate',
    highlights: ['Protected bay conditions', 'Boat launches', 'Rescue support', 'Advanced techniques'],
    icon: <Wind className="w-6 h-6" />,
    color: 'from-teal-500 to-emerald-500',
    image: '/advanced-kiteboarding-jumping.png',
    imageAlt: 'Advanced kiteboarding jumping in Nonsuch Bay'
  },
  {
    day: 4,
    date: 'Dec 9',
    title: 'Great Bird Island',
    location: 'Great Bird Island',
    activity: 'Remote Island Adventure',
    description: 'Discover the pristine beaches and excellent wind conditions of Great Bird Island. A remote paradise accessible only by catamaran.',
    windConditions: '20-25 knots',
    difficulty: 'intermediate',
    highlights: ['Pristine beaches', 'Remote location', 'Excellent wind', 'Island exploration'],
    icon: <MapPin className="w-6 h-6" />,
    color: 'from-emerald-500 to-green-500',
    image: '/antigua-tropical-landscape-palm-trees-beach.png',
    imageAlt: 'Tropical landscape with palm trees and pristine beach at Great Bird Island'
  },
  {
    day: 5,
    date: 'Dec 10',
    title: 'Barbuda Exploration',
    location: 'Barbuda',
    activity: 'Pink Beaches Discovery',
    description: 'Discover Barbuda\'s famous pink beaches and untouched kite spots. This remote destination is accessible only by catamaran and offers unparalleled beauty.',
    windConditions: '22-25 knots',
    difficulty: 'advanced',
    highlights: ['Famous pink beaches', 'Untouched kite spots', 'Remote destination', 'Unparalleled beauty'],
    icon: <Camera className="w-6 h-6" />,
    color: 'from-green-500 to-lime-500',
    image: '/antigua-caribbean-sunset-kiteboarding.png',
    imageAlt: 'Caribbean sunset kiteboarding at Barbuda pink beaches'
  },
  {
    day: 6,
    date: 'Dec 11',
    title: 'Codrington Lagoon',
    location: 'Codrington Lagoon, Barbuda',
    activity: 'Flat Water Paradise',
    description: 'Experience flat water paradise perfect for freestyle and progression. The stunning natural surroundings of Codrington Lagoon provide the ultimate kiting playground.',
    windConditions: '18-23 knots',
    difficulty: 'advanced',
    highlights: ['Flat water conditions', 'Freestyle paradise', 'Natural beauty', 'Progression training'],
    icon: <Sun className="w-6 h-6" />,
    color: 'from-lime-500 to-yellow-500',
    image: '/secluded-kiteboarding-lagoon.png',
    imageAlt: 'Secluded kiteboarding lagoon at Codrington Lagoon'
  },
  {
    day: 7,
    date: 'Dec 12',
    title: 'Final Session',
    location: 'Best Conditions Spot',
    activity: 'Last Kiting & Celebration',
    description: 'Enjoy your final kiting session at your favorite spot, followed by a farewell dinner and celebration of your incredible kitesafari adventure.',
    windConditions: 'Variable',
    difficulty: 'intermediate',
    highlights: ['Final kiting session', 'Farewell dinner', 'Celebration', 'Memories made'],
    icon: <Star className="w-6 h-6" />,
    color: 'from-yellow-500 to-orange-500',
    image: '/group-welcome-dinner-yacht.png',
    imageAlt: 'Group celebration dinner on luxury yacht'
  },
  {
    day: 8,
    date: 'Dec 13',
    title: 'Departure',
    location: 'Jolly Harbour Marina',
    activity: 'Final Breakfast & Departure',
    description: 'Enjoy a final breakfast with your new kitesafari family before departing with memories that will last a lifetime.',
    windConditions: 'N/A',
    difficulty: 'beginner',
    highlights: ['Final breakfast', 'Farewells', 'Lifetime memories', 'Safe travels'],
    icon: <Utensils className="w-6 h-6" />,
    color: 'from-orange-500 to-red-500',
    image: '/antigua-sunset-harbor-romantic.jpeg',
    imageAlt: 'Romantic sunset at Jolly Harbour Marina departure'
  }
];

const includedFeatures = [
  { icon: <Anchor className="w-5 h-5" />, title: 'Luxury Catamaran', description: '3 double cabins, full amenities' },
  { icon: <Users className="w-5 h-5" />, title: 'Expert Guides', description: 'Professional kiteboarding instructors' },
  { icon: <Waves className="w-5 h-5" />, title: 'Kiteboarding Equipment', description: 'Latest gear for all skill levels' },
  { icon: <Utensils className="w-5 h-5" />, title: 'All Meals', description: 'Chef-prepared Caribbean cuisine' },
  { icon: <Navigation className="w-5 h-5" />, title: 'Boat Transfers', description: 'Access to remote locations' },
  { icon: <Shield className="w-5 h-5" />, title: 'Safety Equipment', description: 'Full safety gear and protocols' },
  { icon: <Wifi className="w-5 h-5" />, title: 'WiFi & Amenities', description: 'Modern comforts on board' },
  { icon: <Camera className="w-5 h-5" />, title: 'Photo Service', description: 'Professional action shots' }
];

const windConditions = [
  { month: 'December', avgWind: '18-25 knots', consistency: '95%', temperature: '26-28°C' },
  { month: 'Peak Season', avgWind: '15-25 knots', consistency: '90%', temperature: 'Perfect' }
];

export default function AntiguaKitesafariItinerary() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-navy-900 via-blue-900 to-cyan-800 text-white">
        <div className="absolute inset-0">
          <Image
            src="/banner-kitesafari-antigua-branded.png"
            alt="Antigua Kitesafari Banner"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              Antigua Kitesafari
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-cyan-100 max-w-3xl mx-auto">
              Ultimate 7-Day Caribbean Kiteboarding Adventure
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Calendar className="w-8 h-8 mx-auto mb-3 text-cyan-300" />
                <div className="text-2xl font-bold">7 Days</div>
                <div className="text-sm text-cyan-200">Dec 6-13, 2025</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Users className="w-8 h-8 mx-auto mb-3 text-cyan-300" />
                <div className="text-2xl font-bold">6 Guests</div>
                <div className="text-sm text-cyan-200">Max Capacity</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Anchor className="w-8 h-8 mx-auto mb-3 text-cyan-300" />
                <div className="text-2xl font-bold">Luxury</div>
                <div className="text-sm text-cyan-200">Catamaran</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Wind className="w-8 h-8 mx-auto mb-3 text-cyan-300" />
                <div className="text-2xl font-bold">€1,900</div>
                <div className="text-sm text-cyan-200">From Price</div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-2xl transition-all duration-300"
            >
              Book Your Kitesafari Adventure
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Your 7-Day Adventure
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From beginner-friendly bays to advanced flat water paradise, experience the ultimate Caribbean kiteboarding journey
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 via-teal-500 to-orange-500 rounded-full"></div>
            
            <div className="space-y-12">
              {itineraryData.map((day, index) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className={`w-12 h-12 rounded-full bg-gradient-to-r ${day.color} flex items-center justify-center text-white shadow-lg cursor-pointer border-4 border-white`}
                      onClick={() => setSelectedDay(selectedDay === day.day ? null : day.day)}
                    >
                      {day.icon}
                    </motion.div>
                  </div>

                  {/* Day Card */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className={`bg-white rounded-2xl shadow-xl overflow-hidden border-l-4 ${index % 2 === 0 ? 'border-l-cyan-500' : 'border-l-orange-500'} hover:shadow-2xl transition-all duration-300 cursor-pointer`}
                      onClick={() => setSelectedDay(selectedDay === day.day ? null : day.day)}
                    >
                      {/* Day Image */}
                      <div className="relative h-48 w-full">
                        <Image
                          src={day.image}
                          alt={day.imageAlt}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                            Day {day.day}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-8">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-500">{day.date}</span>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(day.difficulty)}`}>
                            {day.difficulty}
                          </span>
                        </div>
                      
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{day.title}</h3>
                        <div className="flex items-center text-cyan-600 mb-3">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="text-sm font-medium">{day.location}</span>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{day.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-orange-600">
                            <Wind className="w-4 h-4 mr-2" />
                            <span className="text-sm font-medium">{day.windConditions}</span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Day View */}
      <AnimatePresence>
        {selectedDay && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="py-20 bg-gradient-to-br from-cyan-50 to-blue-50"
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              {(() => {
                const day = itineraryData.find(d => d.day === selectedDay);
                if (!day) return null;
                
                return (
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden"
                  >
                    {/* Modal Hero Image */}
                    <div className="relative h-64 w-full">
                      <Image
                        src={day.image}
                        alt={day.imageAlt}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-6 left-8 text-white">
                        <h3 className="text-3xl font-bold mb-2">{day.title}</h3>
                        <div className="flex items-center">
                          <MapPin className="w-5 h-5 mr-2" />
                          <span className="text-lg font-medium">{day.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-8 md:p-12">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getDifficultyColor(day.difficulty)}`}>
                            {day.difficulty} level
                          </span>
                        </div>
                        <button
                          onClick={() => setSelectedDay(null)}
                          className="text-gray-400 hover:text-gray-600 text-2xl"
                        >
                          ×
                        </button>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 mb-4">Activity Details</h4>
                          <p className="text-gray-600 mb-6">{day.description}</p>
                          
                          <div className="space-y-4">
                            <div className="flex items-center">
                              <Wind className="w-5 h-5 text-orange-500 mr-3" />
                              <div>
                                <div className="font-medium text-gray-900">Wind Conditions</div>
                                <div className="text-gray-600">{day.windConditions}</div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-5 h-5 text-blue-500 mr-3" />
                              <div>
                                <div className="font-medium text-gray-900">Activity</div>
                                <div className="text-gray-600">{day.activity}</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xl font-bold text-gray-900 mb-4">Highlights</h4>
                          <ul className="space-y-3">
                            {day.highlights.map((highlight, index) => (
                              <li key={index} className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-500 mr-3 flex-shrink-0" />
                                <span className="text-gray-600">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Route Map */}
      <KitesafariRouteMap />

      {/* What's Included */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What's Included
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for the ultimate luxury kitesafari experience
            </p>
          </motion.div>

          {/* Luxury Catamaran Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/luxury-catamaran-yacht-on-turquoise-water.png"
                alt="Luxury catamaran yacht on turquoise water"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-3xl font-bold mb-2">Luxury Catamaran Experience</h3>
                <p className="text-lg text-cyan-100">Your floating home for 7 days of adventure</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {includedFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-white to-cyan-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-cyan-100"
              >
                <div className="text-cyan-600 mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wind Conditions */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Perfect Wind Conditions
            </h2>
            <p className="text-xl text-cyan-100 max-w-3xl mx-auto">
              December 2025 offers the best kiteboarding conditions in the Caribbean
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {windConditions.map((condition, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
              >
                <h3 className="text-2xl font-bold mb-6">{condition.month}</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-100">Average Wind</span>
                    <span className="font-bold text-xl">{condition.avgWind}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-100">Consistency</span>
                    <span className="font-bold text-xl">{condition.consistency}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-100">Temperature</span>
                    <span className="font-bold text-xl">{condition.temperature}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Your Kitesafari Memories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the beauty and adventure that awaits you in the Caribbean
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative h-80 rounded-2xl overflow-hidden shadow-xl group cursor-pointer"
            >
              <Image
                src="/antigua-caribbean-sunset-kiteboarding.png"
                alt="Caribbean sunset kiteboarding"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-lg font-bold">Sunset Sessions</h3>
                <p className="text-sm text-cyan-100">Golden hour kiteboarding</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-80 rounded-2xl overflow-hidden shadow-xl group cursor-pointer"
            >
              <Image
                src="/group-kiteboarding-session.png"
                alt="Group kiteboarding session"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-lg font-bold">Group Sessions</h3>
                <p className="text-sm text-cyan-100">Learn with fellow kiters</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative h-80 rounded-2xl overflow-hidden shadow-xl group cursor-pointer"
            >
              <Image
                src="/antigua-coral-reef-underwater-snorkeling.png"
                alt="Coral reef underwater snorkeling"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-lg font-bold">Underwater Paradise</h3>
                <p className="text-sm text-cyan-100">Explore coral reefs</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-navy-900 via-blue-900 to-cyan-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready for Your Kitesafari Adventure?
            </h2>
            <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
              Join us for the ultimate 7-day Caribbean kiteboarding experience. Limited spots available for December 2025.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-2xl transition-all duration-300"
              >
                Book Now - €1,900
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300"
              >
                Download Itinerary
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
