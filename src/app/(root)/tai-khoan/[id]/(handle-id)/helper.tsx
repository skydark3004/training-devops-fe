import { StatusEnum } from '@/constants/enum';

export const convertStatusToHtml = (status: StatusEnum | undefined) => {
  if (status === StatusEnum.ACTIVE) {
    return (
      <span>
        Trạng thái tài khoản: <img className='ml-5 w-5 inline-block' src='/assets_check_circle.svg'></img> Kích hoạt
      </span>
    );
  }
  if (status === StatusEnum.INACTIVE) {
    return (
      <span>
        Trạng thái tài khoản: <img className='ml-5 w-5 inline-block' src='assets_icon-error.svg'></img> Tạm dừng
      </span>
    );
  }
  return;
};
