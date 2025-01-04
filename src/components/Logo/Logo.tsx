import clsx from 'clsx';
import React from 'react';

interface Props {
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: 'auto' | 'high' | 'low';
}

export const Logo = ({
  loading: loadingFromProps,
  priority: priorityFromProps,
  className,
}: Props) => {
  const loading = loadingFromProps || 'lazy';
  const priority = priorityFromProps || 'low';

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt='Payload Logo'
      className={clsx(className)}
      decoding='async'
      fetchPriority={priority}
      height={34}
      loading={loading}
      src='https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-logo-light.svg'
      width={193}
    />
  );
};
