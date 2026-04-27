import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  {
    id: 1,
    title: "Mystery Box 2.0",
    subtitle: "Unbox Exclusive Drops",
    gradient: "from-purple-600 to-pink-600",
    textColor: "text-white",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=900&fit=crop"
  },
  {
    id: 2,
    title: "Palm Angels Drop",
    subtitle: "Italian Street Luxury",
    gradient: "from-black to-gray-800",
    textColor: "text-white",
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&h=900&fit=crop"
  },
  {
    id: 3,
    title: "Alan Koch Collection",
    subtitle: "Limited Edition Pieces",
    gradient: "from-amber-600 to-orange-700",
    textColor: "text-white",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=900&fit=crop"
  },
  {
    id: 4,
    title: "Cultured Summer",
    subtitle: "Heatwave Essentials",
    gradient: "from-blue-500 to-cyan-500",
    textColor: "text-white",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=900&fit=crop"
  },
  {
    id: 5,
    title: "Seiko Mod",
    subtitle: "Custom Timepieces",
    gradient: "from-emerald-600 to-teal-700",
    textColor: "text-white",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=900&fit=crop"
  },
  {
    id: 6,
    title: "Kodak x Charmera",
    subtitle: "Retro Meets Modern",
    gradient: "from-red-600 to-rose-700",
    textColor: "text-white",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=900&fit=crop"
  },
  {
    id: 7,
    title: "Private Label",
    subtitle: "Exclusive In-House",
    gradient: "from-slate-700 to-slate-900",
    textColor: "text-white",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=900&fit=crop"
  },
  {
    id: 8,
    title: "Ami Paris",
    subtitle: "French Elegance",
    gradient: "from-indigo-600 to-purple-700",
    textColor: "text-white",
    image: "https://images.unsplash.com/photo-1560769629-975e13f0c470?w=600&h=900&fit=crop"
  },
  {
    id: 9,
    title: "Instant Shipping",
    subtitle: "Get It In 24 Hours",
    gradient: "from-green-600 to-emerald-700",
    textColor: "text-white",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=900&fit=crop"
  },
  {
    id: 10,
    title: "Store Experience",
    subtitle: "Visit Our Flagship",
    gradient: "from-yellow-500 to-amber-600",
    textColor: "text-white",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=900&fit=crop"
  },
  {
    id: 11,
    title: "Luxury Category",
    subtitle: "High-End Selection",
    gradient: "from-gray-900 to-black",
    textColor: "text-white",
    image: "https://images.unsplash.com/photo-1509319117193-518da7274ae3?w=600&h=900&fit=crop"
  }
];

export default function HeroCarousel() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative w-full py-4 sm:py-6">
      <div className="relative group">
        {/* Scroll Buttons */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto hide-scrollbar px-4 sm:px-6 snap-x snap-mandatory"
        >
          {banners.map((banner) => (
            <a
              key={banner.id}
              href={`#${banner.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex-shrink-0 snap-start w-[180px] sm:w-[220px] md:w-[260px] group/card"
            >
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${banner.gradient} opacity-60`} />
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <h3 className={`text-lg sm:text-xl font-bold ${banner.textColor} leading-tight`}>
                    {banner.title}
                  </h3>
                  <p className={`text-xs sm:text-sm ${banner.textColor} opacity-90 mt-1`}>
                    {banner.subtitle}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
