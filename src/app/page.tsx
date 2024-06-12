import { Header } from '@/components/layout/header/header';
import { Sidebar } from '@/components/layout/sidebar/sidebar';

export default function Home() {
  return (
    <>
      <Header />
      <div className='flex h-screen'>
        <Sidebar />
        <div className='flex flex-col flex-1'>
          <main className='flex-1 p-4 bg-gray-100'>trang home</main>
        </div>
      </div>
    </>
  );
}
