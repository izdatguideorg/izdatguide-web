import { revalidateTag } from 'next/cache';
import type { GlobalAfterChangeHook } from 'payload';

export const revalidateFooter: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating footer`);

    revalidateTag('global_footer');
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return doc;
};
