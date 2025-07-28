export type MetaInfo = { title: string; description: string };

export function isMetaInfo(value: unknown): value is MetaInfo {
  return typeof value === 'object' &&
    value !== null &&
    'title' in value &&
    typeof value.title === 'string' &&
    'description' in value &&
    typeof value.description === 'string';
}
