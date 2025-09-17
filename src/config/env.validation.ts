import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(3306),
  DB_USERNAME: Joi.string().default('root'),
  DB_PASSWORD: Joi.string().allow('').default(''),
  DB_DATABASE: Joi.string().default('clear_scan'),
  JWT_SECRET: Joi.string().default('your-secret-key'),
});
