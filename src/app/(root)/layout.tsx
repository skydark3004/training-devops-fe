import { Header } from '@/components/layout/header/header';
import { Sidebar } from '@/components/layout/sidebar/sidebar';
import { Loading } from '@/components/ui/loading';
import { IBaseProps } from '@/constants/interface';
import { ToastContainer } from 'react-toastify';

export default function AccountLayout(props: IBaseProps) {
  return (
    <>
      <Header />
      <div className='flex h-screen'>
        <Sidebar />
        <div className='flex flex-col flex-1'>
          <div className='flex-1 p-4 bg-gray-100'>{props.children}</div>
        </div>
      </div>
    </>
  );
}
