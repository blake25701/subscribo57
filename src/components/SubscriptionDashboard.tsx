'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import React from 'react';
import SubscriptionCard from './SubscriptionCard';
import AddSubscriptionModal from './AddSubscriptionModal';
import UpgradeButton from './UpgradeButton';

interface Subscription {
  id: string;
  name: string;
  price: number;
  billingCycle: string;
  nextBillingDate: string;
  trialEndDate?: string;
}

interface SubscriptionDashboardProps {
  showTitle?: boolean;
}

export default function SubscriptionDashboard({ showTitle = true }: SubscriptionDashboardProps) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch pro status
        const proResponse = await fetch('/api/user/pro-status');
        const proData = await proResponse.json();
        setIsPro(proData.isPro);

        // Fetch subscriptions
        const subsResponse = await fetch('/api/subscriptions');
        const subsData = await subsResponse.json();
        setSubscriptions(subsData.subscriptions);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddSubscription = async (newSubscription: Omit<Subscription, 'id'>) => {
    try {
      console.log('Adding subscription:', newSubscription);
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSubscription),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        setError(errorData.error || 'Failed to add subscription');
        return;
      }

      const addedSubscription = await response.json();
      console.log('Successfully added subscription:', addedSubscription);
      
      // Update the subscriptions state with the new subscription
      setSubscriptions(prevSubscriptions => [...prevSubscriptions, addedSubscription]);
      setIsModalOpen(false);
      setError(null);
    } catch (error) {
      console.error('Error adding subscription:', error);
      setError(error instanceof Error ? error.message : 'Failed to add subscription');
    }
  };

  const handleDeleteSubscription = async (id: string) => {
    try {
      const response = await fetch(`/api/subscriptions?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete subscription');
      }

      setSubscriptions(subscriptions.filter((s) => s.id !== id));
      setError(null);
    } catch (error) {
      console.error('Error deleting subscription:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete subscription');
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-48 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const canAddMore = isPro || subscriptions.length < 3;

  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-8">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        {showTitle && <h1 className="text-3xl font-bold">Your Subscriptions</h1>}
        <div className="flex gap-4">
          {!isPro && <UpgradeButton onSuccess={() => setIsPro(true)} />}
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={!canAddMore}
            className={`px-4 py-2 rounded-lg ${
              canAddMore
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Add Subscription
          </button>
        </div>
      </div>

      {!canAddMore && !isPro && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <p className="text-yellow-800">
            You've reached the limit of 3 subscriptions. Upgrade to Pro for unlimited subscriptions!
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subscriptions.map((subscription) => (
          <SubscriptionCard
            key={subscription.id}
            subscription={subscription}
            onDelete={handleDeleteSubscription}
          />
        ))}
      </div>

      {isModalOpen && (
        <AddSubscriptionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddSubscription}
        />
      )}
    </div>
  );
} 