import React from 'react';

import { Media } from '@/components/Media';
import { Typography } from '@/components/ui/typography';
import type { Publisher } from '@/payload-types';
import { formatEstablishedTime } from 'src/utilities/formatEstablishedTime';

import styles from './styles.module.scss';

export const PublisherHero: React.FC<{
  publisher: Publisher;
}> = ({ publisher }) => {
  const { categories, heroImage, establishedAt, title, city } = publisher;

  return (
    <div>
          <div className={styles.titleWrapper}>
          <Typography tag='h1' variant='title1'>{title}</Typography>
            {heroImage && typeof heroImage !== 'string' && (
          <Media priority imgClassName={styles.img} resource={heroImage} />
        )}
          </div>

          <div>
            {establishedAt && (
              <Typography variant='text2'>
                <span>Год основания: </span>
                <time dateTime={establishedAt}>{formatEstablishedTime(establishedAt)}</time>
              </Typography>
            )}
          </div>
          <div>
            {city && (
              <Typography variant='text2'>
                <span>Основано в </span>
                <span>{city}</span>
              </Typography>
            )}
          </div>
          <div>
          <Typography variant='text2'>
            {categories && categories.length === 1 ? (
              <span>Направление: </span>
            ) : (
              <span>Направления: </span>
            )}
            
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category;

                const titleToUse = categoryTitle || 'Untitled category';

                const isLast = index === categories.length - 1;

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <>, &nbsp;</>}
                  </React.Fragment>
                );
              }
              return null;
            })}
            </Typography>
          </div>
    </div>
  );
};
