import z from 'zod';

export const loginSchema = z.object({
  username: z.string({ message: 'Bạn phải nhập email' }).trim().email('Email không hợp lệ'),
  password: z.string({ message: 'Bạn phải nhập mật khẩu' }).trim().min(6, 'Độ dài tối thiểu 6 kí tự').max(100),
  isKeepLogin: z.boolean(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
