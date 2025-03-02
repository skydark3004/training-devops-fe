import z from 'zod';
import { MAX_INDEX } from '@/constants/constants';

export const createNutritionSchema = z.object({
  name: z
    .string({ message: 'Bạn phải nhập tên level' })
    .trim()
    .min(1, 'Bạn phải nhập tối thiểu 1 kí tự')
    .max(100, { message: 'Độ dài tối đa 100 kí tự' }),
  description: z.string().trim(),
  isFree: z.boolean(),
  categoryId: z.string().uuid({ message: 'Bạn phải chọn loại bài viết dinh dưỡng' }),
  content: z.string({ message: 'Bạn phải nhập nội dung bài tập' }).trim().min(1, 'Bạn phải nhập tối thiểu 1 kí tự'),
  status: z.boolean(),
  index: z.number({ message: 'Bạn phải nhập thứ tự bài tập dinh dưỡng' }).min(1, 'Thứ tự phải lớn hơn 0').max(MAX_INDEX, 'Thứ tự tối đa là 100.000'),
  fileUpload: z.any(),
});

export type TypeCreateNutritionSchema = z.infer<typeof createNutritionSchema>;
