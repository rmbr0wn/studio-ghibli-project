import { makeSchema, queryType } from 'nexus';
import { ApolloServer } from '@apollo/server';
import { GhibliQueries } from '~/schemaModules/ghibli/queries.ghibliSchema';
import { Film } from '~/schemaModules/ghibli/objectTypes.ghibliSchema';
import axios from 'axios';
import { GraphQLClient } from 'graphql-request';

jest.mock('axios');

const schema = makeSchema({
  types: [queryType(), GhibliQueries, Film],
});

const server = new ApolloServer({
  schema,
});

describe('GhibliQueries', () => {
  it('fetches film data successfully', async () => {
    const mockFilmData = {
      title: 'Porco Rosso',
      description: 'A tale of a pig pilot.',
      director: 'Hayao Miyazaki',
      release_date: '1992',
      running_time: '94',
      rt_score: '95',
      movie_banner: 'banner_url',
      image: 'image_url',
    };

    axios.get.mockResolvedValueOnce({ data: mockFilmData });

    const query = `
      query GetFilm($id: ID!) {
        film(id: $id) {
          title
          description
          director
          release_date
          running_time
          rt_score
          movie_banner
          image
        }
      }
    `;

    const client = new GraphQLClient('http://localhost:4000');
    const variables = { id: 'ebbb6b7c-945c-41ee-a792-de0e43191bd8' };

    const response = await client.request(query, variables);

    expect(response.film).toEqual(mockFilmData);
  });

  it('throws an error when API call fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('API Error'));

    const query = `
      query GetFilm($id: ID!) {
        film(id: $id) {
          title
        }
      }
    `;

    const client = new GraphQLClient('http://localhost:4000');
    const variables = { id: 'invalid-id' };

    await expect(client.request(query, variables)).rejects.toThrow('API Error');
  });
});
