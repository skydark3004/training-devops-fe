import z from 'zod';

export const createUserSchema = z
  .object({
    username: z.string({ message: 'Bạn phải nhập email' }).trim().email('Email không hợp lệ'),
    fullName: z.string({ message: 'Tên' }).trim().min(6, 'Độ dài tối thiểu 6 kí tự').max(100),
    description: z.string().trim().max(100, 'Tối đa 100 kí tự').optional(),
    password: z.string({ message: 'Bạn phải nhập mật khẩu' }).trim().min(6, 'Độ dài tối thiểu 6 kí tự'),
    passwordConfirm: z.string({ message: 'Bạn phải nhập mật khẩu xác nhận' }).trim().min(6, 'Độ dài tối thiểu 6 kí tự'),
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
    //gender: z.string({ message: 'Bạn phải nhập số điện thoại' }).min(6, 'Độ dài tối thiểu 6 kí tự').max(100),
    permissionId: z.string({ message: 'Bạn phải chọn nhóm quyền' }).uuid({ message: 'Bạn phải chọn nhóm quyền' }),
    status: z.boolean(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Mật khẩu không khớp',
    path: ['passwordConfirm'], // This sets which field the error is attached to
  });

export type TypeCreateUserSchema = z.infer<typeof createUserSchema>;
