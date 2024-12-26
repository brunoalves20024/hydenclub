import React, { useState } from 'react';
import { LogIn } from 'lucide-react';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add login logic here
    if (password === '12') {
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-[#141414] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-[#E50914] tracking-wider font-['Poppins'] animate-pulse">
            HYDEN CLUB
          </h1>
          <p className="mt-4 text-white/60">Enter your credentials to access exclusive content</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-[#1F1F1F] p-8 rounded-xl shadow-xl">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="text-white/80 text-sm font-medium">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full bg-[#2F2F2F] border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#E50914] transition-all"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="text-white/80 text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full bg-[#2F2F2F] border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#E50914] transition-all"
                placeholder="Enter your password"
                required
              />
              <p className="mt-1 text-sm text-white/40">Password Padrão: 12</p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#E50914] text-white py-3 rounded-md hover:bg-[#F40612] transition-colors"
          >
            <LogIn className="w-5 h-5" />
            Sign In
          </button>
        </form>

        <div className="text-center">
          <p className="text-white/40 text-sm">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}