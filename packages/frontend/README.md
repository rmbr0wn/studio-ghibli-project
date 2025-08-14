# Frontend

## Overview

React + TypeScript + Vite app using Apollo Client. It queries the local GraphQL backend for Studio Ghibli film data.

## Prerequisites

- pnpm 8+
- Node 18+

## Environment

Create `packages/frontend/.env` with:

```
VITE_GRAPHQL_URL=http://localhost:8080/api/graphql
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
pnpm --filter frontend <script>
```

- Or from the package directory:

```
cd packages/frontend
pnpm <script>
```

## Codegen (GraphQL types and hooks)

Generate typed operations and React hooks from the backend schema:

- From repo root:

```
pnpm --filter frontend codegen
```

- Or from the package directory:

```
cd packages/frontend
pnpm codegen
```

Watch mode during development:

- From repo root:

```
pnpm --filter frontend codegen:watch
```

- Or from the package directory:

```
cd packages/frontend
pnpm codegen:watch
```

## Run (development)

Start the Vite dev server (served on port 3000):

- From repo root:

```
pnpm --filter frontend dev
```

- Or from the package directory:

```
cd packages/frontend
pnpm dev
```

- App URL: `http://localhost:3000`
- Ensure the backend is running at `http://localhost:8080/api/graphql` (see backend README).

## Scripts

For each script, you can use either form:

- **dev**
  - Root: `pnpm --filter frontend dev`
  - cd: `cd packages/frontend && pnpm dev`
- **build**
  - Root: `pnpm --filter frontend build`
  - cd: `cd packages/frontend && pnpm build`
- **codegen**
  - Root: `pnpm --filter frontend codegen`
  - cd: `cd packages/frontend && pnpm codegen`
- **codegen:watch**
  - Root: `pnpm --filter frontend codegen:watch`
  - cd: `cd packages/frontend && pnpm codegen:watch`
- **lint**
  - Root: `pnpm --filter frontend lint`
  - cd: `cd packages/frontend && pnpm lint`
- **test**
  - Root: `pnpm --filter frontend test`
  - cd: `cd packages/frontend && pnpm test`
- **preview**
  - Root: `pnpm --filter frontend preview`
  - cd: `cd packages/frontend && pnpm preview`
