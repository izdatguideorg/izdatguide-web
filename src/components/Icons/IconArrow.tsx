import type { ComponentPropsWithRef, FC } from 'react';

export const IconArrow: FC<ComponentPropsWithRef<'svg'>> = (props) => (
  <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" {...props}>
<path d="M9 10L4 15L9 20" stroke="#161616" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="2"/>
<path d="M4 15H14.5C15.9587 15 17.3576 14.4205 18.3891 13.3891C19.4205 12.3576 20 10.9587 20 9.5C20 8.77773 19.8577 8.06253 19.5813 7.39524C19.3049 6.72795 18.8998 6.12163 18.3891 5.61091C17.3576 4.57946 15.9587 4 14.5 4H11" stroke="#161616" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="2"/>
</svg>
);