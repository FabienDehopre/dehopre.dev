# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This is an Nx monorepo with Angular applications. Use these commands for development:

```bash
# Development server
pnpm nx serve website

# Production build
pnpm nx build website

# Run tests
pnpm nx test website

# Run e2e tests
pnpm nx e2e website-e2e

# Lint code
pnpm nx lint website

# Cloudflare Workers development
pnpm nx cf-serve website

# Deploy to Cloudflare
pnpm nx cf-deploy website

# Generate Cloudflare types
pnpm nx cf-types website

# Show all available targets
pnpm nx show project website
```

## Architecture

### Tech Stack
- **Framework**: Angular v20+ with zoneless change detection
- **Build Tool**: Nx monorepo with Vite
- **Styling**: Tailwind CSS v4 with PrimeNG components and custom typography
- **Testing**: Vitest for unit tests, Playwright for e2e tests
- **Deployment**: Cloudflare Workers with SSR support
- **Package Manager**: pnpm

### Project Structure
- `apps/website/` - Main Angular application with SSR
- `apps/website-e2e/` - E2E tests using Playwright
- Main app source in `apps/website/src/app/`

### Angular Configuration
- Uses **zoneless change detection** (experimental)
- All components use **standalone architecture** (no NgModules)
- **OnPush change detection** strategy by default
- **Signals** for state management with `input()`, `output()`, and `computed()`
- **New control flow** (`@if`, `@for`, `@switch`) instead of structural directives
- **SSR enabled** with event replay for hydration

### Component Architecture
Components follow this structure:
- TypeScript file for logic using signals
- HTML file for templates with new control flow
- Inline styles preferred for small components
- Use `inject()` function instead of constructor injection
- Host bindings in `@Component` decorator's `host` object

### Styling System
- **Tailwind CSS v4** with custom theme configuration
- **PrimeNG** components with custom theme layer ordering
- Dark mode support via `.dark` class selector
- Custom typography configuration in `typography.ts`
- Component styles prefer utility classes over custom CSS

### Key Conventions
- Always use `changeDetection: ChangeDetectionStrategy.OnPush`
- Use `class` and `style` bindings instead of `ngClass`/`ngStyle`
- Prefer signals (`input()`, `output()`, `computed()`) over decorators
- Use `update()` or `set()` for signal modifications, never `mutate()`
- Import pipes explicitly when used in templates
- Use `NgOptimizedImage` for static images