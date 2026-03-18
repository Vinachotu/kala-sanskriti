import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setSuccessMessage('Password reset instructions have been sent to your email.');
    } catch (err: any) {
      setError(err.message || 'An error occurred while sending reset instructions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto bg-white p-8 md:p-12 shadow-2xl border border-champagne/30"
      >
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl text-maroon uppercase tracking-widest mb-2">
            Reset Password
          </h1>
          <p className="text-ink-light text-xs uppercase tracking-widest">
            Enter your email to receive reset instructions
          </p>
        </div>

        {successMessage ? (
          <div className="text-center space-y-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800 text-sm">{successMessage}</p>
            </div>
            <Link
              to="/signin"
              className="block w-full bg-maroon text-ivory py-4 text-xs uppercase tracking-widest font-medium hover:bg-ink transition-colors"
            >
              Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-6">
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

            {error && (
              <p className="text-red-500 text-xs text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-maroon text-ivory py-4 text-xs uppercase tracking-widest font-medium hover:bg-ink transition-colors disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}

        {!successMessage && (
          <div className="mt-8 text-center">
            <p className="text-ink-light text-xs uppercase tracking-widest">
              Remember your password?{' '}
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
