import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import PayPalCheckout from './PayPalButton';
import { api } from '../services/api';

const filters = ['UNISEX', 'MEN', 'WOMEN'];

export default function GlobalBrands() {
  const [activeFilter, setActiveFilter] = useState('UNISEX');
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const { toggleWishlist, isInWishlist } = useCart();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        if (data.success) {
          setProducts(data.data.slice(10, 20));
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = activeFilter === 'UNISEX'
    ? products
    : products.filter(p => p.category === activeFilter.toLowerCase());

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
                  {/* Image - Link to product detail */}
                  <Link to={`/product/${product.id}`} className="relative aspect-square bg-gray-50 block">
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
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors z-10"
                      aria-label="Add to wishlist"
                    >
                      <Heart
                        className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                      />
                    </button>
                  </Link>

                  {/* Info */}
                  <div className="p-3">
                    <Link to={`/product/${product.id}`}>
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">{product.brand}</p>
                      <h3 className="text-xs sm:text-sm font-medium line-clamp-2 mb-1.5 min-h-[2.5em] hover:text-gray-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-base sm:text-lg font-bold text-red-600">${product.price.toLocaleString()}</span>
                      <span className="text-xs text-gray-400 line-through">${product.originalPrice.toLocaleString()}</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-2.5">
                      Pay ${product.emi}/mo
                    </p>
                    <div className="flex gap-2">
                      <Link
                        to={`/product/${product.id}`}
                        className="flex-1 py-2 bg-black text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors text-center"
                      >
                        View Details
                      </Link>
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
