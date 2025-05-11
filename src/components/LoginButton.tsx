'use client';

import { signIn } from 'next-auth/react';
import React, { useState } from 'react';

export default function LoginButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Starting Google sign in...');
      
      const result = await signIn('google', {
        callbackUrl: window.location.origin,
        redirect: false
      });
      
      console.log('Sign in result:', result);
      
      if (result?.error) {
        setError(result.error);
        console.error('Sign in error:', result.error);
      } else if (result?.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleSignIn}
        disabled={isLoading}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-lg disabled:opacity-50"
      >
        {isLoading ? 'Signing in...' : 'Sign in with Google'}
      </button>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
} 