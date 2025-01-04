'use client';

import React, { useEffect } from 'react';

import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import type { Page } from '@/payload-types';
import { useHeaderTheme } from '@/providers/HeaderTheme';

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme();

  useEffect(() => {
    setHeaderTheme('dark');
  });

  return (
    <div data-theme='dark'>
      <div>
        <div>
          {richText && <RichText data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul>
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div>
        {media && typeof media === 'object' && (
          <Media fill priority imgClassName='' resource={media} />
        )}
      </div>
    </div>
  );
};
