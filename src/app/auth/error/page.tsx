'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  const getErrorMessage = (error: string) => {
    // Check for the specific Google verification error
    if (errorDescription?.includes('not completed the Google verification process')) {
      return (
        <div>
          <p className="mb-4">This application is in development/testing mode and requires you to be added as a test user.</p>
          <p className="mb-4">Please contact the application administrator to be added as a test user with your Google email address.</p>
          <p className="text-sm text-gray-600">Note: This restriction only applies during development. Once the app is verified by Google, it will be available to all users.</p>
        </div>
      );
    }

    switch (error) {
      case 'Configuration':
        return 'There is a problem with the server configuration.';
      case 'AccessDenied':
        return 'You did not grant access to your Google account.';
      case 'Verification':
        return 'The sign in link is no longer valid.';
      case 'OAuthSignin':
        return 'Could not sign in with Google.';
      case 'OAuthCallback':
        return 'Could not get response from Google.';
      case 'OAuthCreateAccount':
        return 'Could not create user account.';
      case 'EmailCreateAccount':
        return 'Could not create user account.';
      case 'Callback':
        return 'Something went wrong during sign in.';
      default:
        return errorDescription || 'An unexpected error occurred.';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-4">Authentication Error</h1>
        
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-red-700">{error ? getErrorMessage(error) : 'An error occurred during authentication.'}</div>
        </div>

        <div className="text-center space-y-4">
          <Link 
            href="/auth/signin"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-lg"
          >
            Try Again
          </Link>

          <p className="text-sm text-gray-600">
            If you continue to experience issues, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
} 