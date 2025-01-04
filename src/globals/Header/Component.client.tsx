'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Logo } from '@/components/Logo/Logo';
import type { Header } from '@/payload-types';
import { useHeaderTheme } from '@/providers/HeaderTheme';

import { HeaderNav } from './Nav';

interface HeaderClientProps {
  data: Header;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null);
  const { headerTheme, setHeaderTheme } = useHeaderTheme();
  const pathname = usePathname();

  useEffect(() => {
    setHeaderTheme(null);
  }, [pathname, setHeaderTheme]);

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme);
  }, [headerTheme, theme]);

  return (
    <header {...(theme ? { 'data-theme': theme } : {})}>
      <div>
        <Link href='/'>
          <Logo loading='eager' priority='high' />
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  );
};
