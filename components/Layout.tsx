import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User, Phone, Heart, ChevronRight, LogIn } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Blog', path: '/blog' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800">
      {/* Promo Bar */}
      <div className="bg-slate-900 text-slate-300 text-[10px] sm:text-xs py-2 px-4 text-center tracking-wide z-50">
        <span className="font-bold text-white mr-1 sm:mr-2">🇳🇵 DASHAIN OFFER:</span> 
        Free Delivery inside Kathmandu Valley for orders over NPR 5000!
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'glass-nav shadow-sm py-2' : 'bg-transparent py-3 md:py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-2 group z-50 relative">
                <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg shadow-red-200 group-hover:shadow-red-300 transition-all duration-300">
                  H
                </div>
                <div className="flex flex-col">
                   <span className="font-bold text-lg md:text-xl tracking-tight leading-none text-slate-900">Hamro</span>
                   <span className="text-[9px] md:text-[10px] font-bold text-red-600 tracking-widest uppercase leading-none">Commerce</span>
                </div>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-1 bg-white/50 backdrop-blur-sm px-2 py-1 rounded-full border border-gray-100/50 shadow-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`${
                    location.pathname === link.path 
                      ? 'bg-white text-red-600 shadow-sm font-semibold' 
                      : 'text-slate-600 hover:text-red-600 hover:bg-white/50 font-medium'
                  } transition-all duration-300 text-sm px-4 lg:px-5 py-2 rounded-full`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-1 sm:gap-3 z-50 relative">
              <button className="hidden sm:flex p-2.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-all">
                <Search size={20} />
              </button>
              
               <Link to="/shop" className="hidden sm:flex p-2.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-all">
                <Heart size={20} />
              </Link>

              <Link to="/cart" className="p-2.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-all relative group">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-white animate-bounce">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link to="/login" className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 hover:shadow-slate-300 active:scale-95">
                <User size={16} />
                <span>Login</span>
              </Link>

              <button 
                className="md:hidden p-2 ml-1 text-slate-800 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Full Screen Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-white z-40 md:hidden transition-all duration-300 ease-in-out transform ${
            isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
          }`}
          style={{ top: '0', paddingTop: '80px' }}
        >
            <div className="flex flex-col h-full px-6 pb-8 overflow-y-auto">
              <div className="space-y-2 mt-4">
                {navLinks.map((link, idx) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center justify-between p-4 rounded-2xl text-lg font-bold transition-all ${
                      location.pathname === link.path
                        ? 'bg-red-50 text-red-600 pl-6'
                        : 'text-slate-800 hover:bg-slate-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ transitionDelay: `${idx * 50}ms` }}
                  >
                    {link.name}
                    {location.pathname === link.path && <ChevronRight size={20} />}
                  </Link>
                ))}
              </div>
              
              <div className="mt-auto space-y-4 pt-8">
                 <div className="grid grid-cols-2 gap-4">
                     <Link 
                        to="/shop" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-50 rounded-2xl text-slate-700 font-semibold"
                     >
                        <Heart size={24} className="text-red-500"/> Wishlist
                     </Link>
                     <Link 
                        to="/contact" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-50 rounded-2xl text-slate-700 font-semibold"
                     >
                        <Phone size={24} className="text-blue-500"/> Support
                     </Link>
                 </div>

                 <Link
                  to="/login"
                  className="flex items-center justify-center gap-3 w-full px-4 py-5 rounded-2xl bg-slate-900 text-white text-lg font-bold shadow-xl active:scale-95 transition-transform"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogIn size={20} /> Login / Sign Up
                </Link>
              </div>
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-16 md:pt-20 pb-10 rounded-t-[2rem] md:rounded-t-[3rem] mt-12">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-white font-bold text-2xl">
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/50">H</div>
              Hamro Commerce
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              Your trusted partner for online shopping in Nepal. We bring authentic local products and global brands right to your doorstep with love and care.
            </p>
            <div className="flex gap-4 pt-2">
                 {[1,2,3,4].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full bg-slate-800 hover:bg-red-600 transition-colors cursor-pointer flex items-center justify-center text-white text-xs">
                        <span className="sr-only">Social {i}</span>
                        Sc
                     </div>
                 ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-8 text-lg">Shop & Learn</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/shop" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span> Shop All</Link></li>
              <li><Link to="/blog" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span> Latest News</Link></li>
              <li><Link to="/gallery" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span> Gallery</Link></li>
              <li><Link to="/about" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span> About Us</Link></li>
              <li><Link to="/contact" className="hover:text-red-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-red-500 rounded-full"></span> Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-8 text-lg">Contact Us</h4>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 text-red-500">
                   <span className="text-xl">📍</span>
                </div>
                <div>
                    <span className="block text-white font-bold">Head Office</span>
                    <span>New Baneshwor, Kathmandu<br/>Nepal</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 text-red-500">
                   <Phone size={18} />
                </div>
                 <div>
                    <span className="block text-white font-bold">Phone</span>
                    <span>+977 9800000000</span>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-8 text-lg">Newsletter</h4>
            <p className="text-sm mb-6 text-slate-400">Subscribe to get special offers and deals directly to your inbox.</p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-slate-800/50 border border-slate-700 rounded-xl text-sm px-5 py-3 w-full focus:ring-2 focus:ring-red-500 focus:outline-none text-white placeholder-slate-500 transition-all focus:bg-slate-800"
              />
              <button className="bg-red-600 text-white px-5 py-3 rounded-xl hover:bg-red-700 transition-all font-bold shadow-lg shadow-red-900/30">
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-8 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
          <div>© {new Date().getFullYear()} Hamro Commerce Pvt. Ltd. All rights reserved.</div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Returns</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;