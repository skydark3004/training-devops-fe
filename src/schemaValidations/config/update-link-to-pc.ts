import z from 'zod';

export const updateLinkToPcConfig = z.object({
  faqId: z.string({ message: 'Bạn phải chọn FAQ' }).uuid({ message: 'Bạn phải chọn FAQ' }),
});

export type TypeUpdateLinkToPcConfig = z.infer<typeof updateLinkToPcConfig>;
