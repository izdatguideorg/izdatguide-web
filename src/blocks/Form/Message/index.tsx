import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import React from 'react';

import RichText from '@/components/RichText';

import { Width } from '../Width';

export const Message: React.FC = ({ message }: { message: SerializedEditorState }) => (
  <Width className='' width='100'>
    {message && <RichText data={message} />}
  </Width>
);
