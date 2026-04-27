import { ArrowUpRight } from 'lucide-react';

const articles = [
  {
    id: 1,
    outlet: "ANI News",
    logo: "ANI",
    headline: "Culture Circle raises $5M to expand luxury sneaker marketplace in India",
    description: "The Gurugram-based startup plans to use the funds to expand its offline presence and strengthen its authentication technology.",
    link: "#"
  },
  {
    id: 2,
    outlet: "The Ken",
    logo: "TK",
    headline: "Inside India's booming resale market for luxury sneakers",
    description: "How Culture Circle built a Rs 100 crore business by authenticating and reselling premium streetwear.",
    link: "#"
  },
  {
    id: 3,
    outlet: "Economic Times",
    logo: "ET",
    headline: "Sneaker resale market in India to hit $1B by 2027",
    description: "Industry experts point to Gen Z's growing appetite for limited-edition drops and authenticated resale platforms.",
    link: "#"
  },
  {
    id: 4,
    outlet: "ET Retail",
    logo: "ETR",
    headline: "Culture Circle opens flagship experience store in Gurugram",
    description: "The 4,000 sq ft store features an authentication lab, customization studio, and exclusive drops.",
    link: "#"
  },
  {
    id: 5,
    outlet: "Cosmopolitan",
    logo: "COS",
    headline: "10 must-have sneakers for your summer wardrobe",
    description: "From Yeezy Slides to Air Jordans, here's what's trending this season according to Culture Circle's data.",
    link: "#"
  },
  {
    id: 6,
    outlet: "News18",
    logo: "N18",
    headline: "How to spot fake sneakers: Expert tips from Culture Circle",
    description: "The authentication team shares red flags every buyer should know before purchasing premium footwear.",
    link: "#"
  },
  {
    id: 7,
    outlet: "Entrepreneur India",
    logo: "EI",
    headline: "Culture Circle founders on building India's sneaker empire",
    description: "The duo shares their journey from sneaker enthusiasts to running one of India's hottest resale platforms.",
    link: "#"
  },
  {
    id: 8,
    outlet: "The Financial Express",
    logo: "TFE",
    headline: "Luxury streetwear brands eye India market through local partnerships",
    description: "International labels are collaborating with platforms like Culture Circle to reach Indian consumers.",
    link: "#"
  },
  {
    id: 9,
    outlet: "The Print",
    logo: "TP",
    headline: "Why Indian millennials are spending lakhs on sneakers",
    description: "A cultural shift sees young professionals treating limited-edition sneakers as investment assets.",
    link: "#"
  },
  {
    id: 10,
    outlet: "Republic Business",
    logo: "RB",
    headline: "Culture Circle partners with global brands for exclusive India drops",
    description: "The platform becomes the go-to destination for limited releases from Nike, Adidas, and New Balance.",
    link: "#"
  },
  {
    id: 11,
    outlet: "Financial Express",
    logo: "FE",
    headline: "Sneaker authentication: The tech behind Culture Circle's promise",
    description: "AI-powered verification and expert checkers ensure every product on the platform is 100% authentic.",
    link: "#"
  },
  {
    id: 12,
    outlet: "Business Standard",
    logo: "BS",
    headline: "Culture Circle launches mystery box feature to drive engagement",
    description: "The gamified shopping experience lets users unbox surprise premium items at discounted prices.",
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
