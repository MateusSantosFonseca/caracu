import Link from 'next/link';

import { SignOutButton } from '@/components/SignOutButton';
import { AppConfig } from '@/utils/AppConfig';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full px-2 text-gray-700 antialiased sm:px-4 md:px-6 lg:px-8">
      <div className="mx-auto max-w-screen-md">
        <header className="border-b border-gray-300 pb-2">
          <div className="pb-8 pt-6 text-center sm:pt-10">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {AppConfig.title}
            </h1>
            <h2 className="text-sm sm:text-base">{AppConfig.description}</h2>
          </div>

          <div className="flex flex-col">
            <nav className="mt-4 sm:mt-0">
              <ul className="flex justify-between text-base sm:text-lg">
                <div className="flex">
                  <li className="mr-6">
                    <Link
                      href="/dashboard/"
                      className="border-none text-gray-700 hover:text-gray-900"
                    >
                      Sorteador
                    </Link>
                  </li>
                  <li className="mr-6">
                    <Link
                      href="/dashboard/players/"
                      className="border-none text-gray-700 hover:text-gray-900"
                    >
                      Jogadores
                    </Link>
                  </li>
                  <li className="mr-6">
                    <Link
                      href="/dashboard/user-profile/"
                      className="border-none text-gray-700 hover:text-gray-900"
                    >
                      Conta
                    </Link>
                  </li>
                </div>
                <div className="flex">
                  <li className="mr-4">
                    <SignOutButton />
                  </li>
                </div>
              </ul>
            </nav>

            <nav className="sm:mt-0">
              <ul className="flex flex-wrap justify-center text-sm sm:justify-end sm:text-base" />
            </nav>
          </div>
        </header>

        <main className="py-3 text-sm sm:py-5 sm:text-base">{children}</main>

        <footer className="border-t border-gray-300 py-4 text-center text-xs sm:text-sm">
          © {new Date().getFullYear()} {AppConfig.title}.
        </footer>
      </div>
    </div>
  );
}
