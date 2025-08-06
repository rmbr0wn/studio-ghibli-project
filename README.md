# Studio Ghibli Project

> A React + GraphQL application showcasing Studio Ghibli films. This monorepo contains both frontend and backend packages managed through [lerna](https://github.com/lerna/lerna).

## Getting Started

### Prerequisites

Ensure you have Node.js version 20.11 installed:

```bash
nvm install 20.11
nvm use
```

The `.nvmrc` file in the root of this project will default to node 20.11 if you run `nvm use`.
Confirm your Node.js version by running `node --version`.

### Install pnpm

This project uses pnpm for package management. Install it by following the [pnpm installation instructions](https://pnpm.io/installation).

### Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone <your-fork-url>
   cd studio-ghibli-project
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

   We use [pnpm workspaces](https://pnpm.io/workspaces) for dependency sharing between packages.

3. **Copy .env.example values into .env file**:

   ```bash
   cp ./packages/backend/.env.example ./packages/backend/.env
   cp ./packages/frontend/.env.example ./packages/frontend/.env
   ```

4. **Start the development servers**:

- **Backend (GraphQL Server)**:

  ```bash
  cd packages/backend
  pnpm dev
  ```

  The GraphQL server will start on `http://localhost:8080`

- **Frontend (React App)**:

  ```bash
  cd packages/frontend
  pnpm dev
  ```

  The React app will start on `http://localhost:3000`

## Project Structure

- `packages/backend/` - GraphQL server with Apollo Server
- `packages/frontend/` - React application with Apollo Client

## Available Scripts

### Backend

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm test` - Run tests

### Frontend

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm test` - Run tests

## GraphQL Code Generation

This project uses GraphQL Code Generation with the client preset to create TypeScript types and typed GraphQL operations.

### Using Codegen

1. **Write GraphQL operations** in TypeScript files within `src/graphql/queries/` or `src/graphql/mutations/` directories
2. **Generate types and utilities**:
   ```bash
   cd packages/frontend
   pnpm codegen
   ```
3. **Import and use the generated `gql` function** in your components:

   ```typescript
   import { GET_FILM } from '~/graphql/queries';
   import { useQuery } from '@apollo/client';

   const { data, loading, error } = useQuery(GET_FILM);
   ```

### Codegen Configuration

The codegen configuration in `codegen.ts` uses:

- **Schema**: `../backend/schema.graphql` (local schema file)
- **Documents**: `./src/graphql/mutations/*.ts` and `./src/graphql/queries/*.ts`
- **Output**: `./src/graphql/gen/` (generated files directory)
- **Preset**: `client` (provides type-safe GraphQL operations)

### File Structure

```
src/graphql/
├── gen/           # Generated files (do not edit)
│   ├── gql.ts     # Generated gql function
│   ├── graphql.ts # Generated types
│   └── index.ts   # Exports
├── queries/       # GraphQL query operations
│   └── index.ts
└── mutations/     # GraphQL mutation operations
```

### Workflow

1. Write your GraphQL queries/mutations in TypeScript files under `src/graphql/queries/` or `src/graphql/mutations/`
2. Run `pnpm codegen` to generate typed GraphQL utilities
3. Import the `gql` function from `~/graphql/gen` and use it with your operations
4. TypeScript will provide full type safety for your GraphQL operations

## Development Workflow

This project follows the dev-tasks workflow. See `Studio_Ghibli_Take_Home_Challenge.md` for detailed development process requirements.
