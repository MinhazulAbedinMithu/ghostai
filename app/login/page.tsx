'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const result = await signIn('credentials', { email, password, redirect: false });

    setIsLoading(false);

    if (result?.error) {
      setError('Invalid login credentials.');
    } else if (result?.ok) {
      router.push('/dashboard');
    } else {
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen max-w-md mx-auto px-4">
      <div className="bg-gray-950/90 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl md:text-4xl text-white mb-4 text-center">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 bg-gray-700/50 text-white rounded"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 bg-gray-700/50 text-white rounded"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-2 bg-cyan-500 text-white font-medium rounded-md shadow hover:bg-cyan-600"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
