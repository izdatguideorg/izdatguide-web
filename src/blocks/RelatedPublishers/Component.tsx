import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import clsx from 'clsx';
import React from 'react';

import RichText from '@/components/RichText';
import type { Publisher } from '@/payload-types';

import { CardPublisher } from '../../components/CardPublisher';

import styles from './styles.module.scss';

export type RelatedPublishersProps = {
  className?: string;
  docs?: Publisher[];
  introContent?: SerializedEditorState;
};

export const  RelatedPublishers: React.FC<RelatedPublishersProps> = ({ className, docs, introContent }) => (
  <div className={clsx('lg:container', className)}>
    {introContent && <RichText data={introContent} enableGutter={false} />}

    <div className={styles.container}>
      {docs?.map((doc, index) => {
        if (typeof doc === 'string') return null;

        return <CardPublisher key={index} doc={doc} relationTo='publishers' />;
      })}
    </div>
  </div>
);
