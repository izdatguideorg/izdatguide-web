import classnames from 'classnames';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import React from 'react';

import { AdminBar } from '@/components/AdminBar';
import { Header } from '@/globals/Header/Component';
import { Providers } from '@/providers';
import { InitTheme } from '@/providers/Theme/InitTheme';
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
      className={classnames(GeistSans.variable, GeistMono.variable)}
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

          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
