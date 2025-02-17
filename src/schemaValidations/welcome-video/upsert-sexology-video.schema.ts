import z, { RefinementCtx } from 'zod';

export const upsertSexologyVideoSchema = z
  .object({
    sexology: z.any(),
    sexologyUpload: z.any(),
  })
  .superRefine((value, ctx: RefinementCtx) => {
    if (!value.sexology && !value?.sexologyUpload?.length) {
      ctx.addIssue({
        path: ['sexologyUpload'],
        code: z.ZodIssueCode.custom,
        message: 'Bạn phải upload video',
      });
    }
  });

export type TypeUpsertSexologyVideoSchema = z.infer<typeof upsertSexologyVideoSchema>;
