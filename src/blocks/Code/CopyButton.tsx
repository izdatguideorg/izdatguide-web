'use client';

import { CopyIcon } from '@payloadcms/ui/icons/Copy';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

export const CopyButton = ({ code }: { code: string }) => {
  const [text, setText] = useState('Copy');

  const updateCopyStatus = () => {
    if (text === 'Copy') {
      setText(() => 'Copied!');
      setTimeout(() => {
        setText(() => 'Copy');
      }, 1000);
    }
  };

  const handleClick = async (e: unknown) => {
    try {
      await navigator.clipboard.writeText(code);
      updateCopyStatus();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className=''>
      <Button className='' variant='secondary' onClick={(e) => void handleClick(e)}>
        <p>{text}</p>
        <CopyIcon />
      </Button>
    </div>
  );
};
