import React from 'react';

import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import type { Page } from '@/payload-types';

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => (
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
    <div>
      {media && typeof media === 'object' && (
        <div>
          <Media priority imgClassName='' resource={media} />
          {media?.caption && (
            <div>
              <RichText data={media.caption} enableGutter={false} />
            </div>
          )}
        </div>
      )}
    </div>
  </div>
);
