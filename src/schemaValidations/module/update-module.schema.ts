import { EnumStudyProgramCode } from '@/constants/enum';
import z, { RefinementCtx } from 'zod';

export const updateModuleSchema = z
  .object({
    name: z
      .string({ message: 'Bạn phải nhập tên gói' })
      .trim()
      .min(1, 'Bạn phải nhập tối thiểu 1 kí tự')
      .max(100, { message: 'Độ dài tối đa 100 kí tự' }),
    isUploadImage: z.any(),
    isDeleteImage: z.boolean(),
    fileUpload: z.any(),
    path: z.any(),
    index: z.any(),
    studyProgramCode: z.enum([EnumStudyProgramCode.MUSCLE_REFLEX, EnumStudyProgramCode.SEXOLOGY], { message: 'Bạn phải chọn chương trình học' }),
    status: z.boolean(),
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
  });

export type TypeUpdateModuleSchema = z.infer<typeof updateModuleSchema>;
