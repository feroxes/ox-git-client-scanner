import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import { createServer, Server } from 'http';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { config } from './config';
import {
  corsMiddleware,
  rateLimitMiddleware,
  securityHeadersMiddleware
} from './middleware/security';
import {
  errorLoggingMiddleware
} from './middleware/logging';

async function startServer(): Promise<void> {
  const app = express();
  const httpServer = createServer(app);

  const apolloServer = await startApolloServer(httpServer);

  applyMiddlewares(app);
  
  defineRoutes(app, apolloServer);
  
  const port = config.port;
  httpServer.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
  });
}

async function startApolloServer(httpServer: Server) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    formatError: (error) => {
      console.error('GraphQL Error:', error);
      return {
        message: error.message,
        code: error.extensions?.['code'] || 'INTERNAL_ERROR'
      };
    },
    introspection: config.nodeEnv === 'development'
  });

  await server.start();
  return server;
}

function applyMiddlewares(app: express.Application) {
  app.use(express.json());
  app.use(securityHeadersMiddleware);
  app.use(corsMiddleware);
  app.use(rateLimitMiddleware);
  app.use(errorLoggingMiddleware);
}

function defineRoutes(app: express.Application, apolloServer: ApolloServer<{ token: string }>) {
  app.use('/graphql', expressMiddleware(apolloServer, {
    context: async ({ req }) => {
      const token = req.headers['x-gh-token'] as string;
      return { token };
    }
  }));

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});