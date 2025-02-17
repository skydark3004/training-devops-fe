import { Header } from '@/components/custom/header';

export const metadata = {
  title: 'Tổng quan',
};

export default function () {
  return (
    <>
      <Header titlePage='Tổng quan doanh thu' currentBreadcrumPage='Home' />

      <div className='bg-white shadow-[0px_0px_5px_0px_silver]  flex-1 rounded bg-muted/50 md:min-h-min p-5'>
        <h1>Home Page</h1>
      </div>
    </>
  );
}
