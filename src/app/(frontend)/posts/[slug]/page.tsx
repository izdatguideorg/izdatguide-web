import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { getPayload } from 'payload';
import React, { cache } from 'react';

import { RelatedPosts } from '@/blocks/RelatedPosts/Component';
import { LivePreviewListener } from '@/components/LivePreviewListener';
import { PayloadRedirects } from '@/components/PayloadRedirects';
import RichText from '@/components/RichText';
import { PostHero } from '@/heros/PostHero';
import type { Post } from '@/payload-types';
import { generateMeta } from '@/utilities/generateMeta';
import configPromise from '@payload-config';

import PageClient from './page.client';

export const generateStaticParams = async () => {
  const payload = await getPayload({ config: configPromise });
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  });

  const params = posts.docs.map(({ slug }) => ({ slug }));

  return params;
};

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return result.docs?.[0] || null;
});

type Args = {
  params: Promise<{
    slug?: string;
  }>;
};

const Post = async ({ params: paramsPromise }: Args) => {
  const { isEnabled: draft } = await draftMode();
  const { slug = '' } = await paramsPromise;
  const url = `/posts/${slug}`;
  const post = await queryPostBySlug({ slug });

  if (!post) return <PayloadRedirects url={url} />;

  return (
    <article className=''>
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <PostHero post={post} />

      <div className=''>
        <div className=''>
          <RichText className='' data={post.content} enableGutter={false} />
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <RelatedPosts
              className=''
              docs={post.relatedPosts.filter((post) => typeof post === 'object')}
            />
          )}
        </div>
      </div>
    </article>
  );
};

export default Post;

export const generateMetadata = async ({ params: paramsPromise }: Args): Promise<Metadata> => {
  const { slug = '' } = await paramsPromise;
  const post = await queryPostBySlug({ slug });

  return generateMeta({ doc: post });
};
