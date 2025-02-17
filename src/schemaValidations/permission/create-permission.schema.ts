import z from 'zod';

export const createPermissionSchema = z.object({
  name: z.string({ message: 'Bạn phải nhập tên nhóm quyền' }).trim().min(6, 'Độ dài tối thiểu 6 kí tự').max(100, 'Tối đa 100 kí tự'),
  details: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'Bạn phải chọn ít nhất 1',
  }),
  status: z.boolean(),
});

export type CreatePermissionSchemaType = z.infer<typeof createPermissionSchema>;
