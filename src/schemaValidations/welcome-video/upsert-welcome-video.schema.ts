import z, { RefinementCtx } from 'zod';

export const upsertWelcomeVideoSchema = z
  .object({
    first: z.any(),
    firstUpload: z.any(),
    firstToPreview: z.any(),
    second: z.any(),
    secondUpload: z.any(),
    secondToPreview: z.any(),
    third: z.any(),
    thirdUpload: z.any(),
    thirdToPreview: z.any(),
  })
  .superRefine((value, ctx: RefinementCtx) => {
    if (!value.firstToPreview && !value?.firstUpload?.length) {
      ctx.addIssue({
        path: ['firstUpload'],
        code: z.ZodIssueCode.custom,
        message: 'Bạn phải upload video',
      });
    }

    if (!value.secondToPreview && !value?.secondUpload?.length) {
      ctx.addIssue({
        path: ['secondUpload'],
        code: z.ZodIssueCode.custom,
        message: 'Bạn phải upload video',
      });
    }

    if (!value.thirdToPreview && !value?.thirdUpload?.length) {
      ctx.addIssue({
        path: ['thirdUpload'],
        code: z.ZodIssueCode.custom,
        message: 'Bạn phải upload video',
      });
    }
  });

export type TypeUpsertWelcomeVideoSchema = z.infer<typeof upsertWelcomeVideoSchema>;
