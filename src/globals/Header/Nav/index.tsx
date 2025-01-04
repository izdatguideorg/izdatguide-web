'use client';

import { SearchIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { CMSLink } from '@/components/Link';
import type { Header as HeaderType } from '@/payload-types';

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || [];

  return (
    <nav>
      {navItems.map(({ link }, i) => (
        <CMSLink key={i} {...link} appearance='link' />
      ))}
      <Link href='/search'>
        <span>Search</span>
        <SearchIcon />
      </Link>
    </nav>
  );
};
