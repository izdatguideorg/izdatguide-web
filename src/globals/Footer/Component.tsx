import Link from 'next/link';
import React from 'react';

import { CMSLink } from '@/components/Link';
import { Logo } from '@/components/Logo/Logo';
import type { Footer } from '@/payload-types';
import { ThemeSelector } from '@/providers/Theme/ThemeSelector';
import { getCachedGlobal } from '@/utilities/getGlobals';

export const Footer = async () => {
  const footerData: Footer = await getCachedGlobal('footer', 1)();

  const navItems = footerData?.navItems || [];

  return (
    <footer>
      <div>
        <Link href='/'>
          <Logo />
        </Link>

        <div>
          <ThemeSelector />
          <nav>
            {navItems.map(({ link }, i) => (
              <CMSLink key={i} {...link} />
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
