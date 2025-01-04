import classnames from 'classnames';
import * as React from 'react';

import styles from './styles.module.scss';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, className, ...props }, ref) => (
    <input ref={ref} className={classnames(styles.input, className)} type={type} {...props} />
  ),
);
Input.displayName = 'Input';

export { Input };
