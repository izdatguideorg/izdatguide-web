import React from 'react';

import { Media } from '@/components/Media';
import type { Post } from '@/payload-types';
import { formatAuthors } from '@/utilities/formatAuthors';
import { formatDateTime } from 'src/utilities/formatDateTime';

export const PostHero: React.FC<{
  post: Post;
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post;

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== '';

  return (
    <div>
      <div>
        <div>
          <div>
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category;

                const titleToUse = categoryTitle || 'Untitled category';

                const isLast = index === categories.length - 1;

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <>, &nbsp;</>}
                  </React.Fragment>
                );
              }
              return null;
            })}
          </div>

          <div>
            <h1>{title}</h1>
          </div>

          <div>
            {hasAuthors && (
              <div>
                <div>
                  <p>Author</p>

                  <p>{formatAuthors(populatedAuthors)}</p>
                </div>
              </div>
            )}
            {publishedAt && (
              <div>
                <p>Date Published</p>

                <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        {heroImage && typeof heroImage !== 'string' && (
          <Media fill priority imgClassName='' resource={heroImage} />
        )}
        <div />
      </div>
    </div>
  );
};
