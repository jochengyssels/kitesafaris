import Link from "next/link"

export default function PricingTable() {
  const tiers = [
    {
      title: "Shared Cabin (Solo Traveler)",
      price: "€1,900",
      subtitle: "per person",
      description:
        "Share a cabin with another solo traveler (same gender matching where possible).",
    },
    {
      title: "Private Cabin (2 Guests)",
      price: "€3,500",
      subtitle: "per cabin (~€1,750 pp)",
      description:
        "Perfect for couples or friends. Full privacy for 2 guests in a cabin.",
      featured: true,
    },
    {
      title: "Private Cabin (1 Guest)",
      price: "€3,500",
      subtitle: "solo use",
      description:
        "Enjoy a full cabin all to yourself. Ultimate comfort & privacy.",
    },
    {
      title: "Full Catamaran (6 Guests)",
      price: "€9,900",
      subtitle: "group deal",
      description:
        "Book the whole boat. 3 cabins for up to 6 guests. Save €600 vs. booking separately.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-cyan-100 flex flex-col items-center justify-center p-8">
      <h2 className="text-4xl font-bold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-cyan-600">
        7-Day Catamaran Kitesafari
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {tiers.map((tier) => (
          <div
            key={tier.title}
            className={`relative rounded-2xl p-6 shadow-lg backdrop-blur-md bg-white/40 border border-white/20 transition hover:scale-105 ${
              tier.featured
                ? "ring-2 ring-cyan-400"
                : "hover:ring-1 hover:ring-sky-300"
            }`}
          >
            <h3 className="text-xl font-semibold mb-2">{tier.title}</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-sky-700">
                {tier.price}
              </span>
              <span className="text-sm text-gray-600">{tier.subtitle}</span>
            </div>
            <p className="text-gray-700 mt-4">{tier.description}</p>

            <Link 
              href="/booking" 
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white py-3 font-semibold shadow hover:shadow-xl transition flex items-center justify-center hover:from-sky-600 hover:to-cyan-600"
            >
              Book Now
            </Link>
          </div>
        ))}
      </div>

      <p className="text-gray-600 mt-10 text-sm">
        Secure your spot today with a €500 deposit · Limited cabins available
      </p>
    </div>
  );
}
