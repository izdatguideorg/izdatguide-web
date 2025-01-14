import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';

const NotFound = () => (
  <div className=''>
    <div className=''>
      <h1 style={{ marginBottom: 0 }}>404</h1>
      <p className=''>Здесь пока ничего нет</p>
    </div>
    <Button asChild variant='default'>
      <Link href='/'>Вернуться</Link>
    </Button>
  </div>
);

export default NotFound;
