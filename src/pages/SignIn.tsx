import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function SignIn({ onClose }: { onClose?: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState(location.state?.email || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(
    location.state?.signUpSuccess 
      ? "Your account has been created. Please check your email and verify your address before logging in." 
      : null
  );

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      if (onClose) {
        onClose();
      } else {
        navigate('/');
      }
    } catch (err: any) {
      if (err.message === 'Invalid login credentials') {
        setError('Invalid email or password.');
      } else if (err.message === 'Email not confirmed') {
        setError('Please verify your email address before logging in.');
      } else {
        setError(err.message || 'An error occurred during sign in.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={onClose ? "relative" : "min-h-screen bg-ivory flex items-center justify-center p-4 relative"}>
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-ink-light hover:text-maroon transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto bg-white p-8 md:p-12 shadow-2xl border border-champagne/30"
      >
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl text-maroon uppercase tracking-widest mb-2">
            Welcome Back
          </h1>
          <p className="text-ink-light text-xs uppercase tracking-widest">
            Sign in to your Kala Sanskriti account
          </p>
        </div>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg text-center">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-ink-light mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-cream border border-champagne/50 px-4 py-3 text-ink focus:outline-none focus:border-maroon transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs uppercase tracking-widest text-ink-light">
                Password
              </label>
              <Link to="/forgot-password" className="text-xs text-maroon hover:text-ink transition-colors">
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-cream border border-champagne/50 px-4 py-3 text-ink focus:outline-none focus:border-maroon transition-colors"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-maroon text-ivory py-4 text-xs uppercase tracking-widest font-medium hover:bg-ink transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-ink-light text-xs uppercase tracking-widest">
            Don't have an account?{' '}
            <Link to="/signup" className="text-maroon hover:text-ink transition-colors font-medium">
              Create Account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
