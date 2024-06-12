'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { ToastError, ToastSucess } from '@/common';
import { ILoading, useLoadingStore } from '@/store';
import useSWRMutation from 'swr/mutation';
import { StatusEnum } from '@/constants/enum';

import { UpdatePermissionSchemaType, updatePermissionSchema } from '@/schemaValidations/permission/update-permission.schema';
import { updatePermission } from '@/api-be/client/permission/permission.api';
import { LIST_LABEL_PERMISSIONS, convertLabelPermissionToValue, convertValuePermissionToLabel } from './helper';
import { Checkbox } from '@/components/ui/checkbox';
import { IPermission } from '@/api-be/client';

interface IProps {
  dataPermission: IPermission;
  children: any;
  refreshData: () => void;
}

export default function UpdatePermissionForm(props: IProps) {
  const setLoading = useLoadingStore((state: ILoading) => state.setIsLoading);

  const form = useForm<UpdatePermissionSchemaType>({
    resolver: zodResolver(updatePermissionSchema),
    defaultValues: {},
  });

  const handleSubmitForm = async (values: UpdatePermissionSchemaType) => {
    try {
      setLoading(true);
      const valueUpdate = {
        id: props.dataPermission.id,
        name: values.name,
        status: values.status,
        details: convertLabelPermissionToValue(values.details),
      };
      await trigger(valueUpdate);
      ToastSucess('Cập nhật thành công');
      props.refreshData();
    } catch (error: any) {
      ToastError(error.message || 'Cập nhật thất bại');
    } finally {
      setLoading(false);
    }
  };

  const { trigger } = useSWRMutation(updatePermission.key, updatePermission.fetch);

  const initValue = () => {
    form.reset({
      name: props.dataPermission.name,
      details: convertValuePermissionToLabel(props.dataPermission.details),
      status: props.dataPermission.status,
    } as any);
  };

  useEffect(() => {
    initValue();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitForm)} className=''>
        <div className='grid grid-cols-1 md:grid-cols-1 gap-6'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='col-span-1'>
                <FormLabel>Tên</FormLabel>
                <FormControl>
                  <Input placeholder='' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <FormItem className='col-span-1'>
                <FormLabel>Trạng thái tài khoản</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={props.dataPermission.status}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Trạng thái' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
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
                {LIST_LABEL_PERMISSIONS.map((item) => (
                  <FormField
                    key={item}
                    control={form.control}
                    name='details'
                    render={({ field }) => {
                      return (
                        <FormItem key={item} className='flex flex-row items-start space-x-3 space-y-0'>
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item)}
                              onCheckedChange={(checked) => {
                                console.log('checked', checked);
                                const updatedValue = field.value || []; // Ensure field is an array
                                if (checked) {
                                  field.onChange([...updatedValue, item]);
                                } else {
                                  field.onChange(updatedValue.filter((value) => value !== item));
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className='text-sm font-normal'>{item}</FormLabel>
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
          {/*           <Button className='bg-blue-600' type='submit'>
            Lưu
          </Button> */}
          {props.children}
          {/*           <Button className='bg-gray-400' type='button' onClick={resetFormWithInitValue}>
            Hủy
          </Button> */}
        </div>
      </form>
    </Form>
  );
}
