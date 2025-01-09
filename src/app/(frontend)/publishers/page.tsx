import type { Metadata } from 'next/types';
import { getPayload } from 'payload';
import React from 'react';

import { CardPublisher } from '@/components/CardPublisher';
import configPromise from '@payload-config';

export const dynamic = 'force-static';
export const revalidate = 600;

const Page = async () => {
  const payload = await getPayload({ config: configPromise });

  const publishers = await payload.find({
    collection: 'publishers',
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  });

  return (
    <div className=''>
      <div className=''>
        <div className=''>
          <h1>Publishers</h1>
        </div>
      </div>
      <div>{publishers.docs[0].title}</div>
      <CardPublisher doc={publishers.docs[0]} />
    </div>
  );
};

export default Page;

export const generateMetadata = (): Metadata => ({
  title: `GNI Posts`,
});