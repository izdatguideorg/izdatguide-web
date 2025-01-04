import type { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react';
import { RichText as RichTextWithoutBlocks } from '@payloadcms/richtext-lexical/react';
import classnames from 'classnames';

import { BannerBlock } from '@/blocks/Banner/Component';
import { CallToActionBlock } from '@/blocks/CallToAction/Component';
import type { CodeBlockProps } from '@/blocks/Code/Component';
import { CodeBlock } from '@/blocks/Code/Component';
import { MediaBlock } from '@/blocks/MediaBlock/Component';
import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types';

import styles from './styles.module.scss';

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps>;

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    banner: ({ node }) => <BannerBlock className={styles.bannerBlock} {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className={styles.mediaBlock}
        imgClassName='m-0'
        {...node.fields}
        disableInnerContainer
        captionClassName={styles.mediaCaption}
        enableGutter={false}
      />
    ),
    code: ({ node }: { node: SerializedBlockNode<CodeBlockProps> }) => (
      <CodeBlock className={styles.codeBlock} {...node.fields} />
    ),
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
  },
});

type Props = {
  data: SerializedEditorState;
  enableGutter?: boolean;
  enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const RichText = ({ className, enableProse = true, enableGutter = true, ...rest }: Props) => (
  <RichTextWithoutBlocks
    converters={jsxConverters}
    className={classnames(
      {
        'container ': enableGutter,
        'max-w-none': !enableGutter,
        'mx-auto prose md:prose-md dark:prose-invert ': enableProse,
      },
      className,
    )}
    {...rest}
  />
);

export default RichText;
