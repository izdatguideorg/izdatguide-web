import React from 'react';

const defaultLabels = {
  plural: 'Docs',
  singular: 'Doc',
};

const defaultCollectionLabels = {
  posts: {
    plural: 'Posts',
    singular: 'Post',
  },
};

export const PageRange: React.FC<{
  className?: string;
  collection?: string;
  collectionLabels?: {
    plural?: string;
    singular?: string;
  };
  currentPage?: number;
  limit?: number;
  totalDocs?: number;
}> = ({
  className,
  collection,
  collectionLabels: collectionLabelsFromProps,
  currentPage,
  limit,
  totalDocs,
}) => {
  let indexStart = (currentPage ? currentPage - 1 : 1) * (limit || 1) + 1;
  if (totalDocs && indexStart > totalDocs) indexStart = 0;

  let indexEnd = (currentPage || 1) * (limit || 1);
  if (totalDocs && indexEnd > totalDocs) indexEnd = totalDocs;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { plural, singular } =
    collectionLabelsFromProps || defaultCollectionLabels[collection || ''] || defaultLabels || {};

  return (
    <div className={[className].filter(Boolean).join(' ')}>
      {(typeof totalDocs === 'undefined' || totalDocs === 0) && 'Search produced no results.'}
      {typeof totalDocs !== 'undefined' &&
        totalDocs > 0 &&
        `Showing ${indexStart}${indexStart > 0 ? ` - ${indexEnd}` : ''} of ${totalDocs} ${
          totalDocs > 1 ? plural : singular
        }`}
    </div>
  );
};
