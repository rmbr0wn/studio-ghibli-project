# Backend

GraphQL (Apollo Server) + Express backend that proxies the public Studio Ghibli API.

## Prerequisites

- pnpm 8+
- Node 18+

## Environment

Create `packages/backend/.env` with:

```
LOG_LEVEL=info
NODE_ENV=development
PORT=8080
GRAPHQL_PATH=/api/graphql
```

## Install

From the repository root:

```
pnpm install
```

## Running commands

You can run scripts from the repo root using filters, or by changing directories:

- From repo root with filters:

```
pnpm --filter backend <script>
```

- Or from the package directory:

```
cd packages/backend
pnpm <script>
```

## Generate schema types

Generate Nexus schema/types:

- From repo root:

```
pnpm --filter backend generate
```

- Or from the package directory:

```
cd packages/backend
pnpm generate
```

## Run (development)

Start the dev server with nodemon:

- From repo root:

```
pnpm --filter backend dev
```

- Or from the package directory:

```
cd packages/backend
pnpm dev
```

- GraphQL endpoint: `http://localhost:8080/api/graphql`
- Health check: `http://localhost:8080/healthz`

## Scripts

For each script, you can use either form:

- **dev**
  - Root: `pnpm --filter backend dev`
  - cd: `cd packages/backend && pnpm dev`
- **generate**
  - Root: `pnpm --filter backend generate`
  - cd: `cd packages/backend && pnpm generate`
- **build**
  - Root: `pnpm --filter backend build`
  - cd: `cd packages/backend && pnpm build`
- **lint**
  - Root: `pnpm --filter backend lint`
  - cd: `cd packages/backend && pnpm lint`
- **test**
  - Root: `pnpm --filter backend test`
  - cd: `cd packages/backend && pnpm test`

## Notes

- This server acts as a minimal proxy to the Studio Ghibli API. No persistence or caching is required.
