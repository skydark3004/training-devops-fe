import { MAX_INDEX } from '@/constants/constants';
import {
  EnumExerciseType,
  EnumMusclePcType,
  EnumScreenTypeOfReel,
  EnumScreenTypeOfVideo,
  EnumScreenTypeOfInformation,
  EnumTypeComponentOfFlexibleScreen,
  EnumTypeOfAlignOfFlexibleScreen,
} from '@/constants/enum';
import { findDuplicateIndexes } from '@/utils/array.util';
import z, { RefinementCtx } from 'zod';

const listExerciseType = [EnumExerciseType.INFORMATION, EnumExerciseType.MUSCLE_PC, EnumExerciseType.REEL, EnumExerciseType.VIDEO] as const;
const listMusclePcType = [EnumMusclePcType.VIBRATE, EnumMusclePcType.REST] as const;
const listTypeOfScreenOfReel = [EnumScreenTypeOfReel.GUIDE, EnumScreenTypeOfReel.PRACTICE] as const;
const listTypeOfScreenOfVideo = [EnumScreenTypeOfVideo.ANSWER, EnumScreenTypeOfVideo.ANSWER_CONTINOUSLY, EnumScreenTypeOfVideo.VIDEO] as const;
const listTypeOfScreenOfInformation = [
  EnumScreenTypeOfInformation.AUDIO,
  EnumScreenTypeOfInformation.FLEXIBLE,
  EnumScreenTypeOfInformation.MULTIPLE_CHOICES,
  EnumScreenTypeOfInformation.POINT_ANALYZE,
  EnumScreenTypeOfInformation.REMOVE_NAGATIVE_THINKING,
] as const;

const listTypeComponentOfFlexibleScreen = [
  EnumTypeComponentOfFlexibleScreen.IMAGE,
  EnumTypeComponentOfFlexibleScreen.TEXT_BOLD,
  EnumTypeComponentOfFlexibleScreen.TEXT_LARGE,
  EnumTypeComponentOfFlexibleScreen.TEXT_NORMAL,
  EnumTypeComponentOfFlexibleScreen.SPACE,
  EnumTypeComponentOfFlexibleScreen.BACK,
] as const;

const listTypeOfAlignOfFlexibleScreen = [
  EnumTypeOfAlignOfFlexibleScreen.CENTER,
  EnumTypeOfAlignOfFlexibleScreen.LEFT,
  EnumTypeOfAlignOfFlexibleScreen.RIGHT,
] as const;

export const updateExerciseSchema = z.object({
  name: z
    .string({ message: 'Bạn phải nhập tên gói' })
    .trim()
    .min(1, 'Bạn phải nhập tối thiểu 1 kí tự')
    .max(100, { message: 'Độ dài tối đa 100 kí tự' }),
  exerciseType: z.enum(listExerciseType, { message: 'Bạn phải chọn chương trình học' }),
  module: z.string({ message: 'Bạn phải chọn module' }).uuid({ message: 'Bạn phải chọn module' }),
  studyProgramCode: z.any(),
  description: z.any(),
  status: z.boolean(),

  uploadThumbnailFile: z.any(),
  isDeleteThumbnail: z.boolean(),

  uploadGuideVideos: z.any(),
  guideVideosToDelete: z.array(z.string().trim()),

  MUSCLE_PC: z.array(
    z.object({
      nameOfStep: z
        .string({ message: 'Bạn phải nhập tên bước' })
        .min(1, 'Bạn phải nhập tối thiểu 1 kí tự')
        .max(100, { message: 'Độ dài tối đa 100 kí tự' }),
      details: z.array(
        z.object({
          type: z.enum(listMusclePcType, { message: 'Bạn phải chọn kiểu bài tập' }),
          duration: z.number({ message: 'Bạn phải nhập thời lượng' }).gt(0, 'Thời lượng phải lớn hơn 0'),
        }),
      ),
    }),
  ),
  REEL: z.array(
    z
      .object({
        nameOfStep: z
          .string({ message: 'Bạn phải nhập tên bước' })
          .min(1, 'Bạn phải nhập tối thiểu 1 kí tự')
          .max(100, { message: 'Độ dài tối đa 100 kí tự' }),
        nameOfButton: z
          .string({ message: 'Bạn phải nhập tên bước' })
          .min(1, 'Bạn phải nhập tối thiểu 1 kí tự')
          .max(100, { message: 'Độ dài tối đa 100 kí tự' }),
        typeOfScreen: z.enum(listTypeOfScreenOfReel, { message: 'Bạn phải chọn loại màn hình' }),
        uploadVideoFile: z.any(),
        countdownTime: z.any(),
        path: z.any(),
      })
      .refine(
        (value) => {
          if (!value) return true;
          if (value.typeOfScreen === EnumScreenTypeOfReel.PRACTICE && value.countdownTime <= 0) {
            return false;
          }
          return true;
        },
        {
          message: 'Bạn phải nhập thời lượng lớn hơn 0',
          path: ['countdownTime'],
        },
      ),
  ),
  VIDEO: z.array(
    z
      .object({
        content: z.any(),
        nameOfButton: z.any(),
        typeOfScreen: z.enum(listTypeOfScreenOfVideo, { message: 'Bạn phải chọn loại màn hình' }),
        uploadVideoFile: z.any(), // file
        path: z.any(),
      })
      .superRefine((value, ctx) => {
        const isNotUploadVideo = !Array.isArray(value.uploadVideoFile) || !value?.uploadVideoFile?.at(0);
        if (!value.path && value.typeOfScreen === EnumScreenTypeOfVideo.VIDEO && isNotUploadVideo) {
          ctx.addIssue({
            path: ['uploadVideoFile'],
            code: z.ZodIssueCode.custom,
            message: 'Bạn phải upload video',
          });
        }

        if (value.typeOfScreen === EnumScreenTypeOfVideo.ANSWER && !value.nameOfButton) {
          ctx.addIssue({
            path: ['nameOfButton'],
            code: z.ZodIssueCode.custom,
            message: 'Bạn phải nhập tên Button',
          });
        }

        if (value.typeOfScreen === EnumScreenTypeOfVideo.ANSWER || value.typeOfScreen === EnumScreenTypeOfVideo.ANSWER_CONTINOUSLY) {
          if (!value?.content?.trim()) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Bạn phải nhập nội dung ít nhất 1 kí tự',
              path: ['content'],
            });
          }

          if (value?.content?.trim()?.length > 1000) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Tối đa 1000 kí tự',
              path: ['content'],
            });
          }
        }
      }),
  ),
  INFORMATION: z.array(
    z
      .object({
        nameOfStep: z
          .string({ message: 'Bạn phải nhập tên bước' })
          .min(1, 'Bạn phải nhập tối thiểu 1 kí tự')
          .max(100, { message: 'Độ dài tối đa 100 kí tự' }),
        nameOfButton: z
          .string({ message: 'Bạn phải nhập tên button' })
          .min(1, 'Bạn phải nhập tối thiểu 1 kí tự')
          .max(100, { message: 'Độ dài tối đa 100 kí tự' }),
        typeOfScreen: z.enum(listTypeOfScreenOfInformation, { message: 'Bạn phải chọn loại màn hình' }),
        moreComponents: z.array(
          z
            .object({
              type: z.enum(listTypeComponentOfFlexibleScreen, { message: 'Bạn phải chọn loại thành phần' }),
              content: z.any(),
              index: z.number({ message: 'Bạn phải nhập STT' }).min(1, 'Thứ tự phải lớn hơn 0').max(MAX_INDEX, 'Thứ tự tối đa là 100.000'),
              typeOfAlign: z.enum(listTypeOfAlignOfFlexibleScreen, { message: 'Bạn phải chọn kiểu căn lề' }),
              uploadImage: z.any(),
              imagePathToPreview: z.any(),
              path: z.any(),
              space: z.any(),
              nameOfButtonBack: z.any(),
            })
            .superRefine((value, ctx) => {
              if (value.type === EnumTypeComponentOfFlexibleScreen.IMAGE && !value?.uploadImage && !value?.imagePathToPreview) {
                ctx.addIssue({
                  path: ['uploadImage'],
                  code: z.ZodIssueCode.custom,
                  message: 'Bạn phải tải lên hình ảnh',
                });
              }

              const typeMustEnterContent = [
                EnumTypeComponentOfFlexibleScreen.TEXT_BOLD,
                EnumTypeComponentOfFlexibleScreen.TEXT_LARGE,
                EnumTypeComponentOfFlexibleScreen.TEXT_NORMAL,
              ];
              if (typeMustEnterContent.includes(value.type) && !value.content) {
                ctx.addIssue({
                  path: ['content'],
                  code: z.ZodIssueCode.custom,
                  message: 'Bạn phải nhập nội dung',
                });
              }

              if (value.type === EnumTypeComponentOfFlexibleScreen.SPACE && !value.space) {
                ctx.addIssue({
                  path: ['space'],
                  code: z.ZodIssueCode.custom,
                  message: 'Bạn phải nhập khoảng cách',
                });
              }

              if (value.type === EnumTypeComponentOfFlexibleScreen.BACK && !value.nameOfButtonBack) {
                ctx.addIssue({
                  path: ['nameOfButtonBack'],
                  code: z.ZodIssueCode.custom,
                  message: 'Bạn phải nhập tên nút back',
                });
              }
            }),
        ),
        questionOfMutilpleChoices: z.any(),
        listMutilpleChoices: z.array(z.any()),

        // point
        normalTextStep1: z.any(),
        listQuestionStep1: z.array(z.any()), // string[]
        largeTextStep2: z.any(), // string
        normalTextStep2: z.any(), // string
        //textToDisplayStartChangesStep2: z.any(), // string
        //textToDisplayDoNothingStep2: z.any(), // string
        boldTextStep2: z.any(), // string
        stepOfPointAnalyze: z.any(),

        //audio
        howToDisplay: z.any(), // EnumTypeDisplayOfInformationScreen;
        uploadAudio: z.any(), // string
        audioPath: z.any(),
        audioPathToPreview: z.any(),
        uploadImage: z.any(), // string
        imagePathToPreview: z.any(),
        imagePath: z.any(),
        contentOfVideo: z.any(), // string

        // loại bỏ suy nghĩ tiêu cực
        largeTextStep1: z.any(), // string
        questionStep2: z.any(), // string
        listPlaceholderStep2: z.array(z.any()),
        listQuestionStep3: z.array(
          z.object({
            question: z.string().trim(),
            placeholder: z.string().trim(),
          }),
        ),
        questionStep4: z.any(), // string
        largeTextStep5: z.any(), // string
        stepOfRemoveNegativeThinking: z.any(),
      })
      .superRefine((value, ctx: RefinementCtx) => {
        if (value.typeOfScreen === EnumScreenTypeOfInformation.MULTIPLE_CHOICES) {
          if (!value?.questionOfMutilpleChoices?.trim()) {
            ctx.addIssue({
              path: ['questionOfMutilpleChoices'],
              code: z.ZodIssueCode.custom,
              message: 'Bạn phải nhập câu hỏi',
            });
          }

          for (const [index, choice] of value?.listMutilpleChoices.entries()) {
            if (!choice.trim()) {
              ctx.addIssue({
                path: [`listMutilpleChoices.${index}`],
                code: z.ZodIssueCode.custom,
                message: 'Bạn phải nhập câu trả lời',
              });
            }
          }
        }

        if (value.typeOfScreen === EnumScreenTypeOfInformation.POINT_ANALYZE) {
          if (value?.stepOfPointAnalyze === 1) {
            for (const [index, questionStep1] of value.listQuestionStep1.entries()) {
              if (!questionStep1.trim()) {
                ctx.addIssue({
                  path: [`listQuestionStep1.${index}`],
                  code: z.ZodIssueCode.custom,
                  message: 'Bạn phải nhập câu hỏi',
                });
              }
            }

            if (!value?.normalTextStep1) {
              ctx.addIssue({
                path: [`normalTextStep1`],
                code: z.ZodIssueCode.custom,
                message: 'Bạn phải nhập văn bản thường',
              });
            }
          }

          if (value.stepOfPointAnalyze === 2) {
            if (!value?.largeTextStep2) {
              ctx.addIssue({
                path: [`largeTextStep2`],
                code: z.ZodIssueCode.custom,
                message: 'Bạn phải nhập văn bản lớn',
              });
            }

            if (!value?.normalTextStep2) {
              ctx.addIssue({
                path: [`normalTextStep2`],
                code: z.ZodIssueCode.custom,
                message: 'Bạn phải nhập văn bản thường',
              });
            }

            if (!value?.boldTextStep2) {
              ctx.addIssue({
                path: [`boldTextStep2`],
                code: z.ZodIssueCode.custom,
                message: 'Bạn phải nhập văn bản in đậm',
              });
            }
          }
        }

        if (value.typeOfScreen === EnumScreenTypeOfInformation.AUDIO) {
          if (!value.howToDisplay) {
            ctx.addIssue({
              path: [`howToDisplay`],
              code: z.ZodIssueCode.custom,
              message: 'Bạn phải chọn cách hiển thị',
            });
          }

          if (!value.uploadAudio?.length && !value.audioPathToPreview) {
            ctx.addIssue({
              path: [`uploadAudio`],
              code: z.ZodIssueCode.custom,
              message: 'Bạn phải upload audio',
            });
          }

          if (!value.contentOfVideo?.trim()) {
            ctx.addIssue({
              path: [`contentOfVideo`],
              code: z.ZodIssueCode.custom,
              message: 'Bạn phải nhập nội dung',
            });
          }

          if (!value.uploadImage?.length && !value.imagePathToPreview) {
            ctx.addIssue({
              path: [`uploadImage`],
              code: z.ZodIssueCode.custom,
              message: 'Bạn phải upload ảnh',
            });
          }
        }

        if (value.typeOfScreen === EnumScreenTypeOfInformation.REMOVE_NAGATIVE_THINKING) {
          if (!value.largeTextStep1 && value.stepOfRemoveNegativeThinking === 1) {
            ctx.addIssue({
              path: [`largeTextStep1`],
              code: z.ZodIssueCode.custom,
              message: 'Bạn phải nhập văn bản lớn',
            });
          }

          if (value.stepOfRemoveNegativeThinking === 2) {
            for (const [index, placeholder] of value?.listPlaceholderStep2.entries()) {
              if (!placeholder.trim()) {
                ctx.addIssue({
                  path: [`listPlaceholderStep2.${index}`],
                  code: z.ZodIssueCode.custom,
                  message: 'Bạn phải nhập placeholder',
                });
              }
            }

            if (!value.questionStep2) {
              ctx.addIssue({
                path: [`questionStep2`],
                code: z.ZodIssueCode.custom,
                message: 'Bạn phải nhập câu hỏi',
              });
            }
          }

          if (value.stepOfRemoveNegativeThinking === 3) {
            for (const [index, question] of value?.listQuestionStep3.entries()) {
              if (!question.question) {
                ctx.addIssue({
                  path: [`listQuestionStep3.${index}.question`],
                  code: z.ZodIssueCode.custom,
                  message: 'Bạn phải nhập câu hỏi',
                });
              }

              if (!question.placeholder) {
                ctx.addIssue({
                  path: [`listQuestionStep3.${index}.placeholder`],
                  code: z.ZodIssueCode.custom,
                  message: 'Bạn phải nhập placeholder',
                });
              }
            }
          }

          if (!value?.questionStep4 && value.stepOfRemoveNegativeThinking === 4) {
            ctx.addIssue({
              path: [`questionStep4`],
              code: z.ZodIssueCode.custom,
              message: 'Bạn phải nhập câu hỏi',
            });
          }

          if (!value?.largeTextStep5 && value.stepOfRemoveNegativeThinking === 5) {
            ctx.addIssue({
              path: [`largeTextStep5`],
              code: z.ZodIssueCode.custom,
              message: 'Bạn phải nhập văn bản lớn',
            });
          }
        }

        if (value.typeOfScreen === EnumScreenTypeOfInformation.FLEXIBLE) {
          const indexes = value.moreComponents.map((el) => el.index);
          const arrIndexes = findDuplicateIndexes(indexes);
          if (arrIndexes.length) {
            for (const index of arrIndexes) {
              ctx.addIssue({
                path: [`moreComponents.${index}.index`],
                code: z.ZodIssueCode.custom,
                message: 'Trùng số thứ tự',
              });
            }
          }
        }
      }),
  ),
});

export type TypeUpdateExerciseSchema = z.infer<typeof updateExerciseSchema>;

export type typeVideo = {
  content: string;
  nameOfButton: string;
  typeOfScreen: string;
  uploadVideoFile: File;
};
