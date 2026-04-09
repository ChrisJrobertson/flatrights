'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, CheckCircle, Loader2 } from 'lucide-react';

type State = 'idle' | 'loading' | 'success' | 'error';

const registerSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  flatNumber: z.string(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [state, setState] = useState<State>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');

  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const watchEmail = watch('email');

  const onSubmit = async (data: RegisterFormData) => {
    setState('loading');
    setErrorMessage('');

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: data.email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            full_name: data.fullName,
            flat_number: data.flatNumber || '',
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
        setState('error');
      } else {
        setSubmittedEmail(data.email);
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
              We've sent a magic link to <span className="font-semibold text-stone-900">{submittedEmail}</span>. Click the link to complete your registration and sign in to FlatRights.
            </p>
            <p className="text-sm text-stone-500">
              Didn't receive it? Check your spam folder or{' '}
              <button
                onClick={() => {
                  setState('idle');
                  setSubmittedEmail('');
                }}
                className="text-teal-700 font-semibold hover:text-teal-800 underline"
              >
                try again
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

            <h1 className="text-2xl font-bold text-stone-900 mb-2 text-center">Create your FlatRights account</h1>
            <p className="text-stone-600 text-center mb-8">
              Start exercising your leasehold rights today.
            </p>

            {/* Error Message */}
            {state === 'error' && errorMessage && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm font-medium">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Full Name Input */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-stone-700 font-medium">
                  Full name
                </Label>
                <Input
                  id="fullName"
                  placeholder="John Smith"
                  disabled={state === 'loading'}
                  {...register('fullName')}
                  className="bg-white border-stone-300 text-stone-900 placeholder:text-stone-500"
                />
                {errors.fullName && (
                  <p className="text-red-600 text-sm font-medium">{errors.fullName.message}</p>
                )}
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-stone-700 font-medium">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  disabled={state === 'loading'}
                  {...register('email')}
                  className="bg-white border-stone-300 text-stone-900 placeholder:text-stone-500"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm font-medium">{errors.email.message}</p>
                )}
              </div>

              {/* Flat Number Input */}
              <div className="space-y-2">
                <Label htmlFor="flatNumber" className="text-stone-700 font-medium">
                  Flat number (optional)
                </Label>
                <Input
                  id="flatNumber"
                  placeholder="e.g., 42A or Flat 7"
                  disabled={state === 'loading'}
                  {...register('flatNumber')}
                  className="bg-white border-stone-300 text-stone-900 placeholder:text-stone-500"
                />
                <p className="text-stone-500 text-xs">You can add this later if you prefer.</p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={state === 'loading' || !isValid}
                className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2 h-10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
              >
                {state === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create account'
                )}
              </Button>
            </form>

            {/* Sign In Link */}
            <p className="text-center text-stone-600 text-sm mt-6">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-teal-700 font-semibold hover:text-teal-800 underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
