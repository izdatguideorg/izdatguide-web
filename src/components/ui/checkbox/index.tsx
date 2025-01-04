'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import classnames from 'classnames';
import { Check } from 'lucide-react';
import * as React from 'react';

import styles from './styles.module.scss';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root ref={ref} className={classnames(styles.root, className)} {...props}>
    <CheckboxPrimitive.Indicator className={classnames(styles.indicator)}>
      <Check className={styles.check} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
