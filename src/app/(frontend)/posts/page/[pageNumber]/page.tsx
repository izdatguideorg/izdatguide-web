import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';
import { getPayload } from 'payload';
import React from 'react';

import { CollectionArchive } from '@/components/CollectionArchive';
import { PageRange } from '@/components/PageRange';
import { Pagination } from '@/components/Pagination';
import configPromise from '@payload-config';

import PageClient from './page.client';

export const revalidate = 600;

type Args = {
  params: Promise<{
    pageNumber: string;
  }>;
};

const Page = async ({ params: paramsPromise }: Args) => {
  const { pageNumber } = await paramsPromise;
  const payload = await getPayload({ config: configPromise });

  const sanitizedPageNumber = Number(pageNumber);

  if (!Number.isInteger(sanitizedPageNumber)) notFound();

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: false,
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
        {posts?.page && posts?.totalPages > 1 && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  );
};

export default Page;

export const generateMetadata = async ({ params: paramsPromise }: Args): Promise<Metadata> => {
  const { pageNumber } = await paramsPromise;
  return {
    title: `GNI Posts Page ${pageNumber || ''}`,
  };
};

export const generateStaticParams = async () => {
  const payload = await getPayload({ config: configPromise });
  const { totalDocs } = await payload.count({
    collection: 'posts',
    overrideAccess: false,
  });

  const totalPages = Math.ceil(totalDocs / 10);

  const pages: { pageNumber: string }[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) });
  }

  return pages;
};
