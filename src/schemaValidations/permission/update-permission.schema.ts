import { StatusEnum } from '@/constants/enum';

import z from 'zod';

export const updatePermissionSchema = z.object({
  name: z.string({ message: 'Bạn phải điền tên nhóm quyền hạn' }),
  details: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'Bạn phải chọn ít nhất 1',
  }),
  status: z.enum([StatusEnum.ACTIVE, StatusEnum.INACTIVE], { message: 'Bạn phải chọn trạng thái tài khoản' }),
});

export type UpdatePermissionSchemaType = z.infer<typeof updatePermissionSchema>;
