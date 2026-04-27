import { useState, useEffect } from 'react';
import { Menu, Search, X, Heart, ShoppingBag, User } from 'lucide-react';

const promoMessages = [
  "MYSTERY BOX 2.0 IS LIVE - FREE SHIPPING WORLDWIDE",
  "SUMMER SALE IS LIVE - UP TO 75% OFF",
  "FREE EXPRESS SHIPPING ON ORDERS ABOVE $150"
];

export default function Header() {
  const [currentPromo, setCurrentPromo] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promoMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full sticky top-0 z-50 bg-white">
      {/* Promotional Banner */}
      <div className="bg-black text-white text-center py-2 px-4 text-xs sm:text-sm font-medium tracking-wide">
        <p className="animate-fade-in-up">{promoMessages[currentPromo]}</p>
      </div>

      {/* Main Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left: Menu + Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMenuOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
              <a href="/" className="flex items-center">
                <span className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                  LUXE CART
                </span>
              </a>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button className="hidden sm:flex p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Wishlist">
                <Heart className="w-5 h-5" />
              </button>
              <button className="hidden sm:flex p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Account">
                <User className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative" aria-label="Cart">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center">0</span>
              </button>
              <a
                href="#app"
                className="hidden md:inline-flex items-center px-4 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
              >
                Get App
              </a>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="border-t border-gray-200 px-4 py-3 animate-fade-in-up">
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for sneakers, apparel, brands..."
                className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                autoFocus
              />
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setMenuOpen(false)}>
          <div
            className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <span className="text-lg font-bold">Menu</span>
              <button onClick={() => setMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-1">
              {['What\'s New', 'SALE', 'Sneakers', 'Apparels', 'Brands', 'Accessories', 'Jewellery', 'Curated'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block px-4 py-3 text-sm font-medium hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
