import dotevn from 'dotenv';
import path from 'path';

dotevn.config({
    path: path.join(process.cwd(), '.env'),
});

export default {
    port: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
};
