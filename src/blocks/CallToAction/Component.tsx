import React from 'react';

import { CMSLink } from '@/components/Link';
import RichText from '@/components/RichText';
import type { CallToActionBlock as CTABlockProps } from '@/payload-types';

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => (
  <div className=''>
    <div className=''>
      <div className=''>
        {richText && <RichText className='' data={richText} enableGutter={false} />}
      </div>
      <div className=''>
        {(links || []).map(({ link }, i) => (
          <CMSLink key={i} size='lg' {...link} />
        ))}
      </div>
    </div>
  </div>
);
