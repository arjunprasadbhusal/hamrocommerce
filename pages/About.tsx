import React from 'react';
import { Target, Heart, Users } from 'lucide-react';
import PageHero from '../components/PageHero';

const About: React.FC = () => {
  return (
    <div>
      <PageHero 
        title="About Us" 
        subtitle="Connecting Nepali Craftsmanship with the World."
        backgroundImage="https://images.unsplash.com/photo-1540324155974-7523202daa3f?q=80&w=2000"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center mb-16 md:mb-24">
            <div className="relative order-2 lg:order-1">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <img 
                    src="https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1000" 
                    alt="Our Team" 
                    className="relative rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 z-10 border-4 border-white w-full"
                />
            </div>
            
            <div className="space-y-6 order-1 lg:order-2">
                <span className="text-red-600 font-bold uppercase tracking-wider text-sm">Our Story</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">We are building the future of commerce in Nepal.</h2>
                <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                    Hamro Commerce started with a simple idea: to make high-quality Nepali products accessible to everyone, everywhere. 
                    Founded in 2023, we have grown from a small garage operation in Kathmandu to a nationwide platform serving thousands of happy customers.
                </p>
                <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                    We believe in the power of technology to transform lives. By connecting local artisans and businesses directly with consumers, we are cutting out middlemen and ensuring fair prices for everyone.
                </p>
                
                <div className="grid grid-cols-2 gap-6 pt-6">
                    <div className="border-l-4 border-red-600 pl-4">
                        <span className="block text-2xl md:text-3xl font-bold text-slate-900">5k+</span>
                        <span className="text-slate-500 text-sm">Happy Customers</span>
                    </div>
                    <div className="border-l-4 border-blue-600 pl-4">
                        <span className="block text-2xl md:text-3xl font-bold text-slate-900">100+</span>
                        <span className="text-slate-500 text-sm">Local Brands</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Values Grid */}
        <div className="mb-16 md:mb-24">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Why Choose Hamro Commerce?</h2>
                <p className="text-slate-600">We stand by our core values to deliver the best shopping experience.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg shadow-slate-200/50 border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                    <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center text-red-600 mb-6">
                        <Target size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Mission Driven</h3>
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base">To revolutionize the eCommerce landscape in Nepal by ensuring authenticity, speed, and trust in every transaction.</p>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg shadow-slate-200/50 border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                        <Heart size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Customer First</h3>
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base">We obsess over our customers. From 24/7 support to easy returns, your satisfaction is our top priority.</p>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg shadow-slate-200/50 border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                    <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6">
                        <Users size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Community Focused</h3>
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base">We empower local sellers. Every purchase you make supports a Nepali family and strengthens our economy.</p>
                </div>
            </div>
        </div>

        {/* Team Section */}
        <div className="bg-slate-50 rounded-3xl p-8 md:p-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 md:mb-12 text-center">Meet the Leadership</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    {name: "Aarav Sharma", role: "CEO & Founder", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400"},
                    {name: "Priya Gurung", role: "Head of Operations", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400"},
                    {name: "Bijay Thapa", role: "Tech Lead", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400"},
                    {name: "Sunita Rai", role: "Customer Success", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400"}
                ].map((member, idx) => (
                    <div key={idx} className="text-center group">
                        <div className="mb-4 relative mx-auto w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full border-4 border-white shadow-lg">
                            <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                        <p className="text-red-600 text-sm font-medium">{member.role}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;