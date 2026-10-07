# AGENTS.md

Guidance for AI coding agents working in this repository.

## Development Commands

This is an Nx monorepo with an Angular (Analog) application. Always run tasks through Nx (`nx run`, `nx run-many`, `nx affected`) rather than the underlying tooling:

```bash
pnpm nx serve website
pnpm nx e2e website-e2e

# Show all available targets
pnpm nx show project website
```

## Architecture

### Tech Stack
- **Framework**: Angular v22, built on Analog (file-based routing, content, SSR)
- **Build Tool**: Nx monorepo with Vite
- **Styling**: Tailwind CSS v4 with PrimeNG components and custom typography
- **Testing**: Vitest for unit tests, Playwright for e2e tests
- **Deployment**: Netlify with SSR support
- **Package Manager**: pnpm

### Project Structure
- `apps/website/src/app/pages/` - Analog file-based routes (`*.page.ts`)
- `apps/website/src/content/` - Markdown content

### Angular Configuration
- Uses **zoneless change detection** (`provideZonelessChangeDetection()`)
- **SSR enabled** with event replay for hydration

### Styling System
- **PrimeNG** components with custom theme layer ordering
- Dark mode support via `.dark` class selector
- Custom typography configuration in `apps/website/typography.js`

## Coding Guidelines

### Component Structure
Components are single-file: logic, template and styles live in the `.ts` file.
- Use inline `template` and inline `styles` (keep custom CSS minimal; prefer Tailwind utilities)

### Angular
- Use `input()` and `output()` functions instead of `@Input()`/`@Output()` decorators
- Do NOT use the `@HostBinding` and `@HostListener` decorators; put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images
- Prefer Reactive forms over Template-driven ones

### Templates
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Do NOT use `ngClass` / `ngStyle`; use `class` and `style` bindings instead
- Use the async pipe to handle observables

### Services
- Use the `inject()` function instead of constructor injection

# General Guidelines for working with Nx

- When answering questions about the repository, use the `nx_workspace` tool first to gain an understanding of the workspace architecture where applicable.
- For questions around nx configuration, best practices or if you're unsure, use the `nx_docs` tool to get relevant, up-to-date docs. Always use this instead of assuming things about nx configuration
