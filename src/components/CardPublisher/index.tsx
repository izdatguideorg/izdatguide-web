'use client';

import classnames from 'classnames';
import Link from 'next/link';
import React from 'react';

import { Media } from '@/components/Media';
import type { Publisher } from '@/payload-types';
import useClickableCard from '@/utilities/useClickableCard';

import { Typography } from '../ui/typography';

import styles from './styles.module.scss';

export type CardPublisherData = Pick<Publisher, 'slug' | 'categories' | 'meta' | 'title'>;

export const CardPublisher: React.FC<{
  // alignItems?: 'center'
  className?: string;
  doc?: CardPublisherData;
  relationTo?: 'publishers';
  title?: string;
}> = ({ className, doc, relationTo, title: titleFromProps }) => {
  const { card, link } = useClickableCard({});

  const { slug, meta, title } = doc || {};
  const { image: metaImage } = meta || {};

  const titleToUse = titleFromProps || title;
  const href = `/${relationTo}/${slug}`;

  return (
    <Link ref={link.ref} className='' href={href}>
    <article ref={card.ref} className={classnames(styles.wrapper, className)}>
      <figure className={styles.container}>
      <div className={styles.imgWrapper}>
        {!metaImage && <div className=''>No image</div>}
        {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} />}
      </div>
      <figcaption className={styles.figcaption}>
        {titleToUse && (
            <Typography className={styles.navItem} tag='h3' variant='title4'>
                {titleToUse}
            </Typography>
        )}
      </figcaption>
      </figure>
    </article>
    </Link>
  );
};
