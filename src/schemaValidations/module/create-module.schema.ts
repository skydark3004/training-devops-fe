import { MAX_INDEX } from '@/constants/constants';
import { EnumStudyProgramCode } from '@/constants/enum';
import z, { RefinementCtx } from 'zod';

export const createModuleSchema = z
  .object({
    name: z
      .string({ message: 'Bạn phải nhập tên gói' })
      .trim()
      .min(1, 'Bạn phải nhập tối thiểu 1 kí tự')
      .max(100, { message: 'Độ dài tối đa 100 kí tự' }),

    description: z.string().trim().max(100, 'Tối đa 100 kí tự').optional(),
    thumbnail: z.any(),
    index: z.any(),
    studyProgramCode: z.enum([EnumStudyProgramCode.MUSCLE_REFLEX, EnumStudyProgramCode.SEXOLOGY], { message: 'Bạn phải chọn chương trình học' }),
    status: z.boolean(),
    fileUpload: z.any(),
  })
  .superRefine((value, ctx: RefinementCtx) => {
    if (value.studyProgramCode === EnumStudyProgramCode.SEXOLOGY && value?.index === 0) {
      ctx.addIssue({
        path: ['index'],
        code: z.ZodIssueCode.custom,
        message: 'Số thứ tự phải lớn hơn không',
      });
    }

    if (value.studyProgramCode === EnumStudyProgramCode.SEXOLOGY && !value?.index) {
      ctx.addIssue({
        path: ['index'],
        code: z.ZodIssueCode.custom,
        message: 'Bạn phải nhập số thứ tự của module',
      });
    }

    if (value.studyProgramCode === EnumStudyProgramCode.SEXOLOGY && value?.index > MAX_INDEX) {
      ctx.addIssue({
        path: ['index'],
        code: z.ZodIssueCode.custom,
        message: 'Thứ tự tối đa là 100.000',
      });
    }
  });

export type TypeCreateModuleSchema = z.infer<typeof createModuleSchema>;
