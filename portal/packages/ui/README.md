# @shellapp/ui

This package is the shared UI component library for the monorepo. It re-exports components from `src/` so apps can import from the package root or via explicit subpaths.

Exports (available):

- `ShellContainer` — layout wrapper component
- `MainNavigation` — top navigation
- `Button`, `Card`, `Code` — small UI primitives

Recommended usage from apps:

```tsx
import { ShellContainer } from "@shellapp/ui";

export default function Page() {
  return (
    <ShellContainer title="My App" subtitle="Welcome">
      {/* app content */}
    </ShellContainer>
  );
}
```

Notes and troubleshooting

- This package uses `src/*.tsx` files directly in the monorepo. Ensure you use `pnpm install` at the repo root to correctly wire workspace packages. If you run `npm install` in `portal/` you may see `EUNSUPPORTEDPROTOCOL` because child apps refer to `workspace:` protocol.

- If your TypeScript tooling complains about missing types for `@shellapp/ui`, ensure your IDE/TS server is using the workspace `node_modules` (restart TS server) and that `pnpm install` completed successfully.

- Subpath imports such as `@shellapp/ui/shell-container` are exported in `package.json` but simpler imports from the package root are recommended.
