import type { NitroApp } from 'nitropack';

import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin';

export default defineNitroPlugin((nitroApp: NitroApp) => {
  nitroApp.hooks.hook('request', async (event) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention -- fine to bypass bundling
    const _pkg = 'wrangler'; // Bypass bundling!
    const { getPlatformProxy } = (await import(
      _pkg
    )) as typeof import('wrangler');
    const platform = await getPlatformProxy();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- don't understand why the error pops
    event.context.cf = platform.cf;
    event.context.cloudflare = {
      env: platform.env as unknown as Env,
      context: platform.ctx,
    };
  });
});
