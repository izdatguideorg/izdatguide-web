import type { Metadata } from 'next/types';
import { getPayload } from 'payload';
import React from 'react';

import { CollectionArchive } from '@/components/CollectionArchive';
import { PageRange } from '@/components/PageRange';
import { Pagination } from '@/components/Pagination';
import configPromise from '@payload-config';

import PageClient from './page.client';

export const dynamic = 'force-static';
export const revalidate = 600;

const Page = async () => {
  const payload = await getPayload({ config: configPromise });

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  });

  return (
    <div className=''>
      <PageClient />
      <div className=''>
        <div className=''>
          <h1>Posts</h1>
        </div>
      </div>

      <div className=''>
        <PageRange
          collection='posts'
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className=''>
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  );
};

export default Page;

export const generateMetadata = (): Metadata => ({
  title: `GNI Posts`,
});
