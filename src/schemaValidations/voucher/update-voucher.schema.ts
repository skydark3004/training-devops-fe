import { EnumDiscountUnit } from '@/constants/enum';
import z from 'zod';

export const updateVoucherSchema = z
  .object({
    code: z
      .string({ message: 'Bạn phải nhập mã giảm giá' })
      .trim()
      .min(1, 'Bạn phải nhập tổi thiểu 1 kí tự')
      .max(15, { message: 'Tối đa 15 ký tự' })
      .regex(/^[a-zA-Z0-9]+$/, { message: 'Chỉ cho phép chữ và số, không được có dấu cách' }),
    quantity: z.number({ message: 'Bạn phải nhập số lượng' }).min(1, 'Tối thiểu 1').max(999, 'Tối đa 999'),
    startDate: z.date({ message: 'Bạn phải chọn thời gian' }),
    endDate: z.date({ message: 'Bạn phải chọn thời gian' }),
    description: z.string().trim().max(1000, 'Tối đa 1000 kí tự').optional(),
    status: z.boolean(),
    discountUnit: z.enum([EnumDiscountUnit.DIRECT_PRICE, EnumDiscountUnit.PERCENT], { message: 'Bạn phải chọn loại giảm giá' }),
    discountValue: z.union([z.string().min(1), z.number()]).transform((value) => {
      // Chuyển chuỗi sang số
      const num = Number(value);
      return isNaN(num) ? 0 : num; // Nếu không phải là số, trả về 0 để tránh lỗi (hoặc tùy chỉnh theo ý bạn)
    }),
  })
  .refine((data) => data.startDate < data.endDate, {
    message: 'Ngày bắt đầu áp dụng phải nhỏ hơn ngày kết thúc',
    path: ['startDate'],
  })
  .refine((data) => (data.discountUnit === EnumDiscountUnit.PERCENT ? data.discountValue >= 0 && data.discountValue <= 100 : true), {
    message: 'Tỷ lệ % giảm giá phải từ 1 - 100',
    path: ['discountValue'],
  })
  .refine((data) => (data.discountUnit === EnumDiscountUnit.DIRECT_PRICE ? data.discountValue > 0 : true), {
    message: 'Số tiền giảm phải lớn hơn 0',
    path: ['discountValue'],
  });

export type TypeUpdateVoucherSchema = z.infer<typeof updateVoucherSchema>;
