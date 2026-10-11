import type { PageServerLoad } from '@analogjs/router';
import type { Type } from 'arktype';

import { type } from 'arktype';

/**
 * Fetches data from one of the site's API endpoints in a page `load` function and validates it against a schema.
 * @param fetch the `fetch` given to the page `load` function
 * @param url the API endpoint
 * @param schema the arktype schema the data must match
 * @param label what the data is, for the error message (e.g. `projects`)
 * @throws {TypeError} when the data does not match the schema
 */
export async function fetchAndValidate<S extends Type>(fetch: PageServerLoad['fetch'], url: string, schema: S, label: string): Promise<S['infer']> {
  const result = schema(await fetch(url)) as S['infer'] | type.errors;
  if (result instanceof type.errors) {
    throw new TypeError(`Invalid ${label} data: ${result.summary}`, { cause: result });
  }

  return result;
}
