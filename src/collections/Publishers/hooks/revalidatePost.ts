import { revalidatePath, revalidateTag } from 'next/cache';
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';

import type { Publisher } from '../../../payload-types';

export const revalidatePost: CollectionAfterChangeHook<Publisher> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/publishers/${doc.slug}`;

      payload.logger.info(`Revalidating publisher at path: ${path}`);

      revalidatePath(path);
      revalidateTag('publishers-sitemap');
    }

    // If the publisher was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/publishers/${previousDoc.slug}`;

      payload.logger.info(`Revalidating old publisher at path: ${oldPath}`);

      revalidatePath(oldPath);
      revalidateTag('publishers-sitemap');
    }
  }
  return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Publisher> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/publishers/${doc?.slug}`;

    revalidatePath(path);
    revalidateTag('publishers-sitemap');
  }

  return doc;
};
