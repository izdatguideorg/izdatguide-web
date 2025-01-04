import type { Metadata } from 'next';

import { getServerSideURL } from './getURL';

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'An open-source website built with Payload and Next.js.',
  images: [
    {
      url: `${getServerSideURL()}/website-template-OG.webp`,
    },
  ],
  siteName: 'GNI',
  title: 'GNI',
};

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => ({
  ...defaultOpenGraph,
  ...og,
  images: og?.images ? og.images : defaultOpenGraph.images,
});
