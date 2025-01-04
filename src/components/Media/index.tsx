import React, { Fragment } from 'react';

import { ImageMedia } from './ImageMedia';
import { VideoMedia } from './VideoMedia';
import type { Props } from './types';

type Tag = 'div' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'li';

export const Media: React.FC<Props> = (props) => {
  const { className, htmlElement = 'div', resource } = props;

  const isVideo = typeof resource === 'object' && resource?.mimeType?.includes('video');
  const Tag = (htmlElement as Tag) || Fragment;

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className,
          }
        : {})}
    >
      {isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />}
    </Tag>
  );
};
