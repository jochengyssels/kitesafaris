import React from 'react';
import AntiguaKitesafariItinerary from '@/components/antigua-kitesafari-itinerary';
import { Navigation } from '@/components/navigation';
import { BreadcrumbNavigation } from '@/components/breadcrumb-navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Antigua Kitesafari Itinerary - 7-Day Caribbean Adventure | KiteSafaris',
  description: 'Experience the ultimate 7-day Antigua kitesafari adventure. Luxury catamaran, expert guides, and the best kiteboarding spots in the Caribbean. From €1,900. December 2025.',
  keywords: 'antigua kitesafari, caribbean kiteboarding, luxury catamaran, kiteboarding adventure, antigua kiteboarding, barbuda kiteboarding, december 2025',
  openGraph: {
    title: 'Antigua Kitesafari Itinerary - 7-Day Caribbean Adventure',
    description: 'Experience the ultimate 7-day Antigua kitesafari adventure. Luxury catamaran, expert guides, and the best kiteboarding spots in the Caribbean.',
    type: 'website',
    images: [
      {
        url: '/images/antigua-kitesafari-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Antigua Kitesafari Adventure'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Antigua Kitesafari Itinerary - 7-Day Caribbean Adventure',
    description: 'Experience the ultimate 7-day Antigua kitesafari adventure. Luxury catamaran, expert guides, and the best kiteboarding spots in the Caribbean.',
    images: ['/images/antigua-kitesafari-hero.jpg']
  },
  alternates: {
    canonical: 'https://kitesafaris.com/destinations/antigua/itinerary'
  }
};

export default function AntiguaKitesafariItineraryPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <BreadcrumbNavigation 
            items={[
              { label: "Destinations", href: "/destinations" },
              { label: "Antigua", href: "/destinations/antigua" },
              { label: "Itinerary" }
            ]} 
          />
        </div>
        <AntiguaKitesafariItinerary />
      </main>
    </div>
  );
}
