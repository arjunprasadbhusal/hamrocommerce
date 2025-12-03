import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { API_ENDPOINTS } from '../src/constant/api';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev: any) => ({
        ...prev,
        [name]: '',
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (data.success && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', data.user.email);
        
        // Check if user is admin
        if (data.user && data.user.role === 'Admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      } else {
        if (data.errors) {
          setErrors(data.errors);
        }
        setMessage(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-50">
        <div className="max-w-md w-full bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg shadow-red-200">
                  H
                </div>
                <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
                <p className="text-slate-500 mt-2 text-sm">
                    Enter your details to access your account
                </p>
            </div>

            {/* Message Display */}
            {message && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-800 border border-red-200">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className={`w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all ${
                            errors.email ? 'border-red-500' : 'border-gray-200'
                          }`}
                          placeholder="name@example.com" 
                        />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email[0] || errors.email}</p>
                    )}
                </div>

                <div className="space-y-1">
                     <div className="flex justify-between">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Password</label>
                        <a href="#" className="text-xs text-red-600 hover:underline">Forgot?</a>
                     </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="password" 
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          className={`w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all ${
                            errors.password ? 'border-red-500' : 'border-gray-200'
                          }`}
                          placeholder="••••••••" 
                        />
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">{errors.password[0] || errors.password}</p>
                    )}
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-200 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing In...
                      </span>
                    ) : (
                      <>Sign In <ArrowRight size={20} /></>
                    )}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-slate-500 text-sm">
                    Don't have an account?{' '}
                    <Link 
                        to="/register" 
                        className="text-red-600 font-bold hover:underline"
                    >
                        Sign Up
                    </Link>
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