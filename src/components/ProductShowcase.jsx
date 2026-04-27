import { useState, useRef, useEffect } from 'react';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "Air Jordan 1 RETRO High OG Yellow Toe Taxi",
    price: 14999,
    originalPrice: 64995,
    discount: 77,
    badge: "UPTO 77% OFF",
    badgeColor: "bg-red-600",
    emi: 1250,
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&h=400&fit=crop",
    category: "men"
  },
  {
    id: 2,
    name: "Adidas Yeezy Slide Dark Onyx",
    price: 8999,
    originalPrice: 12999,
    discount: 31,
    badge: "SELLING FAST",
    badgeColor: "bg-amber-500",
    emi: 750,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
    category: "unisex"
  },
  {
    id: 3,
    name: "Nike Dunk Low Retro Panda",
    price: 9999,
    originalPrice: 22995,
    discount: 57,
    badge: "NEW ARRIVAL",
    badgeColor: "bg-green-600",
    emi: 833,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    category: "unisex"
  },
  {
    id: 4,
    name: "New Balance 550 White Green",
    price: 12999,
    originalPrice: 18999,
    discount: 32,
    badge: "INSTANT",
    badgeColor: "bg-blue-600",
    emi: 1083,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
    category: "men"
  },
  {
    id: 5,
    name: "Crocs Classic Clog White",
    price: 3499,
    originalPrice: 5995,
    discount: 42,
    badge: "UPTO 42% OFF",
    badgeColor: "bg-red-600",
    emi: 292,
    image: "https://images.unsplash.com/photo-1603252109303-275144230e7e?w=400&h=400&fit=crop",
    category: "unisex"
  },
  {
    id: 6,
    name: "Adidas Samba OG White Black",
    price: 7999,
    originalPrice: 10999,
    discount: 27,
    badge: "TRENDING",
    badgeColor: "bg-purple-600",
    emi: 667,
    image: "https://images.unsplash.com/photo-1560769629-975e13f0c470?w=400&h=400&fit=crop",
    category: "women"
  },
  {
    id: 7,
    name: "Puma Suede Classic XXl",
    price: 5999,
    originalPrice: 8999,
    discount: 33,
    badge: "UPTO 33% OFF",
    badgeColor: "bg-red-600",
    emi: 500,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop",
    category: "men"
  },
  {
    id: 8,
    name: "Converse Chuck 70 High Top",
    price: 5499,
    originalPrice: 7499,
    discount: 27,
    badge: "CLASSIC",
    badgeColor: "bg-gray-800",
    emi: 458,
    image: "https://images.unsplash.com/photo-1491553895911-0055uj3a34?w=400&h=400&fit=crop",
    category: "unisex"
  },
  {
    id: 9,
    name: "Vans Old Skool Black White",
    price: 4499,
    originalPrice: 5999,
    discount: 25,
    badge: "UPTO 25% OFF",
    badgeColor: "bg-red-600",
    emi: 375,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop",
    category: "unisex"
  },
  {
    id: 10,
    name: "Nike Air Force 1 '07 White",
    price: 7499,
    originalPrice: 11995,
    discount: 37,
    badge: "BESTSELLER",
    badgeColor: "bg-amber-500",
    emi: 625,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
    category: "women"
  }
];

const filters = ['UNISEX', 'MEN', 'WOMEN'];

export default function ProductShowcase() {
  const [activeFilter, setActiveFilter] = useState('UNISEX');
  const [wishlist, setWishlist] = useState(new Set());
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const filteredProducts = activeFilter === 'UNISEX'
    ? products
    : products.filter(p => p.category === activeFilter.toLowerCase());

  const toggleWishlist = (id) => {
    setWishlist(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

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
  }, [filteredProducts]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="w-full py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-red-600">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
            </svg>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">UP TO 70% OFF</h2>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-red-600">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
            </svg>
          </div>
          <p className="text-gray-500 text-sm sm:text-base">
            Hottest Drip From Around The World. Refreshed Daily.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-6">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 sm:px-6 py-2 text-sm font-medium rounded-full transition-all ${
                activeFilter === filter
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Product Carousel */}
        <div className="relative group">
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4"
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 snap-start w-[200px] sm:w-[220px] group/card"
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                  {/* Image */}
                  <div className="relative aspect-square bg-gray-50">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Badge */}
                    <span className={`absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold text-white ${product.badgeColor} rounded`}>
                      {product.badge}
                    </span>
                    {/* Wishlist */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                      aria-label="Add to wishlist"
                    >
                      <Heart
                        className={`w-4 h-4 ${wishlist.has(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                      />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <h3 className="text-xs sm:text-sm font-medium line-clamp-2 mb-1.5 min-h-[2.5em]">
                      {product.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-base sm:text-lg font-bold text-red-600">₹{product.price.toLocaleString()}</span>
                      <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-2.5">
                      EMI @INR {product.emi}/Month
                    </p>
                    <button className="w-full py-2 bg-black text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors">
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
