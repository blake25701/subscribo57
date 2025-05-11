'use client';

import { signIn } from 'next-auth/react';
import React, { useState } from 'react';

export default function LoginButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn('google', {
        callbackUrl: window.location.origin,
        redirect: true
      });
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      disabled={isLoading}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-lg disabled:opacity-50"
    >
      {isLoading ? 'Signing in...' : 'Sign in with Google'}
    </button>
  );
} 