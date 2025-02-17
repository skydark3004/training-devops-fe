import { MAX_INDEX } from '@/constants/constants';
import { EnumTypeOfFaq, EnumTypeOfShowFaq } from '@/constants/enum';
import z, { RefinementCtx } from 'zod';

const LIST_TYPE_OF_FAQ = [EnumTypeOfFaq.ARTICLE, EnumTypeOfFaq.VIDEO, EnumTypeOfFaq.URL] as const;
const LIST_TYPE_OF_SHOW_OF_FAQ = [EnumTypeOfShowFaq.LARGE_THUMBNAIL, EnumTypeOfShowFaq.NO_THUMBNAIL, EnumTypeOfShowFaq.SMALL_THUMBNAIL] as const;

export const updateFaqSchema = z
  .object({
    title: z.string({ message: 'Bạn phải nhập tiêu đề' }).trim().min(1, 'Bạn phải nhập tổi thiểu 1 kí tự').max(100, 'Tối đa 100 kí tự'),
    pathThumbnail: z.any(),
    uploadFileThumbnail: z.any(),
    type: z.enum(LIST_TYPE_OF_FAQ, { message: 'Bạn phải chọn loại FAQ' }),
    typeOfShow: z.enum(LIST_TYPE_OF_SHOW_OF_FAQ, { message: 'Bạn phải chọn cách hiển thị FAQ' }),
    content: z.any(),
    url: z.any(),
    pathVideo: z.any(),
    uploadFileVideo: z.any(),
    status: z.boolean(),
    index: z.number({ message: 'Bạn phải nhập thứ tự' }).min(1, 'Thứ tự phải lớn hơn 0').max(MAX_INDEX, 'Thứ tự tối đa là 100.000'),
  })
  .superRefine((value, ctx: RefinementCtx) => {
    if (value.type === EnumTypeOfFaq.VIDEO && !value.uploadFileVideo?.length && !value.pathVideo) {
      ctx.addIssue({
        path: ['uploadFileVideo'],
        code: z.ZodIssueCode.custom,
        message: 'Bạn phải upload video',
      });
    }

    if (
      (value.typeOfShow === EnumTypeOfShowFaq.LARGE_THUMBNAIL || value.typeOfShow === EnumTypeOfShowFaq.SMALL_THUMBNAIL) &&
      !value.uploadFileThumbnail?.length
    ) {
      ctx.addIssue({
        path: ['uploadFileThumbnail'],
        code: z.ZodIssueCode.custom,
        message: 'Bạn phải upload thumbnail',
      });
    }

    if (value.type === EnumTypeOfFaq.ARTICLE && !value.content) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Bạn phải nhập nội dung',
        path: ['content'],
      });
    }

    if (value.type === EnumTypeOfFaq.URL) {
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

export type TypeUpdateFaqSchema = z.infer<typeof updateFaqSchema>;

function isURL(str: string) {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return pattern.test(str);
}
