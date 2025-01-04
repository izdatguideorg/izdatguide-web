'use client';

import { toast } from '@payloadcms/ui';
import React, { useCallback, useState } from 'react';

import './index.scss';

const SuccessMessage: React.FC = () => (
  <div>
    Database seeded! You can now{' '}
    <a href='/' target='_blank'>
      visit your website
    </a>
  </div>
);

export const SeedButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [seeded, setSeeded] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = useCallback(
    (e) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      e.preventDefault();

      if (seeded) {
        toast.info('Database already seeded.');
        return;
      }
      if (loading) {
        toast.info('Seeding already in progress.');
        return;
      }
      if (error) {
        toast.error(`An error occurred, please refresh and try again.`);
        return;
      }

      setLoading(true);

      try {
        toast.promise(
          new Promise((resolve, reject) => {
            try {
              fetch('/next/seed', { method: 'POST', credentials: 'include' })
                .then((res) => {
                  if (res.ok) {
                    resolve(true);
                    setSeeded(true);
                  } else {
                    reject(new Error());
                  }
                })
                .catch((error) => {
                  console.error(error);
                  reject(new Error());
                });
            } catch (error) {
              console.error(error);
              reject(new Error());
            }
          }),
          {
            loading: 'Seeding with data....',
            success: <SuccessMessage />,
            error: 'An error occurred while seeding.',
          },
        );
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setError(err);
      }
    },
    [loading, seeded, error],
  );

  let message = '';
  if (loading) message = ' (seeding...)';
  if (seeded) message = ' (done!)';
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  if (error) message = ` (error: ${error})`;

  return (
    <>
      <button className='seedButton' onClick={void handleClick}>
        Seed your database
      </button>
      {message}
    </>
  );
};
