## Relevant Files

- `packages/frontend/src/modules/home/Home.tsx` - Main component for displaying the film buttons and cards.
- `packages/frontend/src/modules/home/Home.test.tsx` - Unit tests for the Home component.
- `packages/frontend/src/shared/styles/cardFlip.css` - CSS styles for 3D card flip animations.
- `packages/frontend/src/graphql/queries/index.ts` - GraphQL queries for fetching film data.
- `packages/frontend/src/graphql/gen/gql.ts` - Generated GraphQL hooks.
- `packages/frontend/src/shared/styles/global.ts` - Global styles for the application.
- `packages/frontend/src/shared/styles/theme/index.ts` - Theme configuration for Tailwind CSS.
- `packages/backend/src/schemaModules/ghibli/queries.ghibliSchema.ts` - GraphQL resolver for fetching film data.
- `packages/backend/src/schemaModules/ghibli/objectTypes.ghibliSchema.ts` - GraphQL schema for film data.
- `packages/backend/src/tests/queries.ghibliSchema.test.ts` - Unit tests for backend resolvers.
- `packages/backend/src/services/Http/Http.service.ts` - Service for making HTTP requests to the Studio Ghibli API.
- `packages/backend/src/services/GhibliApi/GhibliApi.service.ts` - Dedicated service for Studio Ghibli API interactions.
- `packages/backend/src/shared/constants.ts` - Backend constants including API endpoints and error messages.
- `packages/backend/src/tests/index.test.ts` - Unit tests for backend resolvers.
- `packages/frontend/src/tests/App.test.tsx` - Unit tests for frontend components.

### Notes

- Unit tests should be placed alongside the code files they are testing (e.g., `Home.tsx` and `Home.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [x] 1.0 Frontend: Create Film Buttons

  - [x] 1.1 Implement four buttons for the specified Studio Ghibli films.
  - [x] 1.2 Add loading states to buttons when fetching data.
  - [x] 1.3 Style buttons using Tailwind CSS.

- [x] 2.0 Frontend: Display Film Cards

  - [x] 2.1 Replace colored cards with film cards displaying movie image and title.
  - [x] 2.2 Implement interactive card flipping to reveal additional details.
  - [x] 2.3 Ensure cards reorganize into a single-column layout on mobile.
  - [x] 2.4 Add smooth animations for card flipping.

- [ ] 3.0 Backend: GraphQL Resolvers

  - [x] 3.1 Create resolvers to fetch data from the Studio Ghibli API.
  - [x] 3.2 Update the GraphQL schema to include required fields (title, description, director, release_date, running_time, rt_score, movie_banner, image).

- [ ] 4.0 Backend: API Integration

  - [ ] 4.1 Connect to the public Studio Ghibli API using Axios.
  - [ ] 4.2 Implement HTTP service for making API requests.

- [ ] 5.0 Testing
  - [ ] 5.1 Write unit tests for frontend components (buttons, cards).
  - [ ] 5.2 Write unit tests for backend resolvers and services.
  - [ ] 5.3 Test mobile responsiveness and touch interactions for card flipping.
