import Link from "next/link"
import { Facebook, Instagram, Youtube, Twitter, Phone, Mail, MapPin } from "lucide-react"

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/kitesafaris", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/kitesafaris_com", label: "Instagram" },
  { icon: Youtube, href: "https://www.youtube.com/@KiteSafaris", label: "YouTube" },
  { icon: Twitter, href: "https://twitter.com/kitesafaris", label: "Twitter" },
]

const quickLinks = [
  { name: "Destinations", href: "/destinations" },
  { name: "Packages", href: "/packages" },
  { name: "Gallery", href: "/gallery" },
  { name: "Reviews", href: "/reviews" },
  { name: "Guides", href: "/guides" },
  { name: "FAQ", href: "/faq" },
]

const featureLinks = [
  { name: "Small Groups", href: "/small-groups" },
  { name: "Expert Guides", href: "/expert-guides" },
  { name: "Premium Equipment", href: "/premium-equipment" },
  { name: "Guaranteed Wind", href: "/guaranteed-wind" },
]

const policies = [
  { name: "Refund Policy", href: "/policies/refund" },
  { name: "Cancellation Policy", href: "/policies/cancellation" },
  { name: "Insurance Coverage", href: "/policies/insurance" },
  { name: "Safety Guidelines", href: "/policies/safety" },
  { name: "Terms of Service", href: "/policies/terms" },
  { name: "Privacy Policy", href: "/policies/privacy" },
]

export function EnhancedFooter() {
  return (
    <footer className="bg-gray-200 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="space-y-4 lg:col-span-2">
            <h3 className="font-montserrat font-bold text-xl text-turquoise">KiteSafaris.com</h3>
            <p className="font-open-sans text-gray-800 leading-relaxed">
              Unforgettable kiteboarding safaris combining luxury, adventure, and freedom across the Caribbean and
              Mediterranean.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-coral-orange" aria-hidden="true" />
                <a
                  href="tel:+32492576427"
                  className="font-open-sans text-gray-800 hover:text-gray-600 transition-colors"
                >
                  +32 492 57 64 27
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-coral-orange" aria-hidden="true" />
                <a
                  href="mailto:info@kitesafaris.com"
                  className="font-open-sans text-gray-800 hover:text-gray-600 transition-colors"
                >
                  info@kitesafaris.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-coral-orange" aria-hidden="true" />
                <span className="font-open-sans text-gray-800">Belgium & Global Destinations</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-montserrat font-bold text-lg text-turquoise">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="font-open-sans text-gray-800 hover:text-gray-600 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="font-montserrat font-bold text-lg text-turquoise">Our Features</h3>
            <ul className="space-y-2">
              {featureLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="font-open-sans text-gray-800 hover:text-gray-600 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div className="space-y-4">
            <h3 className="font-montserrat font-bold text-lg text-turquoise">Policies & Safety</h3>
            <ul className="space-y-2">
              {policies.map((policy) => (
                <li key={policy.name}>
                  <Link
                    href={policy.href}
                    className="font-open-sans text-gray-800 hover:text-gray-600 transition-colors"
                  >
                    {policy.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social & Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-400">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
            <div>
              <h3 className="font-montserrat font-bold text-lg text-turquoise mb-4">Stay Connected</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-800 hover:bg-coral-orange transition-colors focus:outline-none focus:ring-2 focus:ring-coral-orange"
                      aria-label={social.label}
                    >
                      <IconComponent className="w-5 h-5 text-white" aria-hidden="true" />
                    </a>
                  )
                })}
              </div>
            </div>

            <div className="bg-sand-beige rounded-lg p-4">
              <h4 className="font-montserrat font-semibold text-navy mb-2">Transparent Policies</h4>
              <p className="font-open-sans text-sm text-gray-700 leading-relaxed">
                <strong>Refund:</strong> Full refund up to 30 days before departure.
                <br />
                <strong>Cancellation:</strong> Flexible rescheduling options available.
                <br />
                <strong>Insurance:</strong> Comprehensive coverage included in all packages.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-400 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-open-sans text-gray-800 text-sm">© 2024 KiteSafaris.com. All rights reserved.</p>
            <div className="flex items-center space-x-6">
              <span className="font-open-sans text-gray-800 text-sm">Certified by IKO & PADI</span>
              <span className="font-open-sans text-gray-800 text-sm">Fully Insured & Licensed</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
