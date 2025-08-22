# Product Requirements Document: Studio Ghibli Film Application

## Introduction/Overview

The Studio Ghibli Film Application is a responsive React application that displays information about four Studio Ghibli films. The application integrates with a GraphQL backend that acts as a proxy server to fetch data from the public Studio Ghibli API. The goal is to provide users with an interactive and visually appealing way to explore Studio Ghibli films.

## Goals

1. Create a responsive React application that works seamlessly on desktop and mobile devices.
2. Integrate with a GraphQL backend to fetch film data from the Studio Ghibli API.
3. Provide an engaging user experience with interactive film cards and smooth animations.
4. Ensure the application is visually appealing and adheres to modern design principles.

## User Stories

1. As a user, I want to see buttons for four Studio Ghibli films so that I can select a film to learn more about.
2. As a user, I want to see a loading state when I click a button so that I know the application is fetching data.
3. As a user, I want to see detailed information about a film on a card after selecting it so that I can learn more about the film.
4. As a user, I want the film cards to flip on hover (desktop) or click (mobile) so that I can view additional details.
5. As a user, I want the application to work well on my mobile device so that I can explore films on the go.

## Functional Requirements

### Frontend

1. Display four buttons for the specified Studio Ghibli films:
   - Porco Rosso (ID: ebbb6b7c-945c-41ee-a792-de0e43191bd8)
   - Kiki's Delivery Service (ID: ea660b10-85c4-4ae3-8a5f-41cea3648e3e)
   - Howl's Moving Castle (ID: cd3d059c-09f4-4ff3-8d63-bc765a5184fa)
   - My Neighbor Totoro (ID: 58611129-2dbc-4a81-a72f-77ddfc1b1b49)
2. Implement loading states for buttons when fetching data.
3. Use GraphQL hooks (e.g., useQuery, useLazyQuery) generated via codegen to fetch film data.
4. Replace colored cards with film cards displaying:
   - Movie image
   - Movie title
5. Implement interactive cards that flip to reveal:
   - Movie banner
   - Description
   - Director
   - Release date
   - Runtime
   - Rotten Tomatoes score
6. Ensure mobile responsiveness:
   - Cards reorganize into a single-column layout on mobile.
   - Application functions properly down to a width of 320px.
   - Touch interactions work smoothly for card flipping.

### Backend

1. Create GraphQL resolvers to fetch data from the Studio Ghibli API.
2. Update the GraphQL schema (objectTypes) to include the following fields:
   - title
   - description
   - director
   - release_date
   - running_time
   - rt_score
   - movie_banner
   - image
3. Connect to the public Studio Ghibli API to retrieve film information.

## Non-Goals (Out of Scope)

1. Authentication.
2. Data persistence.
3. Caching.
4. Error handling for API downtime or invalid film IDs.

## Design Considerations

1. Use Tailwind CSS for styling.
2. Follow the attached mockups for card designs and animations.
3. Implement smooth flip animations for interactive cards.

## Technical Considerations

1. Use a monorepo structure for the frontend and backend.
2. Use Apollo Server for the GraphQL backend.
3. Generate GraphQL hooks using codegen.

## Success Metrics

1. The application is fully functional and visually appealing on both desktop and mobile devices.
2. Users can interact with film cards and view detailed information without errors.
3. The application meets the specified design and functional requirements.

## Open Questions

None at this time.
