import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, HeadphonesIcon, Star, Clock, Sparkles, Percent } from 'lucide-react';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const featuredProducts = PRODUCTS.slice(0, 4);

  const categories = [
    { name: 'Traditional & Cultural', image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=800&auto=format&fit=crop', count: '150+ Items' },
    { name: 'Handmade & Artisanal', image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=800&auto=format&fit=crop', count: '200+ Items' },
    { name: 'Spiritual & Religious', image: 'https://images.unsplash.com/photo-1604608672516-f1b9b1f2a018?q=80&w=800&auto=format&fit=crop', count: '80+ Items' },
    { name: 'Ethnic Wear', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop', count: '120+ Items' },
    { name: 'Traditional Foods', image: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?q=80&w=800&auto=format&fit=crop', count: '90+ Items' },
    { name: 'Festive & Rituals', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop', count: '65+ Items' },
    { name: 'Organic & Natural', image: 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80&w=800&auto=format&fit=crop', count: '110+ Items' },
    { name: 'Cultural Gifts', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop', count: '75+ Items' },
  ];

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-16 overflow-x-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section - Premium & Elegant */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-red-300 to-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tr from-purple-300 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-bl from-amber-200 to-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-red-600 to-orange-600 text-white text-sm font-bold shadow-lg shadow-red-200 animate-pulse">
                <Sparkles size={16} />
                New Festive Collection 2024
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-tight">
                Authentic <br />
                <span className="bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Nepali Heritage
                </span>
                <br />
                <span className="text-4xl md:text-5xl lg:text-6xl">Redefined</span>
              </h1>

              <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Experience the soul of Nepal through handcrafted treasures, timeless traditions, and modern elegance — delivered with love.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/shop"
                  className="group bg-gradient-to-r from-red-600 to-orange-600 text-white px-10 py-5 rounded-full font-bold text-lg shadow-2xl shadow-red-300 hover:shadow-red-400 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  Explore Now <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="bg-white text-slate-900 px-10 py-5 rounded-full font-bold border-2 border-slate-800 hover:bg-slate-100 transition-all shadow-lg"
                >
                  Our Journey
                </Link>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-6 pt-8">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      className="w-12 h-12 rounded-full border-4 border-white shadow-md hover:scale-110 transition-transform"
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt="Customer"
                    />
                  ))}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-white flex items-center justify-center font-bold text-sm shadow-lg">
                    +5k
                  </div>
                </div>
                <div>
                  <p className="font-bold text-slate-800">5,000+ Happy Families</p>
                  <p className="text-sm text-slate-600">Across Nepal</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <img
                  src="/images/home.jpg"
                  alt="Nepali Cultural Heritage"
                  className="rounded-3xl shadow-2xl w-full max-w-lg lg:max-w-2xl object-cover border-8 border-white/90 hover:rotate-1 transition-all duration-700"
                />
                {/* Floating Badges */}
                <div className="absolute -left-6 top-20 bg-white p-4 rounded-2xl shadow-2xl border border-red-100 animate-bounce">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-red-500 to-orange-500 p-3 rounded-full text-white">
                      <Star fill="white" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">5.0 Rated</p>
                      <p className="text-xs text-slate-600">Trusted Quality</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-8 bottom-24 bg-white p-4 rounded-2xl shadow-2xl border border-green-100 animate-bounce" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-3 rounded-full text-white">
                      <Truck />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Free Delivery</p>
                      <p className="text-xs text-slate-600">Inside Valley</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid - Elegant Hover Effects */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900">Shop by Category</h2>
          <p className="text-slate-600 mt-4 text-lg">Discover Nepal’s finest collections</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={cat.name}
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <h3 className="text-xl font-bold">{cat.name}</h3>
                <p className="text-sm opacity-80 mt-1">{cat.count}</p>
              </div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Explore →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-slate-50 py-20 rounded-3xl mx-4 md:mx-8 lg:mx-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-red-600 font-bold tracking-widest uppercase text-sm">Trending Now</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-3">Bestsellers This Week</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-red-600 to-orange-600 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, idx) => (
              <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 150}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-block bg-slate-900 text-white px-12 py-5 rounded-full font-bold hover:bg-slate-800 transition-all hover:shadow-2xl uppercase tracking-wider"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: Truck, title: "Nationwide Delivery", desc: "Free shipping inside Kathmandu Valley" },
              { icon: ShieldCheck, title: "100% Authentic", desc: "Verified artisans & genuine products" },
              { icon: HeadphonesIcon, title: "24/7 Nepali Support", desc: "Call, chat, or message anytime" }
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="inline-flex p-6 bg-white/10 rounded-3xl mb-6 group-hover:scale-110 transition-transform">
                  <item.icon size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deal of the Day - High Impact */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 my-20">
        <div className="relative bg-gradient-to-br from-red-600 via-rose-600 to-pink-700 rounded-3xl p-12 md:p-20 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 text-white">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Percent className="w-10 h-10 animate-pulse" />
                <span className="text-3xl font-black">DASHAN SPECIAL</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                Up to 50% OFF
                <br />
                <span className="text-yellow-300">This Week Only!</span>
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Traditional wear, puja items, handicrafts & more
              </p>
              <Link
                to="/shop"
                className="inline-block bg-white text-red-600 px-12 py-6 rounded-full font-bold text-xl shadow-2xl hover:scale-110 transition-all"
              >
                Shop Sale Now →
              </Link>
            </div>
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
                alt="Dashain Sale"
                className="rounded-3xl shadow-2xl border-8 border-white/30 hover:rotate-3 transition-all duration-500 max-w-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-4xl mx-auto px-6 text-center py-20">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Never Miss a Deal</h2>
        <p className="text-xl text-slate-600 mb-10">Join 15,000+ Nepali shoppers getting exclusive offers</p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-8 py-5 rounded-full border-2 border-slate-300 focus:border-red-600 focus:outline-none text-lg shadow-inner"
          />
          <button className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
            Subscribe Now
          </button>
        </form>
      </section>
    </div>
  );
};

export default Home;