import React from 'react';

import RichText from '@/components/RichText';
import type { BannerBlock as BannerBlockProps } from 'src/payload-types';

type Props = {
  className?: string;
} & BannerBlockProps;

export const BannerBlock: React.FC<Props> = ({ className, content }) => (
  <div className={className}>
    <div className=''>
      <RichText data={content} enableGutter={false} enableProse={false} />
    </div>
  </div>
);
