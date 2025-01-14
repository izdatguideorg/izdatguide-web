import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { getPayload } from 'payload';
import React, { cache } from 'react';

// import { RelatedPublishers } from '@/blocks/RelatedPublishers/Component';
import { LivePreviewListener } from '@/components/LivePreviewListener';
import { PayloadRedirects } from '@/components/PayloadRedirects';
import RichText from '@/components/RichText';
import { PublisherHero } from '@/heros/PublisherHero';
import type { Publisher } from '@/payload-types';
import { generateMeta } from '@/utilities/generateMeta';
import configPromise from '@payload-config';

import styles from './styles.module.scss';

export const generateStaticParams = async () => {
  const payload = await getPayload({ config: configPromise });
  const publishers = await payload.find({
    collection: 'publishers',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  });

  const params = publishers.docs.map(({ slug }) => ({ slug }));

  return params;
};

const queryPublisherBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: 'publishers',
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

const Publisher = async ({ params: paramsPromise }: Args) => {
  const { isEnabled: draft } = await draftMode();
  const { slug = '' } = await paramsPromise;
  const url = `/publishers/${slug}`;
  const publisher = await queryPublisherBySlug({ slug });

  if (!publisher) return <PayloadRedirects url={url} />;

  return (
    <article className={styles.container}>

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <PublisherHero publisher={publisher} />

        <div className={styles.description}>
          <RichText className='' data={publisher.content} enableGutter={false} />
        </div>
    </article>
  );
};

export default Publisher;

export const generateMetadata = async ({ params: paramsPromise }: Args): Promise<Metadata> => {
  const { slug = '' } = await paramsPromise;
  const Publisher = await queryPublisherBySlug({ slug });

  return generateMeta({ doc: Publisher });
};