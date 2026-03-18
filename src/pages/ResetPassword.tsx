import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have a session (user clicked the link in email)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        setError('Invalid or expired password reset link. Please request a new one.');
      }
    });
  }, []);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;

      setSuccessMessage('Password updated successfully!');
      setTimeout(() => {
        navigate('/signin');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'An error occurred while updating your password.');
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
            Create New Password
          </h1>
          <p className="text-ink-light text-xs uppercase tracking-widest">
            Enter your new password below
          </p>
        </div>

        {successMessage ? (
          <div className="text-center space-y-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800 text-sm">{successMessage}</p>
            </div>
            <p className="text-ink-light text-xs uppercase tracking-widest">
              Redirecting to sign in...
            </p>
          </div>
        ) : (
          <form onSubmit={handleUpdatePassword} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-ink-light mb-2">
                New Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-cream border border-champagne/50 px-4 py-3 text-ink focus:outline-none focus:border-maroon transition-colors"
                placeholder="Enter new password (min 6 chars)"
                minLength={6}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-ink-light mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-cream border border-champagne/50 px-4 py-3 text-ink focus:outline-none focus:border-maroon transition-colors"
                placeholder="Confirm new password"
                minLength={6}
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !!successMessage}
              className="w-full bg-maroon text-ivory py-4 text-xs uppercase tracking-widest font-medium hover:bg-ink transition-colors disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
