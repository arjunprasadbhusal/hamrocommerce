import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, User } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  
  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Mock login
      navigate('/');
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-50">
        <div className="max-w-md w-full bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg shadow-red-200">
                  H
                </div>
                <h1 className="text-2xl font-bold text-slate-900">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
                <p className="text-slate-500 mt-2 text-sm">
                    {isLogin ? 'Enter your details to access your account' : 'Join Hamro Commerce for exclusive deals'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input type="text" className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all" placeholder="John Doe" />
                        </div>
                    </div>
                )}
                
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="email" className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all" placeholder="name@example.com" />
                    </div>
                </div>

                <div className="space-y-1">
                     <div className="flex justify-between">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Password</label>
                        {isLogin && <a href="#" className="text-xs text-red-600 hover:underline">Forgot?</a>}
                     </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="password" className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all" placeholder="••••••••" />
                    </div>
                </div>

                <button className="w-full bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-200 mt-4">
                    {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={20} />
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-slate-500 text-sm">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button 
                        onClick={() => setIsLogin(!isLogin)} 
                        className="text-red-600 font-bold hover:underline"
                    >
                        {isLogin ? 'Sign Up' : 'Log In'}
                    </button>
                </p>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                 <p className="text-xs text-slate-400 mb-4">Or continue with</p>
                 <div className="flex gap-4 justify-center">
                     <button className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                         <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 opacity-70" />
                     </button>
                      <button className="w-12 h-12 rounded-full bg-[#1877F2] border border-transparent flex items-center justify-center hover:bg-blue-700 transition-colors text-white">
                         <span className="font-bold text-lg">f</span>
                     </button>
                 </div>
            </div>
        </div>
    </div>
  );
}

export default Login;