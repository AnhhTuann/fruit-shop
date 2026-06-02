import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useAuthStore } from '../store/authStore';
import { X } from 'lucide-react';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export default function LoginModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION);
  
  const { isLoginModalOpen, toggleLoginModal, login } = useAuthStore();

  if (!isLoginModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await loginMutation({ variables: { email, password } });
      if (data?.login?.token) {
        login(data.login.token, data.login.user);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-emerald-900/40 backdrop-blur-sm z-[60] transition-opacity flex items-center justify-center p-4"
        onClick={toggleLoginModal}
      >
        <div 
          className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-lime-200 relative overflow-hidden transform transition-all"
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={toggleLoginModal}
            className="absolute top-4 right-4 p-2 bg-lime-50 hover:bg-lime-100 rounded-full text-emerald-700 transition-colors z-10"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="p-8">
            <h2 className="text-3xl font-black text-emerald-900 mb-2 text-center">Welcome Back</h2>
            <p className="text-emerald-600 text-center mb-8">Sign in to access your fresh fruits.</p>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm border border-red-100 font-bold text-center">
                {error.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-emerald-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-lime-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-emerald-900"
                  placeholder="you@example.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-emerald-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-lime-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-emerald-900"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 mt-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white rounded-2xl font-black text-lg transition-all shadow-lg shadow-emerald-500/30 flex justify-center items-center active:scale-[0.98]"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
