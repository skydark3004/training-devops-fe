import { LIST_STATUS_OF_PURCHASE } from '@/constants/schema';
import z from 'zod';

export const updatePurchaseSchema = z.object({
  statusOfPurchase: z.enum(LIST_STATUS_OF_PURCHASE, { message: 'Bạn phải chọn trạng thái' }),
});

export type UpdatePurchaseSchemaType = z.infer<typeof updatePurchaseSchema>;
