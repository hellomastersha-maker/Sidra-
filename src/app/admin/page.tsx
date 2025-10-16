"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import AdminDashboard from './AdminDashboard';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [session, setSession] = useState<any>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === 'shanukpshan1') {
      // This is a simplified, insecure "password check".
      // A real app should use Supabase Auth with a user account.
      // For this project, we are simulating a password-only system.
      // We will sign in with a dummy email to get an authenticated session.
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'admin@kalaveeryam.com', // A dummy email for the admin session
        password: 'admin-secure-password', // A secure password you set for this dummy user in Supabase Auth
      });

      if (error) {
        setError('Failed to authenticate with Supabase. Please check console.');
        console.error('Supabase login error:', error);
        return;
      }

      setSession(data.session);

    } else {
      setError('Incorrect password.');
    }
  };

  if (session) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-miac-white text-miac-green">
      <div className="bg-gray-100 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-miac-gold text-miac-green font-bold py-3 rounded-lg transition-transform transform hover:scale-105"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}