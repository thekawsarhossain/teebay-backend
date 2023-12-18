import { ZodError } from 'zod';
import AppError from '../errors/appError';
import handleZodError from '../errors/handleZodError';
import { TErrorSources, TResolve } from '../interface/error';
import { GraphQLResolveInfo } from "graphql";

export const handleErrors = async (resolve: TResolve, parent: unknown, args: unknown, context: unknown, info: GraphQLResolveInfo) => {
    try {
        const result = await resolve(parent, args, context, info);
        return result;
    } catch (err) {
        let statusCode = 500;
        let message = 'Something went wrong!';
        let errorSources: TErrorSources = [
            {
                path: '',
                message: 'Something went wrong',
            },
        ];

        if (err instanceof ZodError) {
            const simplifiedError = handleZodError(err);
            statusCode = simplifiedError?.statusCode;
            message = simplifiedError?.message;
            errorSources = simplifiedError?.errorSources;
        } else if (err instanceof AppError) {
            statusCode = err?.statusCode;
            message = err.message;
            errorSources = [
                {
                    path: '',
                    message: err?.message,
                },
            ];
        } else if (err instanceof Error) {
            message = err.message;
            errorSources = [
                {
                    path: '',
                    message: err?.message,
                },
            ];
        }

        throw new Error(JSON.stringify({
            statusCode,
            message,
            errorSources
        }));
    }
};
