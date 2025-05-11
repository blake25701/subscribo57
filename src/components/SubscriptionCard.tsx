'use client';

import { format } from 'date-fns';
import React from 'react';

interface Subscription {
  id: string;
  name: string;
  price: number;
  billingCycle: string;
  nextBillingDate: string;
  trialEndDate?: string;
}

interface SubscriptionCardProps {
  subscription: Subscription;
  onDelete: (id: string) => void;
}

export default function SubscriptionCard({ subscription, onDelete }: SubscriptionCardProps) {
  const isTrialEnding = subscription.trialEndDate && 
    new Date(subscription.trialEndDate) > new Date() &&
    new Date(subscription.trialEndDate).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 relative">
      {isTrialEnding && (
        <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-tr-lg text-sm">
          Trial ending soon!
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2">{subscription.name}</h3>
      <div className="text-gray-600 mb-4">
        <p className="mb-1">
          ${subscription.price.toFixed(2)} / {subscription.billingCycle}
        </p>
        <p className="text-sm">
          Next billing: {format(new Date(subscription.nextBillingDate), 'MMM d, yyyy')}
        </p>
        {subscription.trialEndDate && (
          <p className="text-sm text-yellow-600">
            Trial ends: {format(new Date(subscription.trialEndDate), 'MMM d, yyyy')}
          </p>
        )}
      </div>
      <button
        onClick={() => onDelete(subscription.id)}
        className="text-red-600 hover:text-red-800 text-sm font-medium"
      >
        Cancel Subscription
      </button>
    </div>
  );
} 