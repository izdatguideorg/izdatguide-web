import classnames from 'classnames';
import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import React from 'react';

import { Header } from '@/Header/Component';
import { AdminBar } from '@/components/AdminBar';
import { Providers } from '@/providers';
import { InitTheme } from '@/providers/Theme/InitTheme';
import { montserrat, bebasNeue } from '@/styles/fonts';
import '../../styles/globals.scss';
import { getServerSideURL } from '@/utilities/getURL';
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph';

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const { isEnabled } = await draftMode();

  return (
    <html
      suppressHydrationWarning
      className={classnames(montserrat.variable, bebasNeue.variable)}
      lang='en'
    >
      <head>
        <InitTheme />
        <link href='/favicon.ico' rel='icon' sizes='32x32' />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          <div className='layout_wrapper'>
          <Header />
          {children}
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
