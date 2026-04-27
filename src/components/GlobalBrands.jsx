import { useRef, useState, useEffect } from 'react';
import { Heart, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import PayPalCheckout from './PayPalButton';

const brandProducts = [
  {
    id: 1,
    name: "Coach Tabby Shoulder Bag 26",
    brand: "Coach",
    price: 320,
    originalPrice: 575,
    discount: 44,
    badge: "LUXURY",
    badgeColor: "bg-gray-900",
    emi: 27,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
    category: "women"
  },
  {
    id: 2,
    name: "Prada Re-Nylon Bucket Hat",
    brand: "Prada",
    price: 590,
    originalPrice: 870,
    discount: 32,
    badge: "DESIGNER",
    badgeColor: "bg-black",
    emi: 49,
    image: "https://images.unsplash.com/photo-1575428652377-a2697242636b?w=400&h=400&fit=crop",
    category: "unisex"
  },
  {
    id: 3,
    name: "Seiko 5 Sports SRPD51K1",
    brand: "Seiko",
    price: 245,
    originalPrice: 360,
    discount: 32,
    badge: "WATCHES",
    badgeColor: "bg-blue-700",
    emi: 20,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop",
    category: "men"
  },
  {
    id: 4,
    name: "Stussy Basic Stussy Tee",
    brand: "Stussy",
    price: 64,
    originalPrice: 102,
    discount: 37,
    badge: "STREETWEAR",
    badgeColor: "bg-amber-600",
    emi: 5,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "unisex"
  },
  {
    id: 5,
    name: "Kenzo Tiger Crest Hoodie",
    brand: "Kenzo",
    price: 295,
    originalPrice: 462,
    discount: 36,
    badge: "PREMIUM",
    badgeColor: "bg-green-700",
    emi: 25,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    category: "men"
  },
  {
    id: 6,
    name: "Karl Lagerfeld K/Signature Tote",
    brand: "Karl Lagerfeld",
    price: 245,
    originalPrice: 410,
    discount: 41,
    badge: "HANDBAGS",
    badgeColor: "bg-purple-700",
    emi: 20,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop",
    category: "women"
  },
  {
    id: 7,
    name: "LEGO Technic Ferrari Daytona",
    brand: "LEGO",
    price: 385,
    originalPrice: 515,
    discount: 25,
    badge: "COLLECTIBLES",
    badgeColor: "bg-red-700",
    emi: 32,
    image: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=400&h=400&fit=crop",
    category: "unisex"
  },
  {
    id: 8,
    name: "Adidas Yeezy Boost 350 V2",
    brand: "Adidas Yeezy",
    price: 282,
    originalPrice: 372,
    discount: 24,
    badge: "HYPE",
    badgeColor: "bg-orange-600",
    emi: 24,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
    category: "unisex"
  },
  {
    id: 9,
    name: "Air Jordan 4 Retro Military Black",
    brand: "Air Jordan",
    price: 245,
    originalPrice: 450,
    discount: 46,
    badge: "SELLING FAST",
    badgeColor: "bg-amber-500",
    emi: 20,
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&h=400&fit=crop",
    category: "men"
  },
  {
    id: 10,
    name: "Rolex Submariner Date Homage",
    brand: "Rolex",
    price: 7050,
    originalPrice: 11550,
    discount: 39,
    badge: "LUXURY",
    badgeColor: "bg-gray-900",
    emi: 588,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=400&fit=crop",
    category: "men"
  }
];

const filters = ['UNISEX', 'MEN', 'WOMEN'];

export default function GlobalBrands() {
  const [activeFilter, setActiveFilter] = useState('UNISEX');
  const [wishlist, setWishlist] = useState(new Set());
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const filteredProducts = activeFilter === 'UNISEX'
    ? brandProducts
    : brandProducts.filter(p => p.category === activeFilter.toLowerCase());

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
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">SHOP FROM GLOBAL BRANDS</h2>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-red-600">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
            </svg>
          </div>
          <p className="text-gray-500 text-sm sm:text-base">
            Authentic Luxury From Around The World
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
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">{product.brand}</p>
                    <h3 className="text-xs sm:text-sm font-medium line-clamp-2 mb-1.5 min-h-[2.5em]">
                      {product.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-base sm:text-lg font-bold text-red-600">${product.price.toLocaleString()}</span>
                      <span className="text-xs text-gray-400 line-through">${product.originalPrice.toLocaleString()}</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-2.5">
                      Pay ${product.emi}/mo
                    </p>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-black text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors">
                        Explore
                      </button>
                      <button
                        onClick={() => setCheckoutProduct(product)}
                        className="py-2 px-3 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        title="Buy Now with PayPal"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {checkoutProduct && (
        <PayPalCheckout
          product={checkoutProduct}
          onClose={() => setCheckoutProduct(null)}
        />
      )}
    </section>
  );
}
