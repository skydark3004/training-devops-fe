import {
  EnumDiscountUnit,
  EnumDurationUnit,
  EnumExerciseType,
  EnumStatusOfPurchase,
  EnumStudyProgramCode,
  EnumTypeOfContent,
  EnumTypeOfFaq,
  EnumTypeOfNotification,
  EnumTypeOfPurchase,
  EnumTypeOfShowFaq,
} from '@/constants/enum';

export const convertStudyProgramCodeToContent = (value: EnumStudyProgramCode) => {
  const STUDY_PROGRAM_CODE_TO_CONTENT = {
    [EnumStudyProgramCode.MUSCLE_REFLEX]: 'Phản xạ cơ',
    [EnumStudyProgramCode.SEXOLOGY]: 'Tình dục học',
  };

  return STUDY_PROGRAM_CODE_TO_CONTENT[value];
};

export const convertDurationUnitToContent = (input: EnumDurationUnit) => {
  const obj = {
    [EnumDurationUnit.DAY]: 'Ngày',
    [EnumDurationUnit.MONTH]: 'Tháng',
    [EnumDurationUnit.YEAR]: 'Năm',
  };
  return obj[input];
};

export const convertDiscountUnitToContent = (input: EnumDiscountUnit) => {
  const obj = {
    [EnumDiscountUnit.DIRECT_PRICE]: 'Trực tiếp',
    [EnumDiscountUnit.PERCENT]: '%',
  };
  return obj[input];
};

export const convertStatusToHtml = (input: boolean, isHaveDescriptionForStatus?: boolean) => {
  if (input) {
    return (
      <span>
        <img className='ml-5 w-5 inline-block' src='/circle-active.png'></img> {isHaveDescriptionForStatus ? 'Kích hoạt' : ''}
      </span>
    );
  } else {
    return (
      <span>
        <img className='ml-5 w-5 inline-block' src='/circle-inactive.png'></img> {isHaveDescriptionForStatus ? 'Tạm dừng' : ''}
      </span>
    );
  }
};

export const convertExcerciseTypeToContent = (value: EnumExerciseType) => {
  const obj = {
    [EnumExerciseType.INFORMATION]: 'Tin',
    [EnumExerciseType.MUSCLE_PC]: 'Cơ PC',
    [EnumExerciseType.REEL]: 'Reel',
    [EnumExerciseType.VIDEO]: 'Video',
  };

  return obj[value];
};

export const convertFaqTypeToContent = (value: EnumTypeOfFaq) => {
  const obj = {
    [EnumTypeOfFaq.ARTICLE]: 'Bài báo',
    [EnumTypeOfFaq.URL]: 'URL',
    [EnumTypeOfFaq.VIDEO]: 'Video',
  };

  return obj[value];
};

export const convertTypeOfShowFaqToContent = (value: EnumTypeOfShowFaq) => {
  const obj = {
    [EnumTypeOfShowFaq.LARGE_THUMBNAIL]: 'Thumbnail lớn',
    [EnumTypeOfShowFaq.NO_THUMBNAIL]: 'Không hiển thị',
    [EnumTypeOfShowFaq.SMALL_THUMBNAIL]: 'Thumbnail nhỏ',
  };

  return obj[value];
};

export const convertTypeOfNotification = (value: EnumTypeOfNotification) => {
  const obj = {
    [EnumTypeOfNotification.ANNOUNCEMENT]: 'Thông báo',
    [EnumTypeOfNotification.NEWS]: 'Tin tức',
  };

  return obj[value];
};

export const convertTypeOfPurchase = (value: EnumTypeOfPurchase) => {
  const obj = {
    [EnumTypeOfPurchase.BANK_TRANSFER]: 'Chuyển khoản',
    [EnumTypeOfPurchase.IN_APP]: 'Trên APP',
  };

  return obj[value];
};

export const convertStatusOfPurchase = (value: EnumStatusOfPurchase) => {
  const obj = {
    [EnumStatusOfPurchase.WAIT_CUSTOMER_CONFIRM]: 'Chờ KH xác nhận',
    [EnumStatusOfPurchase.CUSTOMER_CONFIRMED]: 'KH đã xác nhận',
    [EnumStatusOfPurchase.COMPLETED]: 'Thành công',
    [EnumStatusOfPurchase.CANCEL]: 'Hủy',
  };

  return obj[value];
};

export const convertTypeOfContent = (value: EnumTypeOfContent) => {
  const obj = {
    [EnumTypeOfContent.URL]: 'URL',
    [EnumTypeOfContent.ARTICLE]: 'Bài viết',
  };

  return obj[value];
};
