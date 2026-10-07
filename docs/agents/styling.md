# Styling

## Tailwind v4

- **Config is CSS-first** in `apps/website/src/styles.css` (`@theme`, `@plugin`, `@custom-variant`); add tokens and variants there. ESLint (`eslint-plugin-better-tailwindcss`) reads the same file as its entry point.
- **Prose typography** is the exception: `@tailwindcss/typography` overrides live in the legacy JS config `apps/website/typography.js`, loaded via `@config`.
- **Utilities first**: style in templates with utility classes; keep a component's inline `styles` for what utilities cannot express.

## Dark mode

One `.dark` class on `<html>` drives everything: Tailwind's `dark:` variant (`@custom-variant dark`) and PrimeNG's `darkModeSelector: '.dark'`. The `Theme` service (`apps/website/src/app/services/theme.ts`) toggles it and persists the choice to `localStorage`, falling back to the system preference.

## PrimeNG

- **Layer order**: PrimeNG styles sit in the `primeng` CSS layer, ordered `theme, base, primeng` (`app.config.ts`), so Tailwind utilities override PrimeNG component styles.
- **Tokens as utilities**: the `tailwindcss-primeui` plugin exposes PrimeNG theme tokens as Tailwind utilities.
- **Prism** code-highlighting styles are imported into the `components` layer.
