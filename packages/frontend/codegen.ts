import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '../backend/schema.graphql',
  documents: ['./src/graphql/mutations/*.ts', './src/graphql/queries/*.ts'],
  generates: {
    './src/graphql/gen/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
};

export default config;
