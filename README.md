# NextJs-portal
## Local development (no Docker)

This repo supports two simple local workflows so you can develop and test all apps without Docker or nginx.

1) Start all apps in parallel (recommended)

```bash
# from the repo root (portal/)
corepack enable
corepack prepare pnpm@latest --activate
pnpm install

# start all apps in parallel (uses each app's dev script)
pnpm run dev:all
```

Each app will print its local URL and port (e.g. `http://localhost:5002`). During development the `basePath` is disabled for convenience (see note below), so you can open apps directly by port:

- Shell: http://localhost:5001/
- Home Estimation: http://localhost:5002/
- Home Market Analyser: http://localhost:5003/

2) Single host paths using a local proxy (optional)

If you prefer to use a single host path (like `/home-estimation`) without Docker/nginx, run the lightweight local proxy included in the repo.

```bash
# start the proxy (from portal/)
pnpm run proxy
# proxy listens on http://localhost:8080

# then open:
http://localhost:8080/shell/
http://localhost:8080/home-estimation/
http://localhost:8080/home-market-analyser/
```

The proxy is implemented in `local-proxy.js` and uses `express` + `http-proxy-middleware` to forward requests to each app's dev server.

3) Run apps individually

Open separate terminals and inside each app run:

```bash
# in portal/apps/home-estimation
pnpm dev

# in portal/apps/home-market-analyser
pnpm dev

# in portal/apps/shell
pnpm dev
```

Dev-specific basePath note
-------------------------
To make development easier you’ll notice the apps are configured so `basePath` is only applied in production. That means in dev you can open the app at the port root (e.g. `http://localhost:5002/`). In production we keep `basePath` so apps work correctly behind nginx or any reverse proxy.

If you prefer to always use the basePath in dev, change `apps/*/next.config.ts` and set `basePath` to the desired path.

Proxy vs Docker/nginx
---------------------
- The `local-proxy.js` is a development convenience and does the same path-based routing as the `nginx/default.conf` used by the Docker compose setup.
- If you want the full Docker setup (nginx gateway + apps), run:

```bash
docker compose up --build
```

Troubleshooting
---------------
- If a page returns Next's `/_not-found/page` or a 404, you likely requested the wrong path (missing basePath). Use the port + basePath or the proxy paths above.
- If ports are already in use, change the port in the app or free the port. Check running processes with `lsof -i :5002` (macOS).
- If TypeScript/IDE complains about `@shellapp/ui`, restart the TS server in your editor after running `pnpm install`. A minimal declaration file exists in `packages/ui/src/index.d.ts` to help the editor before installation.

Useful scripts
--------------
- `pnpm run dev:all` — run dev for all apps in parallel from the repo root.
- `pnpm run proxy` — start the local proxy at http://localhost:8080.
- `pnpm run startp` — (alias) run turbo to start apps in parallel (legacy from repo). Note: `dev:all` uses pnpm workspace runner directly.

If you'd like, I can add a single start script that launches the proxy and the dev servers together using `concurrently` or `tmux`.

### To add `@shellapp/ui` package into child apps
```
pnpm add @shellapp/ui --filter ./apps/shell
```

### To add a package inside packages/ui
```
pnpm add lodash --filter ./packages/ui
```
}
```

This will enable following apps:

- `shell` on port 3000
- `home-estimation` on port 3001
- `home-market-analyser` on port 3002

### Configure `basePath` for all child apps
```
// apps/home-estimation/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/home-estimation',
  output: 'standalone',
};

module.exports = nextConfig;
```
Above configuration is necessary for nginx to recognize the path and redirect to corresponding rule.

**Example**
```
apps/
├── shell/      → basePath: "/"
├── home-estimation/   → basePath: "/home-estimation"
├── home-market-analyser/    → basePath: "/home-market-analyser"

```

# Local Environment

### Activate pnpm via corepack (recommended) and install:

```
corepack enable
corepack prepare pnpm@latest --activate
pnpm install
```

### Start the dev server:
```
pnpm dev
```


To run the applications parallelly

```

pnpm install
pnpm run startp
```
This will start all the apps and you can access in 
- Shell `http://localhost:5001`
- Estimator `http://localhost:5002/home-estimation`
- Analyser `http://localhost:5003/home-market-analyer` 

---

### Commands

Creating apps
```
npx create-next-app@latest apps/home-estimation --app
npx create-next-app@latest apps/market --app

Turbo Repo
npx create-turbo@latest

```

### To Run the apps parallely (Dev Mode)
```
npm run startp
```

### To add `@shellapp/ui` package into child apps
```
pnpm add @shellapp/ui --filter ./apps/shell
```

### To add a package inside packages/ui
```
pnpm add lodash --filter ./packages/ui
```