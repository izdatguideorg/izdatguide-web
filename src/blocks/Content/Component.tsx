import React from 'react';

import RichText from '@/components/RichText';
import type { ContentBlock as ContentBlockProps } from '@/payload-types';

import { CMSLink } from '../../components/Link';

import styles from './styles.module.scss';

export const ContentBlock: React.FC<ContentBlockProps> = ({ columns }) => {
  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col;

            return (
              <div key={index} className={styles.content}>
                {richText && <RichText data={richText} enableGutter={false} />}

                {enableLink && <CMSLink {...link} />}
              </div>
            );
          })}
      </div>
    </div>
  );
};
