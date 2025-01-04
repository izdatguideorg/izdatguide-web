import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import clsx from 'clsx';
import React from 'react';

import RichText from '@/components/RichText';
import type { Post } from '@/payload-types';

import { Card } from '../../components/Card';

import styles from './styles.module.scss';

export type RelatedPostsProps = {
  className?: string;
  docs?: Post[];
  introContent?: SerializedEditorState;
};

export const RelatedPosts: React.FC<RelatedPostsProps> = ({ className, docs, introContent }) => (
  <div className={clsx('lg:container', className)}>
    {introContent && <RichText data={introContent} enableGutter={false} />}

    <div className={styles.container}>
      {docs?.map((doc, index) => {
        if (typeof doc === 'string') return null;

        return <Card key={index} showCategories doc={doc} relationTo='posts' />;
      })}
    </div>
  </div>
);
