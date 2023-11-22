import '@/styles/global.css';
import 'react-responsive-modal/styles.css';

import { NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  );
};

export default MyApp;
