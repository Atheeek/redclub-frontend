import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import GoogleIcon from '@/components/icons/GoogleIcon';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // <-- Added state
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await register(name, email, password);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 md:p-12 shadow-sm relative">
        <Link to="/" className="absolute top-4 right-4 text-stone-400 hover:text-stone-700" aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif text-stone-800 mb-2">Style That <br/> Speaks for You</h1>
          <p className="text-stone-500 max-w-xs mx-auto text-sm">From classic staples to modern essentials, elevate your wardrobe with pieces that redefine timeless fashion.</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-[semibold] text-stone-900">Create Account</h2>
          <p className="text-sm text-stone-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-stone-800 hover:underline">
              Log in here
            </Link>
          </p>

          <div className="relative flex items-center">
              <div className="flex-grow border-t border-stone-200"></div>
              <span className="flex-shrink mx-4 text-xs text-stone-400">or register with Email</span>
              <div className="flex-grow border-t border-stone-200"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="text" 
              placeholder="Name" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-stone-50 border border-stone-300 rounded-md placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
            <input 
              type="email" 
              placeholder="Email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-stone-50 border border-stone-300 rounded-md placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
            
            {/* Password with show/hide toggle */}
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-stone-50 border border-stone-300 rounded-md placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-sm text-stone-500 hover:text-stone-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
            
            <button type="submit" disabled={isLoading} className="w-full py-3 font-[300] text-sm text-white bg-[#947764] rounded-md hover:bg-[#876a58] transition-colors disabled:bg-[#bca698] disabled:cursor-not-allowed">
              {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
