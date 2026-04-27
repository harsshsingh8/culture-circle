import { ArrowUpRight } from 'lucide-react';

const articles = [
  {
    id: 1,
    outlet: "ANI News",
    logo: "ANI",
    headline: "Luxe Cart raises $15M to expand global luxury marketplace",
    description: "The marketplace plans to use the funds to expand across North America, Europe, and Asia while strengthening authentication technology.",
    link: "#"
  },
  {
    id: 2,
    outlet: "The Ken",
    logo: "TK",
    headline: "Inside the booming global resale market for luxury sneakers",
    description: "How Luxe Cart built a multi-million dollar business by authenticating and reselling premium streetwear worldwide.",
    link: "#"
  },
  {
    id: 3,
    outlet: "Economic Times",
    logo: "ET",
    headline: "Global sneaker resale market to hit $30B by 2027",
    description: "Industry experts point to Gen Z's growing appetite for limited-edition drops and authenticated resale platforms worldwide.",
    link: "#"
  },
  {
    id: 4,
    outlet: "ET Retail",
    logo: "ETR",
    headline: "Luxe Cart opens flagship experience stores in NYC and London",
    description: "The new stores feature authentication labs, customization studios, and exclusive drops for local markets.",
    link: "#"
  },
  {
    id: 5,
    outlet: "Cosmopolitan",
    logo: "COS",
    headline: "10 must-have sneakers for your summer wardrobe",
    description: "From Yeezy Slides to Air Jordans, here's what's trending this season according to Luxe Cart's global data.",
    link: "#"
  },
  {
    id: 6,
    outlet: "News18",
    logo: "N18",
    headline: "How to spot fake sneakers: Expert tips from Luxe Cart",
    description: "The authentication team shares red flags every buyer should know before purchasing premium footwear online.",
    link: "#"
  },
  {
    id: 7,
    outlet: "Entrepreneur India",
    logo: "EI",
    headline: "Luxe Cart founders on building a global sneaker empire",
    description: "The founders share their journey from sneaker enthusiasts to running one of the world's hottest resale platforms.",
    link: "#"
  },
  {
    id: 8,
    outlet: "The Financial Express",
    logo: "TFE",
    headline: "Luxury streetwear brands expand globally through digital partnerships",
    description: "International labels are collaborating with platforms like Luxe Cart to reach consumers in the US, Europe, and Russia.",
    link: "#"
  },
  {
    id: 9,
    outlet: "The Print",
    logo: "TP",
    headline: "Why millennials worldwide are investing in rare sneakers",
    description: "A cultural shift sees young professionals treating limited-edition sneakers as alternative investment assets.",
    link: "#"
  },
  {
    id: 10,
    outlet: "Republic Business",
    logo: "RB",
    headline: "Luxe Cart partners with global brands for exclusive worldwide drops",
    description: "The platform becomes the go-to destination for limited releases from Nike, Adidas, and New Balance globally.",
    link: "#"
  },
  {
    id: 11,
    outlet: "Financial Express",
    logo: "FE",
    headline: "Sneaker authentication: The tech behind Luxe Cart's promise",
    description: "AI-powered verification and expert checkers ensure every product on the platform is 100% authentic globally.",
    link: "#"
  },
  {
    id: 12,
    outlet: "Business Standard",
    logo: "BS",
    headline: "Luxe Cart launches mystery box feature to drive global engagement",
    description: "The gamified shopping experience lets users unbox surprise premium items at discounted prices worldwide.",
    link: "#"
  }
];

export default function MediaMentions() {
  return (
    <section className="w-full py-12 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">THEY LOVE US</h2>
          <p className="text-gray-500 text-sm sm:text-base">We Are Everywhere</p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {articles.map((article) => (
            <a
              key={article.id}
              href={article.link}
              className="group bg-white rounded-xl p-5 border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all"
            >
              {/* Logo */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-gray-400 tracking-wider">{article.logo}</span>
                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
              </div>

              {/* Content */}
              <h3 className="text-sm font-semibold mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors">
                {article.headline}
              </h3>
              <p className="text-xs text-gray-500 line-clamp-3 mb-4">
                {article.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-xs font-medium text-gray-400">{article.outlet}</span>
                <span className="text-xs font-medium text-black group-hover:underline">View Article</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
