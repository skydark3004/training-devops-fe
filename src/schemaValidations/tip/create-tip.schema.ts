import z from 'zod';

export const createTipSchema = z.object({
  content: z
    .string({ message: 'Bạn phải nhập tên nhóm quyền hạn' })
    .trim()
    .min(1, 'Bạn phải nhập tối thiểu 1 kí tự')
    .max(1000, { message: 'Độ dài tối đa 1000 kí tự' }),
  status: z.boolean(),
});

export type CreateTipSchemaType = z.infer<typeof createTipSchema>;
