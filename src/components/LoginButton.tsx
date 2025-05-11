'use client';

import { signIn } from 'next-auth/react';
import React from 'react';

export default function LoginButton() {
  const handleSignIn = async () => {
    try {
      const result = await signIn('google', {
        callbackUrl: 'https://subscribo57.vercel.app',
        redirect: true
      });
      console.log('Sign in result:', result);
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-lg"
    >
      Sign in with Google
    </button>
  );
} 