import { EnumTypeOfContent, EnumTypeOfNotification } from '@/constants/enum';

export const LIST_TYPE_OF_NOTIFICATION = [EnumTypeOfNotification.ANNOUNCEMENT, EnumTypeOfNotification.NEWS] as const;
export const LIST_TYPE_OF_CONTENT = [EnumTypeOfContent.ARTICLE, EnumTypeOfContent.URL] as const;
