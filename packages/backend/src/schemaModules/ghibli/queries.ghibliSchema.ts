import { stringArg, nonNull, extendType, list } from 'nexus';
import { HelloWorld, Film } from './objectTypes.ghibliSchema';
import { GraphQLError } from 'graphql';
import { GQL_ERROR_CODES, ErrorMessages } from '~/shared/constants';
import { getHelloWorld } from '~/shared/utils';
import { GhibliApiService } from '~/services/GhibliApi/GhibliApi.service';

export const TourQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('helloWorld', {
      type: nonNull(HelloWorld),
      resolve: async () => {
        try {
          const helloWorld = getHelloWorld();
          return helloWorld;
        } catch (error) {
          // Re-throw GraphQL errors as-is for proper client handling
          if (error instanceof GraphQLError) {
            throw error;
          }

          // Throw a generic error for unexpected errors
          throw new GraphQLError(ErrorMessages.ServerError, {
            extensions: { code: GQL_ERROR_CODES.SERVER_ERROR },
          });
        }
      },
    });
  },
});

export const GhibliQueries = extendType({
  type: 'Query',
  definition(t) {
    // Query for a single film by ID
    t.field('film', {
      type: nonNull(Film),
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_, { id }) => {
        try {
          const ghibliApiService = new GhibliApiService();
          const filmData = await ghibliApiService.getFilmById(id);
          return filmData;
        } catch (error) {
          // Re-throw GraphQL errors as-is for proper client handling
          if (error instanceof GraphQLError) {
            throw error;
          }

          // Throw a generic error for unexpected errors
          throw new GraphQLError(ErrorMessages.ServerError, {
            extensions: { code: GQL_ERROR_CODES.SERVER_ERROR },
          });
        }
      },
    });

    // Query for all films (useful for testing and future features)
    t.field('films', {
      type: nonNull(list(nonNull(Film))),
      resolve: async () => {
        try {
          const ghibliApiService = new GhibliApiService();
          const filmsData = await ghibliApiService.getAllFilms();
          return filmsData;
        } catch (error) {
          // Re-throw GraphQL errors as-is for proper client handling
          if (error instanceof GraphQLError) {
            throw error;
          }

          // Throw a generic error for unexpected errors
          throw new GraphQLError(ErrorMessages.ServerError, {
            extensions: { code: GQL_ERROR_CODES.SERVER_ERROR },
          });
        }
      },
    });
  },
});
