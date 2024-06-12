import Image from 'next/image';

interface IProps {
  message: string;
  type: 'WARNING' | 'ERROR' | 'SUCESS';
}

export const ToastMessage = (props: IProps): React.ReactNode => {
  let typeToast;
  switch (props.type) {
    case 'WARNING':
      typeToast = {
        image: <Image style={{ display: 'inline-block' }} src={'/assets_icon-warning-solid.svg'} width={20} height={20} alt='Chú ý'></Image>,
        title: 'Chú ý!',
      };

      break;
    case 'ERROR':
      typeToast = {
        image: <Image style={{ display: 'inline-block' }} src={'/assets_icon-error.svg'} width={20} height={20} alt='Lỗi'></Image>,
        title: 'Lỗi!',
      };
      break;
    case 'SUCESS':
      typeToast = {
        image: <Image style={{ display: 'inline-block' }} src={'/assets_check_circle.svg'} width={20} height={20} alt='Thành công'></Image>,
        title: 'Thành công!',
      };
      break;
  }

  return (
    <>
      {typeToast.image}
      <span className='font-semibold' style={{ color: '#1C2766', marginLeft: '5px' }}>
        {typeToast.title}
      </span>
      <div style={{ marginTop: '2px', marginLeft: '5px' }}>
        <h1 className='text-sm text-black'>{props.message}</h1>
      </div>
    </>
  );
};
