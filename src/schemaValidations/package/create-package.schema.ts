import { EnumDurationUnit, EnumPriceUnit } from '@/constants/enum';
import z from 'zod';

export const createPackageSchema = z.object({
  name: z.string({ message: 'Bạn phải nhập tên gói' }).trim().min(1, 'Bạn phải nhập tối thiểu 1 kí tự').max(100, 'Tối đa 100 kí tự'),
  durationValue: z
    .number({ message: 'Bạn phải nhập thời hạn sử dụng' })
    .gt(0, 'Phải lớn hơn 0')
    .refine(
      (value) => {
        if (value.toString().length > 2) {
          return false;
        }
        return true;
      },
      {
        message: 'Bạn chỉ được nhập tối đa 2 chữ số',
      },
    ), // thời hạn sử dụng
  durationUnit: z.enum([EnumDurationUnit.DAY, EnumDurationUnit.MONTH, EnumDurationUnit.YEAR], { message: 'Bạn phải chọn thời hạn sử dụng' }),
  priceUnit: z.enum([EnumPriceUnit.DOLLAR, EnumPriceUnit.VND], { message: 'Bạn phải chọn loại mệnh giá' }),
  originalPrice: z.number({ message: 'Bạn phải nhập giá gốc' }).gt(0, 'Phải lớn hơn 0'), // giá gốc
  discountValue: z.number({ message: 'Bạn phải nhập giảm giá' }).gte(0, 'Phải lớn hơn 0'), // số % giảm giá
  isShowDiscount: z.boolean(),
  description: z.string().trim().max(300, 'Tối đa 300 kí tự').optional(),
  status: z.boolean(),
});

export type TypeCreatePackageSchema = z.infer<typeof createPackageSchema>;
