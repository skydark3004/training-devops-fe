import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb';
import { Separator } from '../ui/separator';
import { SidebarTrigger } from '../ui/sidebar';

export interface IBreadcrumItem {
  name: string;
  href: string;
}

interface IProps {
  titlePage: string;
  breadcrumbItems?: IBreadcrumItem[];
  currentBreadcrumPage: string;
}

export function Header({ titlePage, breadcrumbItems = [], currentBreadcrumPage }: IProps) {
  return (
    <>
      <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
        <div className='flex items-center gap-2 px-4'>
          <SidebarTrigger className='ml-1' />
          <Separator orientation='vertical' className='mr-2 h-4' />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbItems?.map((item, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem className='hidden md:block'>
                    <BreadcrumbLink href={item.href}>{item.name}</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className='hidden md:block' />
                </React.Fragment>
              ))}

              <BreadcrumbItem>
                <BreadcrumbPage className='font-bold'>{currentBreadcrumPage}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <h1 className='ml-5 font-bold text-2xl mb-2'>{titlePage}</h1>
    </>
  );
}
