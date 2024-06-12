'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { createPermissions, getAllPermissions } from '@/api-be/client/permission/permission.api';
import { ToastError, ToastSucess } from '@/common';
import { ILoading, useLoadingStore } from '@/store';
import useSWRMutation from 'swr/mutation';
import { StatusEnum } from '@/constants/enum';
import { DEFAULT_VAULE_SELECT } from '@/constants/constants';
import { CreatePermissionSchemaType, createPermissionSchema } from '@/schemaValidations/permission/create-permission.schema';
import { Checkbox } from '@/components/ui/checkbox';
import { LIST_PERMISSIONS } from './list-permissions';

export default function CreatePermissionForm() {
  const setLoading = useLoadingStore((state: ILoading) => state.setIsLoading);

  const form = useForm<CreatePermissionSchemaType>({
    resolver: zodResolver(createPermissionSchema),
    defaultValues: {},
  });

  const handleSubmitForm = async (values: CreatePermissionSchemaType) => {
    console.log(values);
    //const body = {name: values.}
    try {
      setLoading(true);
      await trigger(values as any);
      ToastSucess('Tạo nhóm quyền thành công');
      form.reset({
        name: '',
        status: StatusEnum.ACTIVE,
        details: [],
      });
    } catch (error: any) {
      ToastError(error.message || 'Tạo nhóm quyền thất bại');
    } finally {
      setLoading(false);
    }
  };

  const { trigger } = useSWRMutation(createPermissions.key, createPermissions.fetch);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitForm)} className=''>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel>
                  Tên quyền hạn <span className='text-rose-600'>*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder='Nhân viên chăm sóc khách hàng' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <FormItem className=' col-span-2'>
                <FormLabel>
                  Trạng thái quyền hạn <span className='text-rose-600'>*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Trạng thái quyền hạn' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={DEFAULT_VAULE_SELECT}>Trạng thái quyền hạn</SelectItem>
                    <SelectItem value={StatusEnum.ACTIVE}>Kích hoạt</SelectItem>
                    <SelectItem value={StatusEnum.INACTIVE}>Tạm dừng</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='details'
            render={() => (
              <FormItem>
                <div className='mb-4'>
                  <FormLabel className='text-base'>Chọn các nhóm quyền hạn</FormLabel>
                </div>
                {LIST_PERMISSIONS.map((item) => (
                  <FormField
                    key={item.value}
                    control={form.control}
                    name='details'
                    render={({ field }) => {
                      return (
                        <FormItem key={item.value} className='flex flex-row items-start space-x-3 space-y-0'>
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.value)}
                              onCheckedChange={(checked) => {
                                const updatedValue = field.value || []; // Ensure field.value is an array
                                if (checked) {
                                  field.onChange([...updatedValue, item.value]);
                                } else {
                                  field.onChange(updatedValue.filter((value) => value !== item.value));
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className='text-sm font-normal'>{item.label}</FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='mt-5 flex justify-start space-x-4'>
          <Button className='bg-blue-600' type='submit'>
            Tạo
          </Button>
          <Button className='bg-gray-400' type='button' onClick={() => form.reset()}>
            Hủy
          </Button>
        </div>
      </form>
    </Form>
  );
}
