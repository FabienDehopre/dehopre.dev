# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server
pnpm dev                    # Start dev server on http://localhost:5173
pnpm start                  # Alias for pnpm dev

# Building
pnpm build                  # Production build
pnpm watch                  # Development build with watch mode

# Testing
pnpm test                   # Run tests with Vitest
ng test                     # Alternative test command

# Linting
pnpm lint                   # Run ESLint with auto-fix
pnpm lint:check            # Run ESLint without auto-fix

# Deployment
pnpm preview               # Preview production build locally
pnpm deploy                # Deploy to Cloudflare Pages
pnpm cf-typegen           # Generate Cloudflare types
```

## Architecture Overview

### Framework Stack
- **Analog**: Angular's fullstack meta-framework
- **Angular 20**: Latest Angular with standalone components
- **Vite**: Build tool and dev server
- **Nitro**: Server-side rendering and API routes
- **Cloudflare Pages**: Deployment platform

### Routing System
- **File-based routing** using `@analogjs/router`
- Page components go in `src/app/pages/` with `*.page.ts` pattern
- Pages must export components as **default exports**
- API routes in `src/server/routes/` map to URL paths (e.g., `api/v1/hello.ts` → `/api/v1/hello`)

### Key Architectural Patterns
- **Standalone Components**: No NgModules, explicit imports required
- **OnPush Change Detection**: Used consistently for performance
- **Signal-based State**: Modern reactive patterns
- **SSR + Hydration**: Full-stack rendering with event replay
- **Type-safe APIs**: Server routes with h3 event handlers

### Project Structure
```
src/
├── app/
│   ├── app.config.ts          # Client app configuration
│   ├── app.config.server.ts   # Server app configuration
│   ├── app.ts                 # Root component with <router-outlet>
│   └── pages/                 # File-based routes (*.page.ts)
├── server/
│   └── routes/                # API endpoints
├── main.ts                    # Client entry point
└── main.server.ts            # Server entry point
```

### Development Notes
- **Package Manager**: pnpm (required)
- **Node Version**: >=20.19.1
- **ESLint Config**: Uses custom `@fabdeh/eslint-config`
- **Styling**: Tailwind CSS v4 with Vite plugin
- **Testing**: Vitest with jsdom environment

### Cloudflare Integration
- Uses `dev-bindings.ts` for local development
- Configured for Cloudflare Pages deployment
- Wrangler configuration in `wrangler.jsonc`