import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from "./app/graphql/typeDefs";
import { resolvers } from "./app/graphql/resolvers";
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/handleGlobalError';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/graphql', graphqlHTTP({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    graphiql: true,
}));

// Error handlers 
app.use(globalErrorHandler);
app.use(notFound);

export default app;
