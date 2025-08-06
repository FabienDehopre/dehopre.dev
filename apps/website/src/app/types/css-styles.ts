import type { ConditionalExcept } from 'type-fest';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type -- we want to remove any method from the type
export type CssStyles = Partial<ConditionalExcept<CSSStyleDeclaration, Function>>;
