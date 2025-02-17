import { optionalStringInput } from '@/custom-validations/optional-input';
import z from 'zod';

export const updateUserSchema = z
  .object({
    username: z.optional(z.string().trim().email('Email không hợp lệ')),
    fullName: z.string({ message: 'Tên' }).trim().min(6, 'Độ dài tối thiểu 6 kí tự').max(100, 'Tối đa 100 kí tự'),
    description: z.string().trim().max(100, 'Tối đa 100 kí tự'),
    password: optionalStringInput(z.string().trim().min(6, 'Độ dài tối thiểu 6 kí tự')),
    passwordConfirm: optionalStringInput(z.string().trim().min(6, 'Độ dài tối thiểu 6 kí tự')),
    phoneNumber: z
      .string({ message: 'Bạn phải nhập số điện thoại' })
      .trim()
      .refine(
        (value) => {
          const regexPhoneNumberVietnamese = /((09|03|07|08|05)+([0-9]{8})\b)/g;
          return regexPhoneNumberVietnamese.test(value);
        },
        {
          message: 'Số điện thoại không hợp lệ',
        },
      ),
    permissionId: z.string({ message: 'Bạn phải chọn nhóm quyền' }).uuid({ message: 'Bạn phải chọn nhóm quyền' }),
    status: z.boolean(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Mật khẩu không khớp',
    path: ['passwordConfirm'],
  });

export type TypeUpdateUserSchema = z.infer<typeof updateUserSchema>;
