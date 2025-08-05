// import 'reflect-metadata';
// import { ApolloServer } from 'apollo-server';
// // import { schema } from './presentation/graphql/{schema}';
// import { typeDefs } from './presentation/graphql/{schema}/types';
// import { resolvers } from './presentation/graphql/{schema}/resolvers';
// import { formatGraphQLError } from './presentation/middleware/errorHandler';
// import { requestLogger } from './presentation/middleware/logger';
// import { createContext } from './presentation/graphql/context';

// async function startServer() {
//   const server = new ApolloServer({
//     schema,
//     context: createContext,
//     formatError: formatGraphQLError,
//     plugins: [requestLogger]
//   });

//   const { url } = await server.listen({ port: process.env.PORT || 4000 });
//   console.log(`🚀 Server ready at ${url}`);
// }

// startServer();


import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
// import { typeDefs } from './presentation/graphql/schema/Types';
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
  console.log(`🚀 Server ready at ${url}`);
});
