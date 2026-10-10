# ui-helm

[spartan/ui](https://www.spartan.ng) Helm components (the styled layer on top of `@spartan-ng/brain`), copied into the workspace by the spartan CLI and imported as `@spartan-ng/helm/<component>`.

Add a component with `pnpm nx g @spartan-ng/cli:ui --name=<component>`; after upgrading `@spartan-ng/*`, run `pnpm nx g @spartan-ng/cli:healthcheck`. The code keeps spartan's conventions, so it is linted with the Nx Angular presets rather than `@fabdeh/eslint-config` (see `eslint.config.mjs`).

Local customisations:

- `dialog/src/lib/hlm-dialog-overlay.ts`: the backdrop uses the site's colours (`bg-zinc-800/40`, `dark:bg-black/80`).
