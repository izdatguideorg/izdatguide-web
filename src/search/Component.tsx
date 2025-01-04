'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDebounce } from '@/utilities/useDebounce';

export const Search: React.FC = () => {
  const [value, setValue] = useState('');
  const router = useRouter();

  const debouncedValue = useDebounce(value);

  useEffect(() => {
    router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ''}`);
  }, [debouncedValue, router]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Label htmlFor='search'>Search</Label>
        <Input
          id='search'
          placeholder='Search'
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
        <button type='submit'>submit</button>
      </form>
    </div>
  );
};
