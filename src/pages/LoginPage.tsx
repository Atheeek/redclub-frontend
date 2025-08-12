import React, { useState, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GoogleIcon from '@/components/icons/GoogleIcon';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [recentEmails, setRecentEmails] = useState<string[]>([]);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  // Load stored emails on mount
  useEffect(() => {
    const storedEmails = JSON.parse(localStorage.getItem('recentEmails') || '[]');
    setRecentEmails(storedEmails);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await login(email, password);

      // Store email if not already in list
      let updatedEmails = [...new Set([email, ...recentEmails])].slice(0, 5); // Keep latest 5
      localStorage.setItem('recentEmails', JSON.stringify(updatedEmails));
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
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif text-stone-800 mb-2">Refined Style <br/> for the Modern Man</h1>
          <p className="text-stone-500 max-w-xs mx-auto text-sm">
            Step into a world of modern refinement with timeless pieces crafted for every occasion.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-stone-900">Log In</h2>
          <p className="text-sm text-stone-500">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-semibold text-stone-800 hover:underline">
              Sign up here
            </Link>
          </p>

          <div className="relative flex items-center">
            <div className="flex-grow border-t border-stone-200"></div>
            <span className="flex-shrink mx-4 text-xs text-stone-400">or Sign in with Email</span>
            <div className="flex-grow border-t border-stone-200"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email input with suggestions */}
            <input
              type="email"
              list="recentEmails"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-stone-50 border border-stone-300 rounded-md placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
            <datalist id="recentEmails">
              {recentEmails.map((em, idx) => (
                <option key={idx} value={em} />
              ))}
            </datalist>

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
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-stone-500 hover:text-stone-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-stone-500 cursor-pointer">
                <input type="checkbox" className="h-4 w-4 rounded border-stone-300 text-[#947764] focus:ring-[#a1816d]" />
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-sm py-3 font-[300] text-white bg-[#947764] rounded-md hover:bg-[#876a58] transition-colors disabled:bg-[#bca698] disabled:cursor-not-allowed"
            >
              {isLoading ? 'LOGGING IN...' : 'CHECK OUT'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
