import React from 'react';
import PageHero from '../components/PageHero';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BLOG_POSTS = [
  {
    id: 1,
    title: "Top 5 Traditional Nepali Outfits for Dashain",
    excerpt: "Dashain is around the corner! Discover the best Dhaka Topis and Daura Suruwals to wear this festive season.",
    date: "Oct 12, 2023",
    author: "Sita Sharma",
    image: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=800&auto=format&fit=crop",
    category: "Fashion"
  },
  {
    id: 2,
    title: "Why Handmade Crafts are the Perfect Gift",
    excerpt: "Support local artisans by choosing handcrafted wooden mandalas and decor items for your loved ones.",
    date: "Sep 28, 2023",
    author: "Ram Bahadur",
    image: "https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?q=80&w=800&auto=format&fit=crop",
    category: "Lifestyle"
  },
  {
    id: 3,
    title: "The Ultimate Guide to Brewing Ilam Tea",
    excerpt: "Learn the secret techniques to brew the perfect cup of organic orthodox tea from the hills of Eastern Nepal.",
    date: "Sep 15, 2023",
    author: "Tea Master",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800&auto=format&fit=crop",
    category: "Food & Drink"
  },
  {
    id: 4,
    title: "Tech Trends in Kathmandu 2024",
    excerpt: "From smart wearables to noise-cancelling buds, see what gadgets are trending in the capital city right now.",
    date: "Aug 30, 2023",
    author: "Tech Guru",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop",
    category: "Technology"
  },
  {
    id: 5,
    title: "Sustainable Fashion: The Hemp Revolution",
    excerpt: "How Nepali hemp backpacks are making a global statement in sustainable fashion and durability.",
    date: "Aug 10, 2023",
    author: "Green Earth",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
    category: "Sustainability"
  },
  {
    id: 6,
    title: "Hiking Essentials for Your Next Trek",
    excerpt: "Planning a trek to Annapurna or Everest? Here is the checklist of gear you can buy right here in Nepal.",
    date: "Jul 22, 2023",
    author: "Travel Nepal",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800&auto=format&fit=crop",
    category: "Travel"
  }
];

const Blog: React.FC = () => {
  return (
    <div>
      <PageHero 
        title="Our Blog" 
        subtitle="Stories, tips, and trends from the heart of Nepal."
        backgroundImage="https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?q=80&w=2000&auto=format&fit=crop"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-red-600 uppercase tracking-wider shadow-sm">
                  {post.category}
                </span>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                  <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                </div>
                
                <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                
                <button className="flex items-center gap-2 text-red-600 font-bold text-sm hover:gap-3 transition-all mt-auto">
                  Read Article <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
            <button className="px-8 py-3 border-2 border-slate-900 rounded-full font-bold hover:bg-slate-900 hover:text-white transition-colors">
                Load More Stories
            </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;