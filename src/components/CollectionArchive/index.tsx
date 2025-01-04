import React from 'react';

import type { CardPostData } from '@/components/Card';
import { Card } from '@/components/Card';

import styles from './styles.module.scss';

export type Props = {
  posts: CardPostData[];
};

export const CollectionArchive: React.FC<Props> = ({ posts }) => (
  <div className=''>
    <div>
      <div className={styles.wrapper}>
        {posts?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <div key={index} className={styles.card_wrapper}>
                <Card showCategories className={styles.card} doc={result} relationTo='posts' />
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  </div>
);
