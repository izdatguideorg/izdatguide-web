import React from 'react';

import type { CardPublisherData } from '@/components/CardPublisher';
import { CardPublisher } from '@/components/CardPublisher';

import styles from './styles.module.scss';

export type Props = {
  publishers: CardPublisherData[];
};

export const CollectionPublishers: React.FC<Props> = ({ publishers }) => (
      <div className={styles.wrapper}>
        {publishers?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <div key={index} className={styles.card_wrapper}>
                <CardPublisher showCategories className={styles.card} doc={result} relationTo='publishers' />
              </div>
            );
          }

          return null;
        })}
      </div>
);
