"use client"

import Image from "next/image"
import { ExternalLink, Star, Users, Award, MapPin } from "lucide-react"
import Link from "next/link"
import PuntaTrettuWebcam from "./webcam/PuntaTrettuWebcam"

export function SardiniaPartnerSchools() {
  const partnerSchools = [
    {
      name: "PROKITE SARDEGNA",
      website: "https://prokitesardegna.com/",
      logo: "/placeholder-logo.png", // Replace with actual logo when available
      description: "Professional kitesurf school specializing in beginner instruction at Punta Trettu. Certified IKO instructors with years of experience teaching in the flat, shallow lagoon conditions perfect for learning.",
      features: ["IKO Certified Instructors", "Beginner-Friendly Equipment", "Small Group Lessons"],
      discount: "15%",
    },
    {
      name: "KITEHOUSE SARDINIA",
      website: "https://kitehousesardinia.com/",
      logo: "/placeholder-logo.png", // Replace with actual logo when available
      description: "Premier kitesurf academy offering comprehensive courses from beginner to advanced levels. Located directly at Punta Trettu with modern equipment and personalized instruction in ideal learning conditions.",
      features: ["Modern Equipment Fleet", "Personalized Instruction", "April-October Operations"],
      discount: "20%",
    },
  ]

  return (
    <div className="bg-gradient-to-br from-turquoise/5 via-sand-beige/10 to-deep-navy/5 py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-deep-navy mb-4">
            Learn to Kitesurf in Sardinia
          </h2>
          <p className="font-open-sans text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Master kitesurfing at <span className="font-semibold text-turquoise">Punta Trettu</span>, one of Europe's most beginner-friendly locations. 
            Our trusted partner schools offer professional instruction in flat, shallow lagoons with steady winds from April to October - perfect for your first kitesurfing experience.
          </p>
          
          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
              <MapPin className="w-5 h-5 text-turquoise" />
              <span className="font-open-sans text-sm font-medium text-gray-700">Flat Shallow Lagoon</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
              <Users className="w-5 h-5 text-turquoise" />
              <span className="font-open-sans text-sm font-medium text-gray-700">Beginner-Friendly</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
              <Award className="w-5 h-5 text-turquoise" />
              <span className="font-open-sans text-sm font-medium text-gray-700">Certified Instructors</span>
            </div>
          </div>
        </div>

        {/* Partner Schools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {partnerSchools.map((school, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* School Header */}
              <div className="bg-gradient-to-r from-turquoise to-deep-navy p-6 text-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Image
                        src={school.logo}
                        alt={`${school.name} logo`}
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    <h3 className="font-montserrat font-bold text-xl md:text-2xl">{school.name}</h3>
                  </div>
                  <div className="bg-coral-orange text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {school.discount} OFF
                  </div>
                </div>
                <p className="font-open-sans text-turquoise/90 text-sm">
                  Exclusive KiteSafaris Partner Discount
                </p>
              </div>

              {/* School Content */}
              <div className="p-6">
                <p className="font-open-sans text-gray-700 leading-relaxed mb-6">
                  {school.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {school.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-turquoise rounded-full flex-shrink-0"></div>
                      <span className="font-open-sans text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <a
                  href={school.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-turquoise to-deep-navy hover:from-turquoise/90 hover:to-deep-navy/90 text-white font-montserrat font-semibold px-6 py-3 rounded-lg text-center transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <span>Book with Discount</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Live Webcam Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <div className="text-center mb-6">
            <h3 className="font-montserrat font-bold text-2xl text-deep-navy mb-3">
              Live Webcam - Punta Trettu
            </h3>
            <p className="font-open-sans text-gray-700 max-w-3xl mx-auto">
              Check the current wind and weather conditions at Punta Trettu with our live webcam. 
              Perfect for planning your kitesurfing session and comparing with wind forecasts.
            </p>
          </div>
          
          {/* Webcam Container */}
          <div className="relative">
            <PuntaTrettuWebcam
              poster="/sardinia-punta-trettu-kiteboarding-mediterranean-c.png"
              className="w-full max-h-[540px] bg-black rounded-lg shadow-lg"
              ariaLabel="Live webcam stream: Punta Trettu, Sardinia - Kitesurfing conditions"
            />
            
            {/* Webcam Source Attribution */}
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="font-open-sans text-xs">via</span>
                <a
                  href="https://prokitesardegna.com/en/webcam-punta-trettu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-open-sans text-xs font-medium text-turquoise hover:text-turquoise/80 transition-colors"
                >
                  PROKITE SARDEGNA
                </a>
              </div>
            </div>
          </div>
          
          {/* Wind Forecast Links */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-montserrat font-semibold text-lg text-deep-navy mb-4 text-center">
              Wind Forecast Resources
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="https://www.windguru.cz/436366"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">W</span>
                </div>
                <div>
                  <div className="font-open-sans font-medium text-gray-800 text-sm">Windguru</div>
                  <div className="font-open-sans text-gray-600 text-xs">Punta Trettu Forecast</div>
                </div>
              </a>
              
              <a
                href="https://www.windy.com/?39.230,9.121,5"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">W</span>
                </div>
                <div>
                  <div className="font-open-sans font-medium text-gray-800 text-sm">Windy</div>
                  <div className="font-open-sans text-gray-600 text-xs">Interactive Wind Map</div>
                </div>
              </a>
              
              <a
                href="https://it.windfinder.com/weatherforecast/punta_trettu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">W</span>
                </div>
                <div>
                  <div className="font-open-sans font-medium text-gray-800 text-sm">Windfinder</div>
                  <div className="font-open-sans text-gray-600 text-xs">Weather Forecast</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-6">
            <h3 className="font-montserrat font-bold text-2xl text-deep-navy mb-3">
              Why Choose Punta Trettu for Kitesurfing?
            </h3>
            <p className="font-open-sans text-gray-700 max-w-3xl mx-auto">
              Punta Trettu offers the perfect learning environment with its unique combination of flat water, 
              consistent winds from April to October, and shallow depth - making it one of the safest and most effective places to learn kitesurfing in Europe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-turquoise/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-turquoise" />
              </div>
              <h4 className="font-montserrat font-semibold text-lg text-deep-navy mb-2">Perfect Location</h4>
              <p className="font-open-sans text-sm text-gray-600">
                Flat, shallow lagoon with no obstacles - ideal for beginners to practice safely
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-turquoise/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-turquoise" />
              </div>
              <h4 className="font-montserrat font-semibold text-lg text-deep-navy mb-2">Expert Instruction</h4>
              <p className="font-open-sans text-sm text-gray-600">
                Certified instructors with years of experience teaching in these specific conditions
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-turquoise/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-turquoise" />
              </div>
              <h4 className="font-montserrat font-semibold text-lg text-deep-navy mb-2">Exclusive Benefits</h4>
              <p className="font-open-sans text-sm text-gray-600">
                Special KiteSafaris discounts and priority booking with our trusted partners
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-deep-navy to-turquoise rounded-2xl p-8 text-white">
            <h3 className="font-montserrat font-bold text-2xl mb-4">
              Ready to Start Your Kitesurfing Journey?
            </h3>
            <p className="font-open-sans text-lg mb-6 opacity-90">
              Contact us to learn more about our partner school discounts and book your kitesurfing lessons in Sardinia.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-coral-orange hover:bg-coral-orange/90 text-white font-montserrat font-semibold px-8 py-3 rounded-lg text-lg transition-colors duration-200"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
