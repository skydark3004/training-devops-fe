import { StatusEnum } from '@/constants/enum';
import { optionalStringInput } from '@/custom-validations/optional-input';
import z from 'zod';

export const updateUserSchema = z
  .object({
    username: z.optional(z.string()),
    fullName: z.string({ message: 'Tên' }).min(6, 'Độ dài tối thiểu 6 kí tự').max(100),
    description: z.string().max(100),
    password: optionalStringInput(z.string().min(6, 'Độ dài tối thiểu 6 kí tự')),
    passwordConfirm: optionalStringInput(z.string().min(6, 'Độ dài tối thiểu 6 kí tự')),
    phoneNumber: z.string({ message: 'Bạn phải nhập số điện thoại' }).refine(
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
    status: z.enum([StatusEnum.ACTIVE, StatusEnum.INACTIVE], { message: 'Bạn phải chọn trạng thái tài khoản' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Mật khẩu không khớp',
    path: ['passwordConfirm'], // This sets which field the error is attached to
  });

export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>;
