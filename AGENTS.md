<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project overview

Next.js 16 (App Router) workshop app with Better Auth, Prisma (MariaDB), Zustand state, and shadcn/ui components.

## Commands

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run lint` — ESLint (flat config, `eslint.config.mjs`)
- `npx prisma generate` — regenerate Prisma client into `generated/prisma/` (gitignored)
- `npx prisma migrate dev` — run migrations

## Key conventions

- **Path alias**: `@/*` → `src/*`
- **Prisma client** is imported from `generated/prisma/client` (NOT `@prisma/client`). After editing `prisma/schema.prisma`, run `npx prisma generate`.
- **PrismaMariaDb adapter** is used (not native Prisma driver). See `src/lib/prisma.ts`.
- **Auth** uses `better-auth` with Prisma adapter. Server-side: `src/lib/auth.ts`. Client-side: `src/lib/auth-client.ts`. API catch-all route: `src/app/api/auth/[...all]/route.ts`.
- **State** uses Zustand: `src/lib/cart-store.ts`.
- **UI components**: shadcn/ui (radix-rhea style, hugeicons library). Config in `components.json`. Add via `npx shadcn add <component>`.
- **Route groups**: `(auth)` for login/signup, `(front)` for public pages.
- **`.env`** contains DB credentials and auth secrets — do not commit. Prisma loads env via `import "dotenv/config"` in `prisma.config.ts`.
- **Next.js config** (`next.config.ts`): `cacheComponents: true`, remote image patterns for `fffuel.co` and `api.codingthailand.com`.

## Gotchas

- `generated/prisma/` is gitignored — always regenerate after schema changes.
- `next dev` auto-regenerates this `AGENTS.md` file. Don't fight it; commit the block as-is.
- No test suite is configured — there is no `test` script in package.json.
