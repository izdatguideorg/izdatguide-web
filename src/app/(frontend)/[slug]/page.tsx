import { draftMode } from 'next/headers';
import { getPayload } from 'payload';
import React, { cache } from 'react';

import { RenderBlocks } from '@/blocks/RenderBlocks';
import { LivePreviewListener } from '@/components/LivePreviewListener';
import { PayloadRedirects } from '@/components/PayloadRedirects';
import { homeStatic } from '@/endpoints/seed/home-static';
import { RenderHero } from '@/heros/RenderHero';
import type { Page as PageType } from '@/payload-types';
import { generateMeta } from '@/utilities/generateMeta';
import configPromise from '@payload-config';

import PageClient from './page.client';

export const generateStaticParams = async () => {
  const payload = await getPayload({ config: configPromise });
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  });

  const params = pages.docs?.filter((doc) => doc.slug !== 'home').map(({ slug }) => ({ slug }));

  return params;
};

type Args = {
  params: Promise<{
    slug?: string;
  }>;
};

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return result.docs?.[0] || null;
});

const Page = async ({ params: paramsPromise }: Args) => {
  const { isEnabled: draft } = await draftMode();
  const { slug = 'home' } = await paramsPromise;
  const url = `/${slug}`;

  let page: PageType | null;

  page = await queryPageBySlug({
    slug,
  });

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic;
  }

  if (!page) {
    return <PayloadRedirects url={url} />;
  }

  const { hero, layout } = page;

  return (
    <article className=''>
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  );
};

export default Page;

export const generateMetadata = async ({ params: paramsPromise }: Args) => {
  const { slug = 'home' } = await paramsPromise;
  const page = await queryPageBySlug({
    slug,
  });

  return generateMeta({ doc: page });
};
