import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import classnames from 'classnames';
import * as React from 'react';

import styles from './styles.module.scss';

const buttonVariants = cva(styles.button, {
  defaultVariants: {
    size: 'default',
    variant: 'default',
  },
  variants: {
    size: {
      clear: '',
      default: styles.defaultSize,
      icon: styles.icon,
      lg: styles.lg,
      sm: styles.sm,
    },
    variant: {
      default: styles.defaultVariant,
      destructive: styles.destructive,
      ghost: styles.ghost,
      link: styles.link,
      outline: styles.outline,
      secondary: styles.secondary,
    },
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, size, variant, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={classnames(buttonVariants({ className, size, variant }))}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
