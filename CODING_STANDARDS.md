# Coding standards

The rulebook for code in `apps/website`: follow every rule when writing code, check every rule when reviewing it. Where a rule differs from the `angular-developer` skill, the Angular MCP's `get_best_practices`, or generic Angular defaults, this file wins.

**Lint enforces** the rest, so this file leaves it out: OnPush, standalone, `inject()`, native control flow, `ngSrc`, signal inputs/outputs/queries, `providedIn`, the `app` selector prefix, string `styles`, template accessibility, Tailwind class conflicts (shared `@fabdeh/eslint-config`, set up in `apps/website/eslint.config.mjs`), and strict TypeScript (`tsconfig.json`). Run `pnpm nx lint website` rather than checking these by eye.

## Angular

### Runtime

- Keep component state in signals and derive from it with `computed()`. Why: the app is zoneless (`provideZonelessChangeDetection()`), so the view refreshes only when a signal changes.
- Reach browser-only APIs (`window`, `localStorage`, `matchMedia`) through the injected `DOCUMENT` (`document.defaultView`), and run that code in `afterNextRender` or behind `Platform.isBrowser`. Why: every component renders on the server first (SSR with `withEventReplay()` hydration). Pattern: `services/theme.ts`, initialised from `components/layout/layout.ts`.
- Read route params and query params as component `input()`s. Why: the router is set up with `withComponentInputBinding()` and `paramsInheritanceStrategy: 'always'`, so child routes also receive parent params.

### Components

- Put a component's logic, inline `template`, and inline `styles` in one `.ts` file.
- Declare host bindings and listeners in the decorator's `host` object.
- Build forms as Reactive forms.
- Write image `ngSrc` paths relative to the site root. Why: production builds serve images through `provideNetlifyLoader('https://dehopre.dev/')` (Netlify Image CDN); dev serves them unoptimised.

### Templates

- Bind dynamic classes and styles with `[class.x]` / `[style.x]`.
- Unwrap observables with the `async` pipe.

## Styling

### Tailwind v4

- Style in templates with utility classes; use a component's `styles` only for what utilities cannot express (e.g. `:host { display: contents; }`).
- Add theme tokens, plugins, and variants in `apps/website/src/styles.css` (`@theme`, `@plugin`, `@custom-variant`). Why: Tailwind v4 is configured CSS-first there, and the Tailwind lint rules read the same file.
- Put prose (`@tailwindcss/typography`) overrides in `apps/website/typography.js`, the one legacy JS config, loaded via `@config`.
- Put code-highlighting overrides in `apps/website/src/prism.css` (imported into the `components` layer).

### Dark mode

- Style dark variants with Tailwind's `dark:` prefix.
- Change the theme only through the `Theme` service (`apps/website/src/app/services/theme.ts`). Why: one `.dark` class on `<html>` drives both Tailwind (`@custom-variant dark`) and PrimeNG (`darkModeSelector: '.dark'`), and the service also persists the choice to `localStorage` and follows the system preference.

### PrimeNG

- Override PrimeNG component styles with Tailwind utilities. Why: PrimeNG sits in the `primeng` CSS layer, ordered `theme, base, primeng` (`app.config.ts`), so utilities win.
- Use PrimeNG theme tokens through their Tailwind utilities, exposed by the `tailwindcss-primeui` plugin.
