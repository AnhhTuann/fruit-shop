import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey_change_in_production';

// Context interface
export interface MyContext {
  userId?: string;
}

async function startServer() {
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const token = req.headers.authorization || '';
      
      // Try to retrieve a user with the token
      if (token) {
        try {
          // Remove 'Bearer ' if present
          const actualToken = token.replace('Bearer ', '');
          const decoded = jwt.verify(actualToken, JWT_SECRET) as any;
          return { userId: decoded.userId };
        } catch (e) {
          // invalid token
          console.error("Token verification failed:", e);
        }
      }
      
      return {};
    },
  });

  console.log(`🚀 Server ready at: ${url}`);
}

startServer();
