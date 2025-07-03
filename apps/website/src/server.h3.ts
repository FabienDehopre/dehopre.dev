import {
  createApp,
  createError,
  defineEventHandler,
  serveStatic,
  toNodeListener,
  toWebHandler
} from "h3";
import { createRequestHandler } from "@angular/ssr";
import { stat, readFile } from "node:fs/promises";
import {dirname, resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {join} from "pathe";
import { createServer } from "node:http";
import {AngularNodeAppEngine, isMainModule, writeResponseToNodeResponse} from "@angular/ssr/node";

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
console.log(`Server dist folder at ${serverDistFolder}`);
console.log(`Browser dist folder at ${browserDistFolder}`);

export const app = createApp();
const angularApp = new AngularNodeAppEngine();

app.use(defineEventHandler((event) => {
  return serveStatic(event, {
    getContents: (id) => readFile(join(browserDistFolder, id)),
    getMeta: async (id) => {
      const stats = await stat(join(browserDistFolder, id));
      if (!stats || !stats.isFile()) {
        return;
      }

      return {
        size: stats.size,
        mtime: stats.mtimeMs,
      };
    },
  });
}));

app.use('/**', defineEventHandler(async (event) => {
  const response = await angularApp.handle(event.node.req);
  if (response) {
    await writeResponseToNodeResponse(response, event.node.res);
  }

  throw createError('Failed to render angular application.');
}));

if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  createServer(toNodeListener(app)).listen(port, () => {
    console.log(`Node H3 server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createRequestHandler(toWebHandler(app));
