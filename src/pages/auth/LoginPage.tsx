import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, AlertCircle, UserPlus } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, register } = useAuthStore();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isRegistering) {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        await register({
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
      } else {
        await login({
          username: formData.username,
          password: formData.password
        });
      }
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-[#141414] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-[#E50914] tracking-wider font-['Poppins'] animate-pulse">
            HYDEN CLUB
          </h1>
          <p className="mt-4 text-white/60">
            {isRegistering ? 'Create your account' : 'Sign in to access exclusive content'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-[#1F1F1F] p-8 rounded-xl shadow-xl">
          {error && (
            <div className="flex items-center gap-2 text-[#E50914] bg-[#E50914]/10 p-3 rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="text-white/80 text-sm font-medium">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                className="mt-1 w-full bg-[#2F2F2F] border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#E50914] transition-all"
                required
              />
            </div>

            {isRegistering && (
              <div>
                <label htmlFor="email" className="text-white/80 text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 w-full bg-[#2F2F2F] border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#E50914] transition-all"
                  required={isRegistering}
                />
              </div>
            )}

            <div>
              <label htmlFor="password" className="text-white/80 text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 w-full bg-[#2F2F2F] border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#E50914] transition-all"
                required
              />
            </div>

            {isRegistering && (
              <div>
                <label htmlFor="confirmPassword" className="text-white/80 text-sm font-medium">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="mt-1 w-full bg-[#2F2F2F] border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#E50914] transition-all"
                  required={isRegistering}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-[#E50914] text-white py-3 rounded-md hover:bg-[#F40612] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                {isRegistering ? <UserPlus className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
                {isRegistering ? 'Create Account' : 'Sign In'}
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="w-full text-white/60 hover:text-white text-sm"
          >
            {isRegistering ? 'Already have an account? Sign in' : 'Need an account? Create one'}
          </button>

          {!isRegistering && (
            <div className="text-center space-y-2">
              <p className="text-white/40 text-sm">
                Demo Credentials:
              </p>
              <div className="text-white/60 text-xs space-y-1">
                <p>Admin: admin / admin123</p>
              </div>
            </div>
          )}
        </form>

        <div className="text-center">
          <p className="text-white/40 text-sm">
            By {isRegistering ? 'registering' : 'signing in'}, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}