'use client';

import { SignOutButton as SignOutButtonClerk } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const SignOutButton = () => (
  <SignOutButtonClerk signOutCallback={() => redirect('/')}>
    <button
      className="border-none text-gray-700 hover:text-gray-900"
      type="button"
    >
      Sair
    </button>
  </SignOutButtonClerk>
);

export { SignOutButton };
