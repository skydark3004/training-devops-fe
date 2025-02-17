import { optionalStringInput } from '@/custom-validations/optional-input';
import z from 'zod';

export const updateCustomerSchema = z.object({
  description: z.string().trim().max(100, 'Tối đa 100 kí tự').optional(),
  status: z.boolean(),
});

export type UpdateCustomerSchemaType = z.infer<typeof updateCustomerSchema>;
