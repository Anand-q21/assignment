// apps/frontend/src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { clearToken, getToken } from '../lib/api'; // This import now works
import { useRouter } from 'next/navigation';

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(!!getToken());
  }, []);

  const handleLogout = () => {
    clearToken();
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800">
          Microservices App
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/products" className="text-gray-600 hover:text-blue-500">
            Products
          </Link>
          <Link href="/orders" className="text-gray-600 hover:text-blue-500">
            Orders
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}