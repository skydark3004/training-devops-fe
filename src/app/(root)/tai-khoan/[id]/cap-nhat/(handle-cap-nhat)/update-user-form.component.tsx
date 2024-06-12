'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/ui/password-input';
import { ToastError, ToastSucess } from '@/common';
import { ILoading, useLoadingStore } from '@/store';
import useSWRMutation from 'swr/mutation';
import { StatusEnum } from '@/constants/enum';
import { updateUser } from '@/api-be/client/user/user.api';
import { IGetUserById, IPermission } from '@/api-be/server';
import { UpdateUserSchemaType, updateUserSchema } from '@/schemaValidations/user/update-user.schema';

interface IProps {
  dataUser: IGetUserById;
  permissions: IPermission[];
}

export default function UpdateUserForm(props: IProps) {
  const setLoading = useLoadingStore((state: ILoading) => state.setIsLoading);

  const form = useForm<UpdateUserSchemaType>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {},
  });

  const handleSubmitForm = async (values: UpdateUserSchemaType) => {
    try {
      setLoading(true);
      const valueUpdate = {
        id: props.dataUser.id,
        fullName: values.fullName,
        password: values.password,
        passwordConfirm: values.passwordConfirm,
        phoneNumber: values.phoneNumber,
        permissionId: values.permissionId,
        status: values.status,
        description: values.description,
      };
      await trigger(valueUpdate);
      ToastSucess('Cập nhật tài khoản thành công');
      form.reset({
        ...valueUpdate,
        password: '',
        passwordConfirm: '',
      });
    } catch (error: any) {
      ToastError(error.message || 'Cập nhật toàn khoản thất bại');
    } finally {
      setLoading(false);
    }
  };

  const { trigger } = useSWRMutation(updateUser.key, updateUser.fetch);

  const resetFormWithInitValue = () => {
    form.reset({
      username: props.dataUser.username,
      fullName: props.dataUser.fullName,
      password: '',
      passwordConfirm: '',
      phoneNumber: props.dataUser.phoneNumber,
      permissionId: props.dataUser.permission.id,
      status: props.dataUser.status,
      description: props.dataUser.description,
    } as any);
  };

  useEffect(() => {
    resetFormWithInitValue();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitForm)} className=''>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='men-health@gmail.com' {...field} value={props.dataUser.username} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='fullName'
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel>Họ và tên</FormLabel>
                <FormControl>
                  <Input placeholder='Nguyễn Văn A' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phoneNumber'
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel>Số điện thoại</FormLabel>
                <FormControl>
                  <Input placeholder='0986999123' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel>Mô tả</FormLabel>
                <FormControl>
                  <Input placeholder='Mô tả...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <PasswordInput placeholder='' id='password' autoComplete='new-password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='passwordConfirm'
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel>Nhập lại mật khẩu</FormLabel>
                <FormControl>
                  <PasswordInput placeholder='' id='passwordConfirm' autoComplete='new-password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='permissionId'
            render={({ field }) => (
              <FormItem className='col-span-1'>
                <FormLabel>Nhóm quyền</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={props.dataUser.permission.id}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Chọn nhóm quyền' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {props.permissions.map((permission) => (
                      <SelectItem key={permission.id} value={permission.id}>
                        {permission.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <FormItem className='col-start-3 col-span-1'>
                <FormLabel>Trạng thái tài khoản</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={props.dataUser.status}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Trạng thái tài khoản' />
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
        </div>

        <div className='mt-5 flex justify-start space-x-4'>
          <Button className='bg-blue-600' type='submit'>
            Lưu
          </Button>

          <Button className='bg-gray-400' type='button' onClick={resetFormWithInitValue}>
            Hủy
          </Button>
        </div>
      </form>
    </Form>
  );
}
