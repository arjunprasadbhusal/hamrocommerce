import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  HeadphonesIcon,
  Star,
  Sparkles,
  Percent,
} from "lucide-react";

import { PRODUCTS } from "../constants";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const featuredProducts = PRODUCTS.slice(0, 4);

  const categories = [
    {
      name: "Traditional & Cultural",
      image:
        "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=800&auto=format&fit=crop",
      count: "150+ Items",
    },
    {
      name: "Handmade & Artisanal",
      image:
        "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=800&auto=format&fit=crop",
      count: "200+ Items",
    },
    {
      name: "Spiritual & Religious",
      image:
        "https://images.unsplash.com/photo-1604608672516-f1b9b1f2a018?q=80&w=800&auto=format&fit=crop",
      count: "80+ Items",
    },
    {
      name: "Ethnic Wear",
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
      count: "120+ Items",
    },
    {
      name: "Traditional Foods",
      image:
        "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?q=80&w=800&auto=format&fit=crop",
      count: "90+ Items",
    },
    {
      name: "Festive & Rituals",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop",
      count: "65+ Items",
    },
    {
      name: "Organic & Natural",
      image:
        "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80&w=800&auto=format&fit=crop",
      count: "110+ Items",
    },
    {
      name: "Cultural Gifts",
      image:
        "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
      count: "75+ Items",
    },
  ];

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-16 overflow-x-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50 overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-red-600 to-orange-600 text-white text-sm font-bold shadow-lg animate-pulse">
                <Sparkles size={16} />
                New Festive Collection 2025
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-tight">
                Authentic <br />
                <span className="bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Nepali Heritage
                </span>
                <br /> Redefined
              </h1>

              <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Experience the soul of Nepal through handcrafted treasures, timeless traditions, and modern elegance.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/shop"
                  className="group bg-gradient-to-r from-red-600 to-orange-600 text-white px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:scale-105 transition-all flex items-center gap-3"
                >
                  Explore Now <ArrowRight className="group-hover:translate-x-2" />
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
                      className="w-12 h-12 rounded-full border-4 border-white shadow-md"
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt="Customer"
                    />
                  ))}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-white flex items-center justify-center font-bold">
                    +5k
                  </div>
                </div>
                <div>
                  <p className="font-bold text-slate-800">5,000+ Happy Families</p>
                  <p className="text-sm text-slate-600">Across Nepal</p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative flex justify-center lg:justify-end">
              <img
                src="/images/home.jpg"
                alt="Nepali Cultural Heritage"
                className="rounded-3xl shadow-2xl w-full max-w-lg lg:max-w-2xl object-cover border-8 border-white/90"
              />

              {/* Floating Badge */}
              <div className="absolute -left-6 top-20 bg-white p-4 rounded-2xl shadow-xl border animate-bounce">
                <div className="flex items-center gap-3">
                  <div className="bg-red-500 p-3 rounded-full text-white">
                    <Star fill="white" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">5.0 Rated</p>
                    <p className="text-xs text-slate-600">Trusted Quality</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CATEGORIES ---------------- */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900">
            Shop by Category
          </h2>
          <p className="text-slate-600 mt-4 text-lg">
            Discover Nepal’s finest collections
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group relative rounded-3xl overflow-hidden shadow-lg hover:-translate-y-3 transition-all"
            >
              <img
                src={cat.image}
                className="w-full h-64 object-cover group-hover:scale-110 duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="text-xl font-bold">{cat.name}</h3>
                <p className="text-sm opacity-80">{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------- FEATURED PRODUCTS ---------------- */}
      <section className="bg-slate-50 py-20 rounded-3xl mx-4 md:mx-8 lg:mx-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black">Bestsellers This Week</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {featuredProducts.map((product, idx) => (
              <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 150}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link className="bg-slate-900 text-white px-12 py-5 rounded-full font-bold">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- BENEFITS ---------------- */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: Truck, title: "Nationwide Delivery", desc: "Free shipping inside Kathmandu Valley" },
            { icon: ShieldCheck, title: "100% Authentic", desc: "Verified artisans & genuine products" },
            { icon: HeadphonesIcon, title: "24/7 Nepali Support", desc: "Call, chat, or message anytime" },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="inline-flex p-6 bg-white/10 rounded-3xl mb-6">
                <item.icon size={40} />
              </div>
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="text-slate-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- DEAL OF THE DAY ---------------- */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 my-20">
        <div className="relative bg-gradient-to-br from-red-600 to-pink-700 rounded-3xl p-12 md:p-20 overflow-hidden text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Percent className="w-10 h-10 animate-pulse" />
                <span className="text-3xl font-black">Dashain Special</span>
              </div>

              <h2 className="text-5xl md:text-7xl font-black leading-tight">
                Up to 50% OFF <br />
                <span className="text-yellow-300">This Week Only!</span>
              </h2>

              <Link className="bg-white text-red-600 px-12 py-6 rounded-full font-bold text-xl mt-10 inline-block">
                Shop Sale Now →
              </Link>
            </div>

            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
                className="rounded-3xl shadow-2xl border-8 border-white/30 max-w-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- NEWSLETTER ---------------- */}
      <section className="max-w-4xl mx-auto px-6 text-center py-20">
        <h2 className="text-4xl md:text-5xl font-black">Never Miss a Deal</h2>
        <p className="text-xl text-slate-600 mb-10">
          Join 15,000+ Nepali shoppers getting exclusive offers
        </p>

        <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-8 py-5 rounded-full border-2 border-slate-300 focus:border-red-600 text-lg shadow-inner"
          />
          <button className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-10 py-5 rounded-full text-lg font-bold">
            Subscribe Now
          </button>
        </form>
      </section>
    </div>
  );
};

export default Home;
