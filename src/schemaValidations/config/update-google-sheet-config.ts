import z from 'zod';

export const updateGoogleSheetConfig = z
  .object({
    eachHourToRunCronJob: z.string({ message: 'Bạn phải nhập số giờ để đồng bộ Google Sheet' }).transform((value) => {
      // Chuyển chuỗi sang số
      const num = Number(value);
      return isNaN(num) ? 0 : num;
    }),
  })
  .refine((data) => data.eachHourToRunCronJob > 0, {
    message: 'Số giờ phải lớn hơn 0',
    path: ['eachHourToRunCronJob'],
  })
  .refine(
    (data) => {
      if (isFloat(data.eachHourToRunCronJob)) return false;
      return true;
    },
    {
      message: 'Số giờ không được là số thập phân',
      path: ['eachHourToRunCronJob'],
    },
  );

export type TypeUpdateGoogleSheetConfig = z.infer<typeof updateGoogleSheetConfig>;

const isFloat = (value: number): boolean => value.toString().indexOf('.') !== -1;
