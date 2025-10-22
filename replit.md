# LearnHub - E-Learning Platform

## Overview

LearnHub is a modern e-learning platform that enables users to discover and access online courses across various subjects including technology, business, design, and data science. The platform features a clean, educational-focused design inspired by successful e-learning platforms like Coursera, Udemy, and Khan Academy. The application provides course browsing, detailed course views, user authentication, and a responsive interface optimized for both desktop and mobile devices.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server, providing fast HMR and optimized production builds
- **Wouter** for client-side routing instead of React Router, offering a lightweight navigation solution
- **React Query (TanStack Query)** for server state management, data fetching, and caching

**UI Component System**
- **shadcn/ui** component library built on Radix UI primitives, providing accessible, unstyled components
- **Tailwind CSS** for utility-first styling with custom design tokens
- **Class Variance Authority (CVA)** for component variant management
- Custom design system with defined color schemes, typography scales, and spacing primitives

**Design Philosophy**
- Reference-based design approach drawing from established e-learning platforms
- Emphasis on educational clarity, trust, professionalism, and engagement
- Consistent spacing using Tailwind units (4, 6, 8, 12, 16, 20, 24)
- Typography using Inter/DM Sans from Google Fonts with defined heading and body text scales
- Responsive layout with max-width containers (max-w-7xl for main content, max-w-6xl for course grids)

### Backend Architecture

**Server Framework**
- **Express.js** HTTP server with custom middleware for logging and JSON parsing
- **TypeScript** throughout the backend for type safety
- Custom Vite integration for development with HMR support
- Session-based architecture preparation (connect-pg-simple for session storage)

**Data Layer**
- **In-memory storage** currently implemented via `MemStorage` class for development
- Interface-based storage abstraction (`IStorage`) allowing easy migration to database persistence
- Prepared for **Drizzle ORM** integration with PostgreSQL (configuration already in place)
- Schema definition using Drizzle with Zod validation

**API Design**
- RESTful API structure with `/api` prefix for all backend routes
- Request/response logging middleware with timing metrics
- JSON body parsing with raw body capture for webhook support
- Error handling with structured responses

### Authentication & Authorization

**Current Implementation**
- Mock authentication flow in UI components (Login/Register pages)
- User schema defined with username/password fields
- UUID-based user identification
- Placeholder for session management via connect-pg-simple

**Planned Approach**
- Session-based authentication using Express sessions
- PostgreSQL session store for persistence
- Password hashing required for production (not currently implemented)
- Protected routes and authentication state management via React Query

### State Management Strategy

**Client State**
- React Query for all server state (user data, course data, authentication status)
- Local component state via React hooks for UI-specific state
- Toast notifications via custom useToast hook and Radix UI Toast components
- No global state management library (Redux/Zustand) - relying on React Query and React Context

**Data Fetching Patterns**
- Centralized `apiRequest` utility for all API calls
- Custom `getQueryFn` factory for React Query integration
- Configurable unauthorized behavior (returnNull vs throw)
- Infinite stale time by default with manual refetch control

### Routing Structure

**Current Routes**
- `/` - Landing page with hero section and featured courses
- `/login` - User login page
- `/register` - User registration page
- `/courses` - Course catalog with search functionality
- `/course/:id` - Individual course detail page
- `*` - 404 Not Found fallback

**Navigation Pattern**
- Fixed top navigation bar with logo, main links, and auth buttons
- Responsive mobile menu using Sheet component
- Active route highlighting
- Programmatic navigation via Wouter's useLocation hook

### Data Schema

**Users Table** (PostgreSQL via Drizzle)
```typescript
{
  id: varchar (UUID primary key, auto-generated)
  username: text (unique, not null)
  password: text (not null)
}
```

**Validation**
- Zod schemas derived from Drizzle tables via `createInsertSchema`
- Type inference for both insert operations and select results
- Shared schema definitions between client and server via `@shared` alias

### Development Workflow

**Path Aliases**
- `@/` → `client/src/` for frontend code
- `@shared/` → `shared/` for code shared between client and server
- `@assets/` → `attached_assets/` for static assets

**Build Process**
- Development: `tsx` for running TypeScript server directly with `NODE_ENV=development`
- Production build: Vite builds client, esbuild bundles server into ESM format
- Type checking: Standalone `tsc` check command (noEmit mode)
- Database migrations: Drizzle Kit push command

**Development Tools**
- Replit-specific plugins for error overlays, cartographer, and dev banner
- Hot module replacement in development
- TypeScript incremental compilation with build info caching

## External Dependencies

### Core Dependencies

**UI & Styling**
- `@radix-ui/*` - Comprehensive suite of accessible, unstyled UI primitives (accordion, dialog, dropdown, popover, tabs, toast, tooltip, and 15+ others)
- `tailwindcss` - Utility-first CSS framework
- `class-variance-authority` - Type-safe component variants
- `clsx` / `tailwind-merge` - Conditional className utilities
- `lucide-react` - Icon library
- `embla-carousel-react` - Carousel/slider component

**Forms & Validation**
- `react-hook-form` - Form state management and validation
- `@hookform/resolvers` - Resolver integration for validation libraries
- `zod` - Schema validation library
- `drizzle-zod` - Zod schema generation from Drizzle tables

**Data Fetching & State**
- `@tanstack/react-query` - Server state management and data synchronization
- `wouter` - Lightweight client-side routing

**Backend Framework**
- `express` - HTTP server framework
- `connect-pg-simple` - PostgreSQL session store for Express sessions

**Database & ORM**
- `drizzle-orm` - TypeScript ORM for SQL databases
- `drizzle-kit` - CLI for schema migrations and management
- `@neondatabase/serverless` - Serverless PostgreSQL driver (Neon Database)

**Build Tools**
- `vite` - Frontend build tool and dev server
- `@vitejs/plugin-react` - React plugin for Vite
- `esbuild` - JavaScript bundler for server code
- `tsx` - TypeScript execution for development
- `typescript` - TypeScript compiler and type checking

**Development Tools**
- `@replit/vite-plugin-runtime-error-modal` - Error overlay for Replit
- `@replit/vite-plugin-cartographer` - Replit development tools
- `@replit/vite-plugin-dev-banner` - Development environment banner

### Third-Party Services

**Database**
- **Neon Database** (PostgreSQL) - Serverless PostgreSQL configured via `DATABASE_URL` environment variable
- Connection via `@neondatabase/serverless` driver for serverless/edge compatibility

**Fonts**
- **Google Fonts** - Inter, DM Sans, Architects Daughter, Fira Code, Geist Mono for typography

**Asset Storage**
- Static assets stored locally in `attached_assets/generated_images/` directory
- Course thumbnails and hero images included in bundle

### Environment Configuration

**Required Environment Variables**
- `DATABASE_URL` - PostgreSQL connection string (required for database operations)
- `NODE_ENV` - Environment flag (development/production)
- `REPL_ID` - Replit environment identifier (for dev tooling)