'use client';

import classnames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { IconSearch } from '@/components/Icons/IconSearch';
import { Typography } from '@/components/ui/typography';
import type { Header } from '@/payload-types';
import { useHeaderTheme } from '@/providers/HeaderTheme';

import { HeaderNav } from './Nav';
import styles from './styles.module.scss';

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
      <div className={styles.container}>
        <Link className={classnames(styles.navItem_wrapper, styles.logo_wrapper)} href='/'>
          <Typography className={styles.navItem} tag='h3' variant='title3'>Гид по независимым издательствам</Typography>
        </Link>
        <Link className={classnames(styles.navItem_wrapper, styles.search_wrapper)} href='/search'>
        <IconSearch />
      </Link>
      <div className={styles.navItem_wrapper}>
      <Link href='/'>
          <Typography className={styles.navItem} tag='h3' variant='title3'>Каталог</Typography>
        </Link>
        </div>
        <div className={classnames(styles.navItem_wrapper, styles.bookmark_wrapper)}>
          <Typography className={styles.navItem} tag='h3' variant='title3'>Закладки</Typography>
        </div>
        <HeaderNav data={data} />
      </div>
    </header>
  );
};
