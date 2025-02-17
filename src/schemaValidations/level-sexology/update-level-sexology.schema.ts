import { MAX_INDEX } from '@/constants/constants';
import { LIST_TYPE_OF_PRACTICE } from '@/constants/schema';
import z from 'zod';
import { createLevelSexologySchema } from './create-level-sexology.schema';

/* export const updateLevelSexologySchema = z.object({
  name: z
    .string({ message: 'Bạn phải nhập tên level' })
    .trim()
    .min(1, 'Bạn phải nhập tối thiểu 1 kí tự')
    .max(100, { message: 'Độ dài tối đa 100 kí tự' }),
  status: z.boolean(),
  isFree: z.boolean(),
  moduleId: z.any(),
  totalDaysMustLearn: z.number({ message: 'Bạn phải nhập tổng số ngày học' }).min(1, 'Tối thiểu 1 ngày'),
  totalTimesToPractice: z.number({ message: 'Bạn phải nhập số lần luyện tập' }).min(1, 'Tối thiểu 1 lần'),
  index: z.number({ message: 'Bạn phải nhập số thứ tự' }).min(1, 'Thứ tự phải lớn hơn 0').max(MAX_INDEX, 'Thứ tự tối đa là 100.000'),
  listExericses: z.array(
    z.object({
      id: z.any(),
      exerciseId: z.string().uuid({ message: 'Bạn phải chọn bài tập' }),
      index: z.any(),
    }),
  ),
  typeOfPractice: z.enum(LIST_TYPE_OF_PRACTICE, { message: 'Bạn phải chọn loại luyện tập' }),
}); */

export const updateLevelSexologySchema = createLevelSexologySchema.extend({});

export type TypeUpdateLevelSexologySchema = z.infer<typeof updateLevelSexologySchema>;
