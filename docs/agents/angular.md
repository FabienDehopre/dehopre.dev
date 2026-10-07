# Angular conventions

Repo-specific conventions for `apps/website`. Where they differ from the `angular-developer` skill or generic Angular defaults, these win.

## Runtime

- **Zoneless**: `provideZonelessChangeDetection()`, no zone.js. UI updates only when a signal (or an explicit `markForCheck`) says so; keep component state in signals.
- **SSR with hydration**: `provideClientHydration(withEventReplay(), withNoIncrementalHydration())`. Every component renders on the server first, so reach browser-only APIs (`window`, `localStorage`, `matchMedia`) through `DOCUMENT` and `afterNextRender`, as `services/theme.ts` does.
- **Router**: Analog file router with `withComponentInputBinding()`, so route params and query params arrive as component `input()`s.

## Components

- **Single-file**: logic, inline `template` and inline `styles` all live in the `.ts` file; keep `styles` minimal and style with Tailwind utilities (see [`styling.md`](styling.md)).
- **Signal APIs**: `input()`, `output()`, `computed()`.
- **Host bindings** go in the decorator's `host` object (in place of `@HostBinding` / `@HostListener`).
- **Dependencies** come from `inject()`.
- **Forms** are Reactive forms.
- **Images** use `NgOptimizedImage`; production builds serve them through `provideNetlifyLoader('https://dehopre.dev/')`.

## Templates

- **Control flow**: `@if`, `@for`, `@switch`.
- **Dynamic classes and styles**: `[class.x]` / `[style.x]` bindings (in place of `ngClass` / `ngStyle`).
- **Observables**: unwrap with the `async` pipe.
