import { gql } from '~/graphql/gen';

export const GET_HELLO_WORLD = gql(`
  query GetHelloWorld {
    helloWorld {
      message
    }
  }
`);

export const FILM_QUERY = gql`
  query GetFilm($id: String!) {
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
