# ensure pnpm is active (you already did this earlier)
corepack enable
corepack prepare pnpm@latest --activate

# install (if not yet done)
# pnpm install

# start all workspace dev scripts in parallel (runs `dev` in each package)
pnpm -w -r --parallel run dev