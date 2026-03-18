import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export function Account() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // If not logged in, redirect
  if (!user) {
    navigate('/signin');
    return null;
  }

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
      setPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err.message || 'An error occurred while updating your password.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-ivory py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-12 shadow-2xl border border-champagne/30"
        >
          <div className="mb-10 flex justify-between items-end border-b border-champagne/30 pb-6">
            <div>
              <h1 className="font-serif text-3xl text-maroon uppercase tracking-widest mb-2">
                My Account
              </h1>
              <p className="text-ink-light text-sm uppercase tracking-widest">
                Welcome, {user.user_metadata?.full_name || user.email}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="text-xs uppercase tracking-widest text-maroon hover:text-ink transition-colors font-medium"
            >
              Sign Out
            </button>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="font-serif text-xl text-ink uppercase tracking-wider mb-6">
                Profile Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-ink-light mb-2">
                    Full Name
                  </label>
                  <p className="text-ink font-medium bg-cream px-4 py-3 border border-champagne/50">
                    {user.user_metadata?.full_name || 'Not provided'}
                  </p>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-ink-light mb-2">
                    Email Address
                  </label>
                  <p className="text-ink font-medium bg-cream px-4 py-3 border border-champagne/50">
                    {user.email}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-xl text-ink uppercase tracking-wider mb-6">
                Change Password
              </h2>
              
              {successMessage && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg">
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleUpdatePassword} className="space-y-6 max-w-md">
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
                  <p className="text-red-500 text-xs">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-maroon text-ivory px-8 py-3 text-xs uppercase tracking-widest font-medium hover:bg-ink transition-colors disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
