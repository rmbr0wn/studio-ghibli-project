import { gql } from '@apollo/client';

export const GET_HELLO_WORLD = gql`
  query GetHelloWorld {
    helloWorld {
      message
    }
  }
`;
