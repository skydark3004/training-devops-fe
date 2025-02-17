import { instanceClient } from './instance-client';
import { IFile } from '../interface';
import { EnumPrefix } from '@/constants/enum';

export const uploadVideo = async function (formData: FormData, prefix: EnumPrefix): Promise<IFile> {
  const result = await instanceClient.post('/admin/upload/video', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      prefix,
    },
  });
  return result;
};

export const uploadImage = async function (formData: FormData, prefix: EnumPrefix): Promise<IFile> {
  const result = await instanceClient.post('/admin/upload/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      prefix,
    },
  });
  return result;
};

export const uploadAudio = async function (formData: FormData, prefix: EnumPrefix): Promise<IFile> {
  const result = await instanceClient.post('/admin/upload/audio', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      prefix,
    },
  });
  return result;
};
