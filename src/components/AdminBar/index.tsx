'use client';

import classnames from 'classnames';
import { useSelectedLayoutSegments, useRouter } from 'next/navigation';
import type { PayloadAdminBarProps } from 'payload-admin-bar';
import { PayloadAdminBar } from 'payload-admin-bar';
import React, { useState } from 'react';

import './index.scss';
import { getClientSideURL } from '@/utilities/getURL';

const baseClass = 'admin-bar';

const collectionLabels = {
  pages: {
    plural: 'Pages',
    singular: 'Page',
  },
  posts: {
    plural: 'Posts',
    singular: 'Post',
  },
  projects: {
    plural: 'Projects',
    singular: 'Project',
  },
};

const Title: React.FC = () => <span>Dashboard</span>;

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps;
}> = (props) => {
  const { adminBarProps } = props || {};
  const segments = useSelectedLayoutSegments();
  const [show, setShow] = useState(false);
  const collection = collectionLabels?.[segments?.[1]] ? segments?.[1] : 'pages';
  const router = useRouter();

  const onAuthChange = React.useCallback((user) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    setShow(user?.id);
  }, []);

  return (
    <div
      className={classnames(baseClass, {
        block: show,
        hidden: !show,
      })}
    >
      <div className='container'>
        <PayloadAdminBar
          {...adminBarProps}
          className=''
          cmsURL={getClientSideURL()}
          collection={collection}
          logo={<Title />}
          classNames={{
            controls: 'font-medium text-white',
            logo: 'text-white',
            user: 'text-white',
          }}
          collectionLabels={{
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            plural: collectionLabels[collection]?.plural || 'Pages',
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            singular: collectionLabels[collection]?.singular || 'Page',
          }}
          style={{
            backgroundColor: 'transparent',
            padding: 0,
            position: 'relative',
            zIndex: 'unset',
          }}
          onAuthChange={onAuthChange}
          onPreviewExit={() => {
            void fetch('/next/exit-preview').then(() => {
              router.push('/');
              router.refresh();
            });
          }}
        />
      </div>
    </div>
  );
};
