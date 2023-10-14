import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

// logger.middleware.ts
export const loggerMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const value = await next();
  console.log(value);
  return value?.toUpperCase?.();
};
