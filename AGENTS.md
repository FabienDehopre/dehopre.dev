# AGENTS.md

Guidance for AI coding agents working in this repository.

## Development Commands

This is an Nx monorepo with an Angular (Analog) application. Use these commands for development:

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

# Show all available targets
pnpm nx show project website
```

## Architecture

### Tech Stack
- **Framework**: Angular v22 with zoneless change detection, built on Analog (file-based routing, content, SSR)
- **Build Tool**: Nx monorepo with Vite
- **Styling**: Tailwind CSS v4 with PrimeNG components and custom typography
- **Testing**: Vitest for unit tests, Playwright for e2e tests
- **Deployment**: Netlify with SSR support
- **Package Manager**: pnpm

### Project Structure
- `apps/website/` - Main Angular application with SSR
- `apps/website-e2e/` - E2E tests using Playwright
- `apps/website/src/app/` - Main app source (`components/`, `pages/`, `services/`, `types/`)
- `apps/website/src/app/pages/` - Analog file-based routes (`*.page.ts`)
- `apps/website/src/content/` - Markdown content

### Angular Configuration
- Uses **zoneless change detection** (`provideZonelessChangeDetection()`)
- All components use **standalone architecture** (no NgModules)
- **OnPush change detection** strategy everywhere
- **Signals** for state management with `input()`, `output()`, and `computed()`
- **New control flow** (`@if`, `@for`, `@switch`) instead of structural directives
- **SSR enabled** with event replay for hydration

### Styling System
- **Tailwind CSS v4** with custom theme configuration
- **PrimeNG** components with custom theme layer ordering
- Dark mode support via `.dark` class selector
- Custom typography configuration in `apps/website/typography.js`
- Component styles prefer utility classes over custom CSS

## Coding Guidelines

### Component Structure
Components are single-file: logic, template and styles live in the `.ts` file.
- Use inline `template` and inline `styles` (keep custom CSS minimal; prefer Tailwind utilities)
- Keep components small and focused on a single responsibility

Example:

```ts
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-server-status',
  template: `
    <section class="flex flex-col items-center">
      @if (isServerRunning()) {
        <span>Yes, the server is running</span>
      } @else {
        <span>No, the server is not running</span>
      }
      <button class="mt-2" (click)="toggleServerStatus()">Toggle Server Status</button>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerStatus {
  protected readonly isServerRunning = signal(true);

  toggleServerStatus() {
    this.isServerRunning.update((isServerRunning) => !isServerRunning);
  }
}
```

### TypeScript
- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

### Angular
- Always use standalone components over `NgModules`
- Do NOT set `standalone: true` inside the `@Component`, `@Directive` and `@Pipe` decorators (it is the default)
- Always set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component`
- Use `input()` and `output()` functions instead of `@Input()`/`@Output()` decorators
- Use `computed()` for derived state
- Do NOT use the `@HostBinding` and `@HostListener` decorators; put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images
- Implement lazy loading for feature routes
- Prefer Reactive forms over Template-driven ones

### State Management
- Use signals for local component state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals; use `update` or `set` instead

### Templates
- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Do NOT use `ngClass` / `ngStyle`; use `class` and `style` bindings instead
- Use the async pipe to handle observables
- Import pipes explicitly when they are used in a template

### Services
- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

### Resources
- https://angular.dev/style-guide
- https://angular.dev/essentials/components
- https://angular.dev/essentials/signals
- https://angular.dev/essentials/templates
- https://angular.dev/essentials/dependency-injection

<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- You have access to the Nx MCP server and its tools, use them to help the user
- When answering questions about the repository, use the `nx_workspace` tool first to gain an understanding of the workspace architecture where applicable.
- When working in individual projects, use the `nx_project_details` mcp tool to analyze and understand the specific project structure and dependencies
- For questions around nx configuration, best practices or if you're unsure, use the `nx_docs` tool to get relevant, up-to-date docs. Always use this instead of assuming things about nx configuration
- If the user needs help with an Nx configuration or project graph error, use the `nx_workspace` tool to get any errors

<!-- nx configuration end-->
