'use client';

import { useSession, signOut } from 'next-auth/react';
import React from 'react';
import SubscriptionDashboard from '@/components/SubscriptionDashboard';
import LoginButton from '@/components/LoginButton';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center mb-8">
            Welcome to Subscribo
          </h1>
          <p className="text-xl text-center mb-8">
            Track all your subscriptions in one place
          </p>
          <div className="flex justify-center">
            <LoginButton />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4">
      <div className="container mx-auto">
        {session && (
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              {session.user?.image && (
                <img
                  src={session.user.image}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              )}
              <span className="text-lg">Welcome, {session.user?.name}</span>
            </div>
            <h2 className="text-2xl font-bold">Subscribo: Your Subscription Manager</h2>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 text-sm text-white bg-gray-600 rounded hover:bg-gray-700"
            >
              Sign Out
            </button>
          </div>
        )}
        <SubscriptionDashboard showTitle={false} />
      </div>
    </main>
  );
}
