'use client';

import classnames from 'classnames';
import Link from 'next/link';
import React, { Fragment } from 'react';

import { Media } from '@/components/Media';
import type { Publisher } from '@/payload-types';
import useClickableCard from '@/utilities/useClickableCard';

import styles from './styles.module.scss';

export type CardPublisherData = Pick<Publisher, 'slug' | 'categories' | 'meta' | 'title'>;

export const CardPublisher: React.FC<{
  // alignItems?: 'center'
  className?: string;
  doc?: CardPublisherData;
  relationTo?: 'publishers';
  showCategories?: boolean;
  title?: string;
}> = ({ className, doc, relationTo, showCategories, title: titleFromProps }) => {
  const { card, link } = useClickableCard({});

  const { slug, categories, meta, title } = doc || {};
  const { description, image: metaImage } = meta || {};

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0;
  const titleToUse = titleFromProps || title;
  const sanitizedDescription = description?.replace(/\s/g, ' '); // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`;

  return (
    <article ref={card.ref} className={classnames(styles.wrapper, className)}>
      <div className={styles.imgWrapper}>
        {!metaImage && <div className=''>No image</div>}
        {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size='33vw' />}
      </div>
      <div className='p-4'>
        {showCategories && hasCategories && (
          <div className={styles.categories}>
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category;

                    const categoryTitle = titleFromCategory || 'Untitled category';

                    const isLast = index === categories.length - 1;

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <>, &nbsp;</>}
                      </Fragment>
                    );
                  }

                  return null;
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className='prose'>
            <h3>
              <Link ref={link.ref} className='not-prose' href={href}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && (
          <div className={styles.description}>{description && <p>{sanitizedDescription}</p>}</div>
        )}
      </div>
    </article>
  );
};
