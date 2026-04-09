'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Mail, CheckCircle, Loader2 } from 'lucide-react';

type State = 'idle' | 'loading' | 'success' | 'error';

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-50 flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-teal-700" /></div>}>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<State>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const searchParams = useSearchParams();
  const urlError = searchParams.get('error');

  const supabase = createClient();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage('Please enter your email address');
      setState('error');
      return;
    }

    setState('loading');
    setErrorMessage('');

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setErrorMessage(error.message);
        setState('error');
      } else {
        setState('success');
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred. Please try again.');
      setState('error');
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Error Banner */}
        {urlError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm font-medium">{decodeURIComponent(urlError)}</p>
          </div>
        )}

        {state === 'success' ? (
          // Success State
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-teal-700" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-stone-900 mb-3">Check your email</h1>
            <p className="text-stone-600 mb-6">
              We've sent a magic link to <span className="font-semibold text-stone-900">{email}</span>. Click the link to sign in to FlatRights.
            </p>
            <p className="text-sm text-stone-500">
              Didn't receive it? Check your spam folder or{' '}
              <button
                onClick={() => {
                  setState('idle');
                  setEmail('');
                }}
                className="text-teal-700 font-semibold hover:text-teal-800 underline"
              >
                try another email
              </button>
              .
            </p>
          </div>
        ) : (
          // Form State
          <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-8">
            {/* Logo */}
            <div className="mb-8 flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-teal-700 rounded flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-stone-900">FlatRights</h2>
            </div>

            <h1 className="text-2xl font-bold text-stone-900 mb-2 text-center">Sign in to FlatRights</h1>
            <p className="text-stone-600 text-center mb-8">
              We'll send you a magic link — no password needed.
            </p>

            {/* Error Message */}
            {state === 'error' && errorMessage && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm font-medium">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSignIn} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-stone-700 font-medium">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (state === 'error') setState('idle');
                  }}
                  disabled={state === 'loading'}
                  className="bg-white border-stone-300 text-stone-900 placeholder:text-stone-500"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={state === 'loading' || !email}
                className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2 h-10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {state === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    Send magic link
                  </>
                )}
              </Button>
            </form>

            {/* Register Link */}
            <p className="text-center text-stone-600 text-sm mt-6">
              Don't have an account?{' '}
              <Link
                href="/register"
                className="text-teal-700 font-semibold hover:text-teal-800 underline"
              >
                Register
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
