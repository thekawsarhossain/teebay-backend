import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import notFound from './middlewares/notFound';
import globalErrorHandler from './middlewares/handleGlobalError';

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
