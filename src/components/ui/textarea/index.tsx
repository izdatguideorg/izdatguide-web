import classnames from 'classnames';
import * as React from 'react';

import styles from './styles.module.scss';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={classnames(styles.textarea, className)} {...props} />
  ),
);
Textarea.displayName = 'Textarea';

export { Textarea };
