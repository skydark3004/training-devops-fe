import { z } from 'zod';

export function optionalStringInput<T extends z.ZodTypeAny>(schema: T) {
  return z
    .union([schema, z.literal('')])
    .transform((value) => (value === '' ? undefined : value))
    .optional();
}
