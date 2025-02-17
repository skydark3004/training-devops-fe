import { MAX_INDEX } from '@/constants/constants';
import z from 'zod';

export const createLevelSchema = z.object({
  name: z
    .string({ message: 'Bạn phải nhập tên level' })
    .trim()
    .min(1, 'Bạn phải nhập tối thiểu 1 kí tự')
    .max(100, { message: 'Độ dài tối đa 100 kí tự' }),
  totalDaysToStudy: z.any(),
  isFree: z.boolean(),
  index: z.number({ message: 'Bạn phải nhập thứ tự level' }).min(1, 'Thứ tự phải lớn hơn 0').max(MAX_INDEX, 'Thứ tự tối đa là 100.000'),
  status: z.boolean(),
  fileUpload: z.any(),
  days: z.array(
    z.object({
      totalExercises: z.any(),
      details: z.array(
        z.object({
          moduleId: z.string(),
          exerciseId: z.string().uuid({ message: 'Bạn phải chọn bài tập' }),
          index: z.any(),
          frequency: z.number().min(1, 'Tần suất tối thiểu 1 lần'),
          description: z.string().trim(),
        }),
      ),
    }),
  ),
});

export type TypeCreateLevelSchema = z.infer<typeof createLevelSchema>;
