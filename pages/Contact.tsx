import React from 'react';
import { Mail, MapPin, Phone, Send, Clock, ShieldCheck, Globe } from 'lucide-react';
import PageHero from '../components/PageHero';

const Contact: React.FC = () => {
  return (
    <div>
      <PageHero 
        title="Get in Touch" 
        subtitle="We'd love to hear from you. Here is how you can reach us."
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
            {/* Contact Info Card */}
            <div className="bg-slate-900 text-white p-8 md:p-12 rounded-3xl relative overflow-hidden flex flex-col justify-between shadow-2xl min-h-[400px]">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-red-600 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-blue-600 rounded-full opacity-20 blur-3xl"></div>
                
                <div className="relative z-10 space-y-8 md:space-y-12">
                    <div>
                        <h3 className="text-2xl font-bold mb-8 border-b border-white/10 pb-4">Contact Information</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 text-red-400">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <p className="text-slate-400 text-sm uppercase font-semibold mb-1">Phone Number</p>
                                    <p className="text-base md:text-lg font-medium">+977 9800000000</p>
                                    <p className="text-base md:text-lg font-medium">+977 01-4455667</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 text-blue-400">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-slate-400 text-sm uppercase font-semibold mb-1">Email Support</p>
                                    <p className="text-base md:text-lg font-medium">support@hamrocommerce.com</p>
                                    <p className="text-base md:text-lg font-medium">info@hamrocommerce.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 text-green-400">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-slate-400 text-sm uppercase font-semibold mb-1">Head Office</p>
                                    <p className="text-base md:text-lg font-medium">New Baneshwor, Kathmandu</p>
                                    <p className="text-slate-300">Opposite to Parliament Building</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex gap-4 pt-8 border-t border-white/10">
                        <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><Globe size={20} /></a>
                    </div>
                </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-6 md:p-12 rounded-3xl shadow-xl border border-gray-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h3>
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">First Name</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all" placeholder="Ram" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Last Name</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all" placeholder="Sharma" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Email Address</label>
                        <input type="email" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all" placeholder="ram@example.com" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Subject</label>
                        <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all text-slate-600">
                            <option>General Inquiry</option>
                            <option>Order Status</option>
                            <option>Returns & Refund</option>
                            <option>Business Partnership</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Message</label>
                        <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all resize-none" placeholder="How can we help you?"></textarea>
                    </div>

                    <button className="w-full bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-200">
                        Send Message <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
        
        {/* FAQ Teaser */}
        <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <Clock className="mx-auto text-red-500 mb-4" size={32} />
                    <h4 className="font-bold mb-2">Delivery Time?</h4>
                    <p className="text-sm text-slate-500">Usually 1-3 business days across Nepal.</p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <ShieldCheck className="mx-auto text-blue-500 mb-4" size={32} />
                     <h4 className="font-bold mb-2">Warranty?</h4>
                    <p className="text-sm text-slate-500">1 year warranty on all electronic items.</p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <MapPin className="mx-auto text-green-500 mb-4" size={32} />
                     <h4 className="font-bold mb-2">Location?</h4>
                    <p className="text-sm text-slate-500">We deliver to all 77 districts.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Contact;