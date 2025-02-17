import { instanceClient } from './instance-client';
import { IWelcomeVideo, IUpdateGoogleSheetConfig, IUpsertWelcomeVideo } from '../interface';

export const requestUpdateGoogleSheetConfig = {
  key: '/admin/config/update-google-sheet',
  fetch: async function (key: string, data: { arg: IUpdateGoogleSheetConfig }): Promise<IWelcomeVideo> {
    const body = data.arg;
    const result = await instanceClient.post(key, body);
    return result;
  },
};

export const upsertSexologyVideo = {
  key: '/admin/config/upsert-sexology',
  fetch: async function (key: string, data: { arg: { path: string } }): Promise<IWelcomeVideo> {
    const body = data.arg;
    const result = await instanceClient.post(key, body);
    return result;
  },
};

export const getConfigVideoSexology = {
  key: '/admin/config/get-config-video-sexology',
  fetch: async function (key: string): Promise<{ sexology: string; sexologyToPreview: string }> {
    const result = await instanceClient.get(key);
    return result;
  },
};

export const getConfigWelcomeVideo = {
  key: '/admin/config/get-config-welcome-video',
  fetch: async function (
    key: string,
  ): Promise<{ first: string; second: string; third: string; firstToPreview?: string; secondToPreview?: string; thirdToPreview?: string }> {
    const result = await instanceClient.get(key);
    return result;
  },
};

export const upsertWelcomeVideo = {
  key: '/admin/config/upsert-welcome-video',
  fetch: async function (key: string, data: { arg: IUpsertWelcomeVideo }): Promise<IWelcomeVideo> {
    const body = data.arg;
    const result = await instanceClient.post(key, body);
    return result;
  },
};

export const upsertLinkToPc = {
  key: '/admin/config/update-link-to-pc',
  fetch: async function (key: string, data: { arg: { faqId: string } }): Promise<{ faqId: string | null }> {
    const body = data.arg;
    const result = await instanceClient.post(key, body);
    return result;
  },
};
