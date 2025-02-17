import { IGoogleSheetConfig, IWelcomeVideo } from '@/api-be/interface';
import { instanceServer } from './instance-server';

export const getGoogleSheetConfig = async (): Promise<IGoogleSheetConfig> => {
  const result = await instanceServer.get(`/admin/config/get-config-google-sheet`);
  return result;
};

export const getConfigVideoSexology = async (): Promise<{ sexology: string; sexologyToPreview: string }> => {
  const result = await instanceServer.get(`/admin/config/get-config-video-sexology`);
  return result;
};

export const getConfigLinkToPc = async (): Promise<{ faqId: string }> => {
  const result = await instanceServer.get(`/admin/config/get-config-link-to-pc`);
  return result;
};
