import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from "./app/graphql/typeDefs";
import { resolvers } from "./app/graphql/resolvers";
import notFound from './app/middlewares/notFound';
import { applyMiddleware } from 'graphql-middleware';
import { handleErrors } from './app/middlewares/errorHandler';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

const app = express();
app.use(cors());
app.use(express.json());

const schema = makeExecutableSchema({ typeDefs, resolvers });
const schemaWithMiddleware = applyMiddleware(schema, handleErrors);

app.use('/graphql', (req, res) => {
    graphqlHTTP({
        schema: schemaWithMiddleware,
        graphiql: true,
        customFormatErrorFn: (error: GraphQLError): GraphQLFormattedError => {
            const parsedError = typeof error?.message === "string" && error?.message?.includes("errorSources") ? JSON.parse(error.message || "{}") : error
            const formattedError: GraphQLFormattedError = {
                message: error.message,
                extensions: { ...(parsedError) },
            };
            res.status(200);
            return formattedError;
        }
    })(req, res);
});


// Error handler
app.use(notFound);

export default app;
