# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Nx monorepo containing an Angular SSR website built with modern tooling including:
- Angular 20+ with SSR support
- Tailwind CSS with PrimeNG UI components
- Vite for build tooling and testing
- Cloudflare Workers for deployment
- TypeScript throughout

## Development Commands

### Core Development
- `pnpm nx serve website` - Start development server
- `pnpm nx build website` - Build for production
- `pnpm nx test website` - Run unit tests
- `pnpm nx lint website` - Run ESLint
- `pnpm nx e2e website-e2e` - Run Playwright e2e tests

### Cloudflare Workers
- `pnpm nx cf-types website` - Generate Cloudflare Worker types
- `pnpm nx cf-serve website` - Serve with Cloudflare Workers locally (requires build first)
- `pnpm nx cf-deploy website` - Deploy to Cloudflare Workers

### Project Management
- `pnpm nx show project website` - Show all available targets for the website project
- `pnpm nx graph` - Visualize project dependencies

## Architecture

### Project Structure
- `apps/website/` - Main Angular application with SSR
- `apps/website-e2e/` - Playwright e2e tests
- Uses Nx project configuration in `project.json` files

### Key Technologies
- **Framework**: Angular with standalone components (OnPush change detection by default)
- **Styling**: Tailwind CSS + PrimeNG components + custom typography
- **Testing**: Vitest for unit tests, Playwright for e2e, Angular Testing Library
- **Build**: Angular Build + Vite
- **Deployment**: Cloudflare Workers with SSR

### Component Architecture
- Standalone components using OnPush change detection
- Component structure follows feature-based organization under `apps/website/src/app/`
- Layout components (header, footer) are separate from page components
- Services handle business logic (menu, SEO, theme)
- Types are centralized in `apps/website/src/app/types/`

### Styling Approach
- Inline styles preferred (configured in nx.json generators)
- Tailwind CSS as primary styling framework
- PrimeNG for UI components with custom theme integration
- Typography configuration in separate file

## Testing Strategy
- Unit tests use Vitest with Angular Testing Library
- E2e tests use Playwright
- Test files follow `*.spec.ts` convention
- Test setup configured in `src/test-setup.ts`

## Key Configuration Files
- `nx.json` - Nx workspace configuration with custom executors for Cloudflare
- `apps/website/project.json` - Website project configuration
- `apps/website/vite.config.mts` - Vite configuration for build and testing
- `apps/website/wrangler.jsonc` - Cloudflare Workers configuration

## Development Notes
- Package manager: pnpm
- The main application is SSR-enabled with server-side rendering
- Components use inline templates and styles by default
- Project uses Nx's flat ESLint configuration