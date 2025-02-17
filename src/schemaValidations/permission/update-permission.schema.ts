import z from 'zod';

export const updatePermissionSchema = z.object({
  name: z
    .string({ message: 'Bạn phải nhập tên nhóm quyền hạn' })
    .trim()
    .min(1, 'Bạn phải nhập tối thiểu 1 kí tự')
    .max(100, { message: 'Độ dài tối đa 100 kí tự' }),
  details: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'Bạn phải chọn ít nhất 1',
  }),
  status: z.boolean(),
});

export type UpdatePermissionSchemaType = z.infer<typeof updatePermissionSchema>;
