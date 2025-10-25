#!/usr/bin/env bash
# ensure pnpm is active (you already did this earlier)
corepack enable
corepack prepare pnpm@latest --activate

# install (if not yet done)
# pnpm install

# Start local proxy in the background so all apps can be accessed under a single host path
# (proxy listens on http://localhost:8080 by default)
echo "Starting local proxy (background)..."
pnpm run proxy &
PROXY_PID=$!
echo "Local proxy started with PID $PROXY_PID"

# start all workspace dev scripts in parallel (runs `dev` in each package)
echo "Starting all apps (pnpm workspace runner)..."
# pnpm -w -r --parallel run dev
pnpm dev

# When dev runner exits, kill the background proxy to clean up
# echo "Dev runner exited, stopping local proxy (PID $PROXY_PID)"
# kill $PROXY_PID 2>/dev/null || true
# echo "Done."