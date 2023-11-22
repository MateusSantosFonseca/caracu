import Link from 'next/link';
import type { ReactNode } from 'react';

import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta?: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full px-2 text-gray-700 antialiased sm:px-4 md:px-6 lg:px-8">
    {props.meta}

    <div className="mx-auto max-w-screen-md">
      <header className="border-b border-gray-300 pb-2">
        <div className="pb-8 pt-6 text-center sm:pt-10">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {AppConfig.title}
          </h1>
          <h2 className="text-sm sm:text-base">{AppConfig.description}</h2>
        </div>

        <div className="flex flex-col justify-center sm:flex-row sm:justify-between">
          <nav className="mt-4 sm:mt-0">
            <ul className="flex flex-wrap text-base sm:justify-start sm:text-lg">
              <li className="mr-6">
                <Link
                  href="/"
                  className="border-none text-gray-700 hover:text-gray-900"
                >
                  Home
                </Link>
              </li>
              <li className="mr-6">
                <Link
                  href="/about/"
                  className="border-none text-gray-700 hover:text-gray-900"
                >
                  Sobre
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="content py-3 text-sm sm:py-5 sm:text-base">
        {props.children}
      </main>

      <footer className="border-t border-gray-300 py-2 text-center text-xs sm:text-sm">
        © {new Date().getFullYear()} {AppConfig.title}.
      </footer>
    </div>
  </div>
);

export { Main };
