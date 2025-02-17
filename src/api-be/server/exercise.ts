import { IGetExercisePagination, IExercise } from '@/api-be/interface';
import { instanceServer } from './instance-server';
import { IGetFeedbackPagination } from '../interface';

export const getExerciseById = async (id: string): Promise<IExercise> => {
  const result = await instanceServer.get(`/admin/exercise/${id}`);
  return result;
};

export const getAllExercises = async (): Promise<IGetExercisePagination> => {
  const result = await instanceServer.get(`/admin/exercise/list`, { params: { pageSize: -1 } });
  return result;
};

export async function getFeedbacksOfCustomerByExerciseId(exerciseId: string): Promise<IGetFeedbackPagination> {
  const result = await instanceServer.get('admin/experience-review/list', { params: { exerciseId, pageSize: -1 } });
  return result;
}
