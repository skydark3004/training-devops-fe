import { isURL } from '@/common';
import { EnumTypeOfContent } from '@/constants/enum';
import { LIST_TYPE_OF_CONTENT, LIST_TYPE_OF_NOTIFICATION } from '@/constants/schema';
import z, { RefinementCtx } from 'zod';

export const updateNotificationSchema = z
  .object({
    title: z.string({ message: 'Bạn phải nhập tiêu đề' }).trim().min(1, 'Bạn phải nhập tổi thiểu 1 kí tự').max(100, 'Tối đa 100 kí tự'),
    date: z.date(),
    description: z.string().trim().max(1000, 'Tối đa 1000 kí tự'),
    pathThumbnail: z.any(),
    uploadFileThumbnail: z.any(),
    type: z.enum(LIST_TYPE_OF_NOTIFICATION, { message: 'Bạn phải chọn loại thông báo' }),
    isNotifyForCustomer: z.boolean(),
    status: z.boolean(),
    content: z.any(),
    url: z.any(),
    typeOfContent: z.enum(LIST_TYPE_OF_CONTENT, { message: 'Bạn phải chọn loại nội dung' }),
  })
  .superRefine((value, ctx: RefinementCtx) => {
    if (value.typeOfContent === EnumTypeOfContent.ARTICLE && !value.content) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Bạn phải nhập nội dung',
        path: ['content'],
      });
    }

    if (value.typeOfContent === EnumTypeOfContent.URL) {
      if (!value.url) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Bạn phải nhập url',
          path: ['url'],
        });
      }

      if (!isURL(value.url)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Url không đúng định dạng',
          path: ['url'],
        });
      }
    }
  });

export type TypeUpdateNotificationSchema = z.infer<typeof updateNotificationSchema>;
