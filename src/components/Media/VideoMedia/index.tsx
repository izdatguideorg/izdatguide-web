'use client';

import React, { useEffect, useRef } from 'react';

import { getClientSideURL } from '@/utilities/getURL';

import type { Props as MediaProps } from '../types';

export const VideoMedia: React.FC<MediaProps> = ({ onClick, resource, videoClassName }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  // const [showFallback] = useState<boolean>()

  useEffect(() => {
    const { current: video } = videoRef;
    if (video) {
      video.addEventListener('suspend', () => {
        // setShowFallback(true);
        // console.warn('Video was suspended, rendering fallback image.')
      });
    }
  }, []);

  if (resource && typeof resource === 'object') {
    const { filename } = resource;

    return (
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className={videoClassName}
        controls={false}
        onClick={onClick}
      >
        <source src={`${getClientSideURL()}/media/${filename}`} />
      </video>
    );
  }

  return null;
};
