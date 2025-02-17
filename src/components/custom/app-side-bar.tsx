'use client';
import { ChevronRight, ChevronUp, User2 } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useUserContext } from '@/context';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { CookieUtilsClient } from '@/utils/cookie/client';
import { useRouter } from 'next/navigation';
import IconApp from '../../../public/icon-app.svg';
import { EnumRoleCode } from '@/constants/enum';
import { ROUTES } from '@/constants/constants';

export function AppSidebar() {
  const { dataContext } = useUserContext();
  const router = useRouter();

  const routesAllowAccess: any = {};
  for (const permissionCode of dataContext?.permission?.details || []) {
    routesAllowAccess[permissionCode] = permissionCode;
  }

  const routesToRender = dataContext?.roleCode === EnumRoleCode.ADMIN ? ROUTES : ROUTES.filter((el: any) => !!routesAllowAccess[el.code]);

  return (
    <Sidebar variant='sidebar' className=''>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
              onClick={() => {
                router.push('/home');
              }}>
              <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                <Image src={IconApp} alt={'Logo'} />
              </div>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold font-bold text-base text-black'>Men Health </span>
              </div>
            </SidebarMenuButton>
          </SidebarGroupLabel>
          <SidebarGroupContent className='mt-5'>
            <SidebarGroup>
              {/*               <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
              <SidebarMenu>
                {routesToRender.map((item) => {
                  if (item?.items?.length) {
                    return (
                      <Collapsible key={item.title} asChild defaultOpen={item.isActive} className='group/collapsible'>
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton tooltip={item.title}>
                              {item.icon && <item.icon className='font-bold text-base text-black' />}
                              {item.url && (
                                <a href={item.url}>
                                  <span className='text-black'>{item.title}</span>
                                </a>
                              )}

                              {/*   <span className='font-bold'>{item.title}</span> */}
                              <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.items?.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton asChild>
                                    <p
                                      className='cursor-pointer'
                                      onClick={() => {
                                        router.push(subItem.url);
                                      }}>
                                      <span className='text-black'>{subItem.title}</span>
                                    </p>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    );
                  } else {
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <p
                            className='cursor-pointer'
                            onClick={() => {
                              router.push(item.url);
                            }}>
                            <item.icon className='font-bold text-base text-black' />
                            <span className='text-black'>{item.title}</span>
                          </p>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  }
                })}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> <span className='font-bold'>{dataContext?.fullName}</span>
                  <ChevronUp className='ml-auto' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side='top' className='w-[--radix-popper-anchor-width] cursor-pointer'>
                <DropdownMenuItem
                  className='cursor-pointer'
                  onClick={() => {
                    CookieUtilsClient.remove('accessToken');
                    CookieUtilsClient.remove('inforUser');
                    router.push('/dang-nhap');
                  }}>
                  <span>Đăng xuất</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
