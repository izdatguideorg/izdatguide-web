import type { Metadata } from 'next/types';
import { getPayload } from 'payload';
import React from 'react';

import type { CardPostData } from '@/components/Card';
import { CollectionArchive } from '@/components/CollectionArchive';
import { Search } from '@/search/Component';
import configPromise from '@payload-config';

import PageClient from './page.client';

type Args = {
  searchParams: Promise<{
    q: string;
  }>;
};
const Page = async ({ searchParams: searchParamsPromise }: Args) => {
  const { q: query } = await searchParamsPromise;
  const payload = await getPayload({ config: configPromise });

  const posts = await payload.find({
    collection: 'search',
    depth: 1,
    limit: 12,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                'meta.description': {
                  like: query,
                },
              },
              {
                'meta.title': {
                  like: query,
                },
              },
              {
                slug: {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  });

  return (
    <div className=''>
      <PageClient />
      <div className=''>
        <div className=''>
          <h1 className=''>Search</h1>

          <div className=''>
            <Search />
          </div>
        </div>
      </div>

      {posts.totalDocs > 0 ? (
        <CollectionArchive posts={posts.docs as CardPostData[]} />
      ) : (
        <div className=''>No results found.</div>
      )}
    </div>
  );
};

export default Page;

export const generateMetadata = (): Metadata => ({
  title: `GNI Search`,
});
