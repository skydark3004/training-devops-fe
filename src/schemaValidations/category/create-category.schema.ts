import z from 'zod';

export const createCategorySchema = z.object({
  name: z
    .string({ message: 'Bạn phải nhập tên level' })
    .trim()
    .min(1, 'Bạn phải nhập tối thiểu 1 kí tự')
    .max(100, { message: 'Độ dài tối đa 100 kí tự' }),
  status: z.boolean(),
});

export type TypeCreateCategorySchema = z.infer<typeof createCategorySchema>;
