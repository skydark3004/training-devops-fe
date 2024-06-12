import { PermissionEnum, StatusEnum } from '@/constants/enum';
import z from 'zod';

export const createPermissionSchema = z.object({
  name: z.string({ message: 'Bạn phải nhập tên nhóm quyền' }).min(6, 'Độ dài tối thiểu 6 kí tự').max(100),
  details: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'Bạn phải chọn ít nhất 1',
  }),
  status: z.enum([StatusEnum.ACTIVE, StatusEnum.INACTIVE], { message: 'Bạn phải chọn trạng thái tài khoản' }),
});

export type CreatePermissionSchemaType = z.infer<typeof createPermissionSchema>;
