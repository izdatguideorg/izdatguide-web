'use client';

import classNames from 'classnames';
import React from 'react';

import { IconArrow } from '@/components/Icons/IconArrow';
import { CMSLink } from '@/components/Link';
import { Typography } from '@/components/ui/typography';
import type { Header as HeaderType } from '@/payload-types';

import styles from '../styles.module.scss';

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || [];

  return (
    <nav className={styles.nets_wrapper}>
      {navItems.map(({ link }, i) => (
        <div key={i} className={classNames(styles.navItem_wrapper, styles.netItem_wrapper)}>
        <Typography className={styles.navItem} tag='h3' variant='title3'>
          <CMSLink {...link} appearance='link' />
        </Typography>
        <IconArrow className={styles.navIcon} />
        </div>
      ))}
    </nav>
  );
};
