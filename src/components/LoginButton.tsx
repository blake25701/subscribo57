'use client';

import { signIn } from 'next-auth/react';
import React from 'react';

export default function LoginButton() {
  return (
    <button
      onClick={() => signIn('google')}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-lg"
    >
      Sign in with Google
    </button>
  );
} 