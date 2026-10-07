# AGENTS.md

Nx monorepo (pnpm) holding one Angular v22 app, `website`, built on Analog: file-based routes in `apps/website/src/app/pages/*.page.ts`, Markdown content in `apps/website/src/content/`, SSR deployed to Netlify. Playwright e2e lives in `website-e2e`.

## Running tasks

Run every task through Nx (`nx run`, `nx run-many`, `nx affected`), never the underlying tool:

```bash
pnpm nx serve website
pnpm nx e2e website-e2e
pnpm nx show project website   # list all targets
```

Answer Nx configuration questions from the `nx_docs` MCP tool, not memory.

## Disclosed guidance

- **Angular** code (components, templates, services, routes): read [`docs/agents/angular.md`](docs/agents/angular.md) first; its conventions override generic Angular defaults.
- **Styling** (Tailwind classes, PrimeNG theming, dark mode, prose typography): read [`docs/agents/styling.md`](docs/agents/styling.md) first.
