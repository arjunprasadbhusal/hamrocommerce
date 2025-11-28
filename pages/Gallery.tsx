import React, { useState, useMemo } from 'react';
import PageHero from '../components/PageHero';
import { ZoomIn, Quote } from 'lucide-react';

type CategoryKey = "All" | "Traditional" | "Handmade" | "Spiritual" | "Foods" | "Festive" | "Ethnic" | "Organic" | "Gifts";

interface CategoryInfo {
  label: string;
  tagline: string;
  description: string;
}

const CATEGORY_DATA: Record<CategoryKey, CategoryInfo> = {
  "All": { 
    label: "All Gallery", 
    tagline: "Hamro Nepal, Hamro Gaurav", 
    description: "A glimpse into the heart and soul of Nepal through our products and people." 
  },
  "Traditional": { 
    label: "Traditional & Cultural", 
    tagline: "Hamro pahichaan, hamrai parampara", 
    description: "Products that carry the soul of Nepal: Dhaka topi, Gunyu-cholo, and more." 
  },
  "Handmade": { 
    label: "Handmade & Artisanal", 
    tagline: "Ghar-ghar ko kunai haat ko kalakarita", 
    description: "Products made with love, hard work, and creativity by local artisans." 
  },
  "Spiritual": { 
    label: "Spiritual & Religious", 
    tagline: "Astha, shanti ra dharma ko sparsha", 
    description: "Rudraksha, Singing bowls, and items filled with faith and devotion." 
  },
  "Foods": { 
    label: "Traditional Foods", 
    tagline: "Gau-thalo ko swad, sanskriti ko mithas", 
    description: "The authentic taste of home: Gundruk, Himalayan tea, and local spices." 
  },
  "Festive": { 
    label: "Festive & Rituals", 
    tagline: "Parba-parva le bhitraune samjhina ra utsav", 
    description: "Celebrating Dashain, Tihar, and the vibrant colors of our festivals." 
  },
  "Ethnic": { 
    label: "Ethnic Wear", 
    tagline: "Riti-rivaaj, pahichaan, rangin Nepal", 
    description: "Celebrating Nepal's diversity with Haku patasi, Bakhu, and ethnic jewelry." 
  },
  "Organic": { 
    label: "Organic & Natural", 
    tagline: "Himal ko sampada, prakritiko upahar", 
    description: "Pure products from Nepal's land: Herbal soaps, essential oils, and honey." 
  },
  "Gifts": { 
    label: "Cultural Gifts", 
    tagline: "Hamro sanskriti ko upahaar", 
    description: "Gifts with meaning: Khukuri, wood carvings, and souvenirs." 
  }
};

const GALLERY_IMAGES = [
  // Traditional
  { id: 1, src: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=800", title: "Classic Dhaka Topi", category: "Traditional", span: "md:col-span-1 md:row-span-1" },
  { id: 2, src: "https://images.unsplash.com/photo-1631520684307-28d5d4d38c64?q=80&w=800", title: "Nepali Tradition", category: "Traditional", span: "md:col-span-1 md:row-span-2" },
  
  // Handmade
  { id: 3, src: "https://images.unsplash.com/photo-1577083288073-40892c0860a4?q=80&w=800", title: "Wood Carving", category: "Handmade", span: "md:col-span-1 md:row-span-1" },
  { id: 4, src: "https://images.unsplash.com/photo-1544640808-32ca72ac7f37?q=80&w=800", title: "Yak Wool Weaving", category: "Handmade", span: "md:col-span-2 md:row-span-2" },
  
  // Spiritual
  { id: 5, src: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=800", title: "Temple Serenity", category: "Spiritual", span: "md:col-span-1 md:row-span-1" },
  { id: 6, src: "https://images.unsplash.com/photo-1567606404933-255d65451e06?q=80&w=800", title: "Prayer Flags", category: "Spiritual", span: "md:col-span-1 md:row-span-1" },

  // Foods
  { id: 7, src: "https://images.unsplash.com/photo-1629196914168-3a13917849c7?q=80&w=800", title: "Market Spices", category: "Foods", span: "md:col-span-1 md:row-span-1" },
  { id: 8, src: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=800", title: "Ilam Tea Garden", category: "Foods", span: "md:col-span-2 md:row-span-1" },

  // Festive
  { id: 9, src: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?q=80&w=800", title: "Dashain Tika", category: "Festive", span: "md:col-span-1 md:row-span-1" },
  { id: 10, src: "https://images.unsplash.com/photo-1607082350899-7e102dc88610?q=80&w=800", title: "Festival Lights", category: "Festive", span: "md:col-span-1 md:row-span-2" },

  // Ethnic
  { id: 11, src: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=800", title: "Traditional Attire", category: "Ethnic", span: "md:col-span-1 md:row-span-1" },
  
  // Organic
  { id: 12, src: "https://images.unsplash.com/photo-1540479859555-17af45c78602?q=80&w=800", title: "Himalayan Herbs", category: "Organic", span: "md:col-span-1 md:row-span-1" },
  { id: 13, src: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=800", title: "Organic Tea", category: "Organic", span: "md:col-span-1 md:row-span-1" },

  // Gifts
  { id: 14, src: "https://images.unsplash.com/photo-1589820296156-2454bb8a4d50?q=80&w=800", title: "Khukuri Gift", category: "Gifts", span: "md:col-span-1 md:row-span-1" },
  { id: 15, src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800", title: "Souvenir Shop", category: "Gifts", span: "md:col-span-2 md:row-span-1" },
];

const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("All");

  const filteredImages = useMemo(() => {
    if (activeCategory === "All") return GALLERY_IMAGES;
    return GALLERY_IMAGES.filter(img => img.category === activeCategory);
  }, [activeCategory]);

  const activeInfo = CATEGORY_DATA[activeCategory];

  return (
    <div>
      <PageHero 
        title="Our Gallery" 
        subtitle="Visual stories from the land of Himalayas."
        backgroundImage="https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=2000"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Category Navigation - Horizontal Scroll on Mobile */}
        <div className="mb-12">
           <div className="flex overflow-x-auto pb-4 md:flex-wrap md:justify-center gap-2 md:gap-3 no-scrollbar px-1">
              {(Object.keys(CATEGORY_DATA) as CategoryKey[]).map((key) => (
                  <button
                      key={key}
                      onClick={() => setActiveCategory(key)}
                      className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                          activeCategory === key
                          ? 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-200 transform scale-105'
                          : 'bg-white text-slate-600 border-gray-200 hover:border-red-300 hover:text-red-600'
                      }`}
                  >
                      {CATEGORY_DATA[key].label}
                  </button>
              ))}
           </div>
        </div>

        {/* Active Category Info Banner */}
        <div className="mb-12 text-center max-w-3xl mx-auto animate-fade-in-up px-4">
            <div className="inline-block p-3 rounded-full bg-red-50 text-red-600 mb-4">
                <Quote size={24} className="fill-current opacity-50" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 italic font-serif">
                "{activeInfo.tagline}"
            </h2>
            <p className="text-slate-500 font-medium">{activeInfo.description}</p>
        </div>

        {/* Gallery Grid */}
        <div 
          className={`grid gap-4 ${
            activeCategory === "All" 
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[240px]" 
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[280px]"
          }`}
        >
            {filteredImages.map((img, idx) => (
                <div 
                    key={img.id} 
                    className={`relative group overflow-hidden rounded-2xl bg-gray-100 animate-fade-in-up ${
                        activeCategory === "All" ? img.span : ""
                    }`}
                    style={{ animationDelay: `${idx * 50}ms` }}
                >
                    <img 
                        src={img.src} 
                        alt={img.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay - Always visible text on touch/mobile if needed, or keeping hover effect for desktop */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <span className="text-red-400 text-[10px] font-bold uppercase tracking-wider mb-1 block">
                                {CATEGORY_DATA[img.category as CategoryKey].label}
                            </span>
                            <div className="flex justify-between items-end">
                                <h3 className="text-white font-bold text-lg leading-tight">{img.title}</h3>
                                <button 
                                    className="p-2 bg-white rounded-full text-slate-900 hover:bg-red-600 hover:text-white transition-colors shadow-lg"
                                    title="View Larger"
                                >
                                    <ZoomIn size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {filteredImages.length === 0 && (
            <div className="text-center py-20 text-slate-400 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <p>More images coming soon to this category.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;