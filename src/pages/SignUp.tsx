import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function SignUp({ onClose }: { onClose?: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (signUpError) throw signUpError;

      if (data?.user?.identities?.length === 0) {
        setError('An account with this email already exists.');
        return;
      }

      setSuccessMessage('Registration successful! Please check your email to confirm your account.');
      
      // Optional: automatically redirect after a few seconds
      setTimeout(() => {
        if (onClose) onClose();
        navigate('/signin', { 
          state: { email, signUpSuccess: true } 
        });
      }, 5000);

    } catch (err: any) {
      setError(err.message || 'An error occurred during sign up.');
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
            Create Account
          </h1>
          <p className="text-ink-light text-xs uppercase tracking-widest">
            Join the Kala Sanskriti family
          </p>
        </div>

        {successMessage ? (
          <div className="text-center space-y-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800 text-sm">{successMessage}</p>
            </div>
            <button
              onClick={() => {
                if (onClose) onClose();
                navigate('/signin');
              }}
              className="w-full bg-maroon text-ivory py-4 text-xs uppercase tracking-widest font-medium hover:bg-ink transition-colors"
            >
              Go to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSignUp} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-ink-light mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-cream border border-champagne/50 px-4 py-3 text-ink focus:outline-none focus:border-maroon transition-colors"
                placeholder="Enter your full name"
              />
            </div>

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
              <label className="block text-xs uppercase tracking-widest text-ink-light mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-cream border border-champagne/50 px-4 py-3 text-ink focus:outline-none focus:border-maroon transition-colors"
                placeholder="Create a password (min 6 chars)"
                minLength={6}
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
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
        )}

        {!successMessage && (
          <div className="mt-8 text-center">
            <p className="text-ink-light text-xs uppercase tracking-widest">
              Already have an account?{' '}
              <Link to="/signin" className="text-maroon hover:text-ink transition-colors font-medium">
                Sign In
              </Link>
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
