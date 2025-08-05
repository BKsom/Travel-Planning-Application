import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './presentation/graphql/schema/types';
import { resolvers } from './presentation/graphql/schema/resolvers';
import { createContext } from './presentation/graphql/context';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  context: async ({ req, res }) => createContext(),
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
