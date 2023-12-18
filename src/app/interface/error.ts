/* eslint-disable no-unused-vars */
import { GraphQLResolveInfo } from "graphql";

export type TErrorSources = {
    path: string | number;
    message: string;
}[];

export type TGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorSources: TErrorSources;
};

export type TResolve = (
    parent: unknown,
    args: unknown,
    context: unknown,
    info: GraphQLResolveInfo
) => Promise<unknown>;
