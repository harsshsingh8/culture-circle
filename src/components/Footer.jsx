import { useState } from 'react';
import { ArrowRight, MapPin, Clock, Phone, Mail } from 'lucide-react';

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const footerLinks = {
  products: {
    title: "PRODUCTS",
    links: ["What's New", "SALE", "Sneakers", "Apparels", "Brands", "Accessories", "Jewellery", "Curated"]
  },
  mostViewed: {
    title: "MOST VIEWED",
    links: ["Under 10,000", "Under 20,000", "Under Retails", "Holy Grails", "Popular Collabs", "High tops", "Low tops", "Mid tops", "Wmns", "Toddlers", "College essentials", "Sneakerhead jewels"]
  },
  top50: {
    title: "TOP 50",
    links: ["Top 50 watches", "Top 50 handbags", "Top 50 hoodies", "Top 50 shirts", "Top 50 pants", "Top 50 cargos", "Top 50 t-shirts", "Top 50 coats", "Top 50 blazers", "Top 50 sneakers", "Top 50 skirts", "Top 50 rings"]
  },
  knowMore: {
    title: "KNOW MORE",
    links: ["About us", "Cancellations & Returns", "Cash on Delivery Policy", "Shipping", "Terms & Conditions", "Money Back Guarantee T&C", "Privacy Policy", "For resellers", "Our Reviews", "Blogs"]
  }
};

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks for subscribing with ${email}!`);
    setEmail('');
  };

  return (
    <footer className="w-full bg-black text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Logo */}
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            LUXE CART
          </h2>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Products */}
          <div>
            <h3 className="text-xs font-bold tracking-wider mb-4 text-gray-400">{footerLinks.products.title}</h3>
            <ul className="space-y-2.5">
              {footerLinks.products.links.map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Most Viewed */}
          <div>
            <h3 className="text-xs font-bold tracking-wider mb-4 text-gray-400">{footerLinks.mostViewed.title}</h3>
            <ul className="space-y-2.5">
              {footerLinks.mostViewed.links.map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Top 50 */}
          <div>
            <h3 className="text-xs font-bold tracking-wider mb-4 text-gray-400">{footerLinks.top50.title}</h3>
            <ul className="space-y-2.5">
              {footerLinks.top50.links.map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Know More */}
          <div>
            <h3 className="text-xs font-bold tracking-wider mb-4 text-gray-400">{footerLinks.knowMore.title}</h3>
            <ul className="space-y-2.5">
              {footerLinks.knowMore.links.map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold tracking-wider mb-4 text-gray-400">CONTACT US</h3>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-300">350 Fifth Avenue, New York, NY 10118, USA</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-300">1 Canada Square, Canary Wharf, London E14 5AB, UK</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-300">24/7 Customer Support</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">US: +1 (888) 555-0199 | UK: +44 20 7946 0958</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">support@luxecart.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter & App */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid sm:grid-cols-2 gap-8">
            {/* Newsletter */}
            <div>
              <h3 className="text-sm font-bold tracking-wider mb-3">SUBSCRIBE TO OUR NEWSLETTER</h3>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Download App */}
            <div id="app">
              <h3 className="text-sm font-bold tracking-wider mb-3">DOWNLOAD THE CULTURE CIRCLE APP</h3>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg hover:border-gray-500 transition-colors"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-400 leading-none">Download on the</p>
                    <p className="text-sm font-semibold leading-tight">App Store</p>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg hover:border-gray-500 transition-colors"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-400 leading-none">Get it on</p>
                    <p className="text-sm font-semibold leading-tight">Google Play</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors" aria-label="Twitter">
                <TwitterIcon />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors" aria-label="YouTube">
                <YoutubeIcon />
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center sm:text-right">
              <p className="text-xs text-gray-500">© 2026 LuxeCart — All rights reserved</p>
              <p className="text-xs text-gray-600 mt-1">LUXE CART GLOBAL INC.</p>
              <div className="flex items-center gap-2 mt-2">
                <svg className="w-6 h-4" viewBox="0 0 48 32" fill="none">
                  <rect width="48" height="32" rx="4" fill="#003087"/>
                  <path d="M18.6 8H13l-3.2 16h3.8l1-5h2.8c3.2 0 5.4-1.6 6-5.2.3-1.8-.2-3.2-1.4-4.2C21.2 8.6 20 8 18.6 8zm-.8 5.6c-.2 1.2-1.2 1.2-2.2 1.2h-1.4l.8-4h1.4c1 0 2 .2 1.8 1.4.1.6 0 1-.4 1.4z" fill="#FFFFFF"/>
                  <path d="M34.6 8H29l-3.2 16h3.8l1-5h2.8c3.2 0 5.4-1.6 6-5.2.3-1.8-.2-3.2-1.4-4.2C37.2 8.6 36 8 34.6 8zm-.8 5.6c-.2 1.2-1.2 1.2-2.2 1.2h-1.4l.8-4h1.4c1 0 2 .2 1.8 1.4.1.6 0 1-.4 1.4z" fill="#FFFFFF"/>
                </svg>
                <span className="text-xs text-gray-500">Secure PayPal Payments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
