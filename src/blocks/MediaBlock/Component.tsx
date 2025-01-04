import classnames from 'classnames';
import type { StaticImageData } from 'next/image';
import React from 'react';

import RichText from '@/components/RichText';
import type { MediaBlock as MediaBlockProps } from '@/payload-types';

import { Media } from '../../components/Media';

type Props = MediaBlockProps & {
  // breakout?: boolean
  captionClassName?: string;
  className?: string;
  enableGutter?: boolean;
  imgClassName?: string;
  staticImage?: StaticImageData;
  disableInnerContainer?: boolean;
};

type MediaCaption = {
  [k: string]: unknown;
  root: {
    type: string;
    children: {
      type: string;
      version: number;
      [k: string]: unknown;
    }[];
    direction: ('ltr' | 'rtl') | null;
    format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
    indent: number;
    version: number;
  };
};

export const MediaBlock: React.FC<Props> = ({
  captionClassName,
  className,
  enableGutter = true,
  imgClassName,
  media,
  staticImage,
  disableInnerContainer,
}) => {
  let caption: MediaCaption | null | undefined;
  if (media && typeof media === 'object') caption = media.caption;

  return (
    <div
      className={classnames(
        '',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      <Media imgClassName={classnames(imgClassName)} resource={media} src={staticImage} />
      {caption && (
        <div
          className={classnames(
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  );
};
