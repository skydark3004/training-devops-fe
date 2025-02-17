import { IWelcomeVideo } from '@/api-be/interface';
import { instanceServer } from './instance-server';

export const getCurrentWelcomeVideo = async (): Promise<IWelcomeVideo> => {
  const result = await instanceServer.get(`/admin/welcome-video/current`);
  return result;
};
