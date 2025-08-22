import { stringArg, nonNull, extendType } from 'nexus';
import { HelloWorld, Film } from './objectTypes.ghibliSchema';
import { GraphQLError } from 'graphql';
import { GQL_ERROR_CODES, ErrorMessages } from '~/shared/constants';
import { getHelloWorld } from '~/shared/utils';
import axios from 'axios';

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
    t.field('film', {
      type: nonNull(Film),
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_, { id }) => {
        try {
          const response = await axios.get(
            `https://ghibliapi.herokuapp.com/films/${id}`,
          );
          return response.data;
        } catch (error) {
          throw new Error('Failed to fetch film data');
        }
      },
    });
  },
});
