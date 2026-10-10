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
- Change the theme only through the `Theme` service (`apps/website/src/app/services/theme.ts`). Why: one `.dark` class on `<html>` drives both Tailwind (`@custom-variant dark`) and the spartan theme variables (`:root.dark` in `styles.css`), and the service also persists the choice to `localStorage` and follows the system preference.

### spartan/ui

The UI component library is [spartan/ui](https://www.spartan.ng): headless primitives from `@spartan-ng/brain` (npm), styled by Helm components that the CLI copies into `libs/ui` and the app imports as `@spartan-ng/helm/<component>`.

- Reach for a spartan component before hand-rolling an interactive widget (dialog, menu, popover, …), and compose it from its Helm pieces (`HlmDialogImports`, `hlmBtn`, …). Why: Brain owns focus management, keyboard handling and ARIA.
- Add components with `pnpm nx g @spartan-ng/cli:ui --name=<component>`; after upgrading `@spartan-ng/*`, run `pnpm nx g @spartan-ng/cli:healthcheck`. Why: `components.json` keeps the Helm code in `libs/ui` and the `@spartan-ng/helm/*` paths in `tsconfig.base.json`.
- Keep `libs/ui` in spartan's own style; do not apply this file's rules there. Why: it is generated code, linted with the Nx Angular presets (`libs/ui/eslint.config.mjs`), and staying close to upstream keeps regeneration and `healthcheck` painless. Record any deliberate change to a Helm file in `libs/ui/README.md`.
- Style a component instance by passing utility classes on its host; Helm merges them with `hlm()` (tailwind-merge), so yours win. Change a Helm file only when every use should change.
- Give every dialog or sheet a title (`hlmDialogTitle`, visually hidden with `sr-only` if the design has none).
- Render icons with `<ng-icon>` from `@ng-icons/lucide`, registered in the component's `providers` with `provideIcons(...)`, and size them with a font-size utility (`text-[length:--spacing(4)]`).
- Keep `@source "../../../libs/ui"` in `apps/website/src/styles.css`. Why: Tailwind only scans the app by default, so without it the Helm classes are never generated.
- Theme tokens (`bg-background`, `text-muted-foreground`, …) come from the zinc theme in `styles.css` and flip with `.dark`; use them inside spartan components, while the site's own layout keeps its `zinc-*` palette with `dark:` variants.
