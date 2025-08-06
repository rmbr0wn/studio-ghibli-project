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

3. **Start the development servers**:

   **Backend (GraphQL Server)**:

   ```bash
   cd packages/backend
   pnpm dev
   ```

   The GraphQL server will start on `http://localhost:8080`

   **Frontend (React App)**:

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

## Development Workflow

This project follows the dev-tasks workflow. See `Studio_Ghibli_Take_Home_Challenge.md` for detailed development process requirements.
