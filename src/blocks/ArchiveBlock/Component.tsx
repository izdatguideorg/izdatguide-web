import { getPayload } from 'payload';
import React from 'react';

import { CollectionArchive } from '@/components/CollectionArchive';
import RichText from '@/components/RichText';
import type { Post, ArchiveBlock as ArchiveBlockProps } from '@/payload-types';
import configPromise from '@payload-config';

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string;
  }
> = async ({ id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs }) => {
  const limit = limitFromProps || 3;

  let posts: Post[] = [];

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise });

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id;
      return category;
    });

    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    });

    posts = fetchedPosts.docs;
  } else if (selectedDocs?.length) {
    const filteredSelectedPosts = selectedDocs.map(
      (post) => typeof post.value === 'object' && post.value,
    ) as Post[];

    posts = filteredSelectedPosts;
  }

  return (
    <div className='' id={`block-${id}`}>
      {introContent && (
        <div className=''>
          <RichText className='' data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive posts={posts} />
    </div>
  );
};
