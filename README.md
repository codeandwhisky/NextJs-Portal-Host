# NextJs-portal

# Approaches

## Monorepo(Single Application)

- All apps live under one roof
- Each app is created under `apps\` folder
- Consistent UI Components, leveraging shared components from `packages\ui`

```
/portal (Root Application, that holds all independent apps, shared components and libraries)
/portal/apps/home-estimation (Individual Application)
/portal/apps/home-market-analyser (Individual Application)
```

## Shell (MFE)
- Each app is independent
- Apps are hosted remotely
- Ex: app1: http://:5001, app2: http://:5002


## Approach

Use a reverse proxy for a modular, iframe-free, loosely coupled Next.js monorepo, especially for portals where:

- Teams own independent applications (home-estimation, analyser, accounts, loans)
- Apps can scale and deploy independently
- Unified UX can still be achieved via shared design system
- Each app lives in its own folder and gets its own subdomain or route path to run the app.
- Using reverse proxy, routing can be achieved.

`nginx.conf`
```
server {
  listen 80;
  server_name myportalapp.com;

  location / {
    proxy_pass http://localhost:5001; # portal app
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }

  location /home-estimation/ {
    rewrite ^/home-estimation(/.*)$ $1 break;
    proxy_pass http://localhost:5002; # home-estimation app
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }

  location /home-market-analyser/ {
    rewrite ^/home-market-analyser(/.*)$ $1 break;
    proxy_pass http://localhost:5003; # home-market-analyser app
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
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