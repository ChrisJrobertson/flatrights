import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      {/* Subtle header */}
      <div className="border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors">
            <div className="w-8 h-8 bg-teal-700 rounded flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-stone-900">FlatRights</span>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
