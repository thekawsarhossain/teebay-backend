import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const notFound = (_req: Request, res: Response, _next: NextFunction) => {
    return res.status(404).json({
        success: false,
        message: 'Your requested content was not found!',
        error: '',
    });
};

export default notFound;