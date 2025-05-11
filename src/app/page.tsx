'use client';

import { signIn } from 'next-auth/react';
import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <button
        onClick={() => {
          console.log('Attempting sign in...');
          signIn('google', { callbackUrl: '/' });
        }}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Sign in with Google (Test)
      </button>
    </main>
  );
}
