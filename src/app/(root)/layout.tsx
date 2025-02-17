import { Header } from '@/components/layout/header/header';
import { Sidebar } from '@/components/layout/sidebar/sidebar';
import { Loading } from '@/components/ui/loading';
import { IBaseProps } from '@/constants/interface';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from '@/context';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/custom/app-side-bar';

export default function AccountLayout(props: IBaseProps) {
  return (
    <>
      <UserProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className='bg-gray-100'>{props.children}</SidebarInset>

          {/*           <div className='flex h-screen'>
            <div className='flex flex-col flex-1'>
              { <Header />}
              <div className='flex-1 p-4 bg-gray-100'>{props.children}</div>
            </div>
          </div> */}
        </SidebarProvider>
      </UserProvider>
    </>
  );
}

/* import { Header } from '@/components/layout/header/header';
import { Sidebar } from '@/components/layout/sidebar/sidebar';
import { Loading } from '@/components/ui/loading';
import { IBaseProps } from '@/constants/interface';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from '@/context';

export default function AccountLayout(props: IBaseProps) {
  return (
    <>
      <UserProvider>
        <Header />
        <div className='flex h-screen'>
          <Sidebar />
          <div className='flex flex-col flex-1'>
            <div className='flex-1 p-4 bg-gray-100'>{props.children}</div>
          </div>
        </div>
      </UserProvider>
    </>
  );
}
 */
