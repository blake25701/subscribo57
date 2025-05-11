'use client';

import { useSession } from 'next-auth/react';
import React from 'react';

interface UpgradeButtonProps {
  onSuccess: () => void;
}

export default function UpgradeButton({ onSuccess }: UpgradeButtonProps) {
  const { data: session } = useSession();

  const handleUpgrade = () => {
    window.location.href = 'https://buy.stripe.com/test_eVq00jcbRfJ32wn7unafS00';
  };

  return (
    <button
      onClick={handleUpgrade}
      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700"
    >
      Upgrade to Pro
    </button>
  );
} 