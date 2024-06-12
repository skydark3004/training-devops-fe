import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/ui/password-input';
import useSWR from 'swr';
import { getAllPermissions } from '@/api-be/client/permission/permission.api';
import { ToastError, ToastSucess } from '@/common';
import { ILoading, useLoadingStore } from '@/store';
import { IPermission } from '@/api-be/client/permission/permission.interface';
import useSWRMutation from 'swr/mutation';
import { GenderTypesEnum, RoleCodeEnum, StatusEnum } from '@/constants/enum';
import { createUser } from '@/api-be/client/user/user.api';
import { DEFAULT_VAULE_SELECT } from '@/constants/constants';
import { OPTIONS_FETCHER_ONLY_GET_ONE_TIME } from '@/config/swr.config';
import { CreateUserSchemaType, createUserSchema } from '@/schemaValidations/user/create-user.schema';
import { InputInlineBlock } from '@/components/custom/input-inline-block';

const CreateUserForm: React.FC = () => {
  const setLoading = useLoadingStore((state: ILoading) => state.setIsLoading);

  const form = useForm<CreateUserSchemaType>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {},
  });

  const handleSubmitForm = async (values: CreateUserSchemaType) => {
    trigger({ ...values, roleCode: RoleCodeEnum.EMPLOYEE, gender: GenderTypesEnum.MALE });
  };

  const { trigger, isMutating } = useSWRMutation(createUser.key, createUser.fetch, {
    onSuccess(data) {
      setLoading(false);
      ToastSucess('Tạo người dùng thành công');
      form.reset();
    },
    onError(err: any) {
      ToastError(err.message || 'Tạo người dùng thất bại');
      setLoading(false);
    },
  });

  // PERMISSIONS
  const [permissions, setPermissions] = useState<IPermission[]>([]);
  const { isLoading } = useSWR(getAllPermissions.key, getAllPermissions.fetch, {
    ...OPTIONS_FETCHER_ONLY_GET_ONE_TIME,
    onSuccess(data, key, config) {
      setPermissions(data.data);
      setLoading(false);
    },
    onError(err, key, config) {
      ToastError(err.message);
      setLoading(false);
    },
  });

  useEffect(() => {
    if (isMutating || isLoading) {
      setLoading(true);
    }
  }, [isMutating, isLoading]);

  useEffect(() => {
    form.reset({
      username: '',
      fullName: '',
      password: '',
      passwordConfirm: '',
      phoneNumber: '',
      permissionId: DEFAULT_VAULE_SELECT,
      status: DEFAULT_VAULE_SELECT,
      description: '',
    } as any);
  }, [form.reset]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitForm)} className=''>
        <div className='grid grid-cols-4 gap-6'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <div className='grid grid-cols-4 col-span-2'>
                <FormLabel className='col-span-1 my-auto'>
                  Email <span className='text-rose-600'>*</span>
                </FormLabel>
                <FormControl>
                  <InputInlineBlock className='col-span-3' placeholder='men-health@gmail.com' {...field} />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />
          <FormField
            control={form.control}
            name='fullName'
            render={({ field }) => (
              <div className='grid grid-cols-4 col-span-2'>
                <FormLabel className='col-span-1 my-auto'>
                  Họ và tên <span className='text-rose-600'>*</span>
                </FormLabel>
                <FormControl>
                  <InputInlineBlock className='col-span-3' placeholder='Nguyễn Văn A' {...field} />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />
          <FormField
            control={form.control}
            name='phoneNumber'
            render={({ field }) => (
              <div className='grid grid-cols-4 col-span-2'>
                <FormLabel className='col-span-1 my-auto'>
                  Số điện thoại <span className='text-rose-600'>*</span>
                </FormLabel>
                <FormControl>
                  <InputInlineBlock className='col-span-3' placeholder='0986989342' {...field} />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <div className='grid grid-cols-4 col-span-2'>
                <FormLabel className='col-span-1 my-auto'>
                  Mô tả <span className='text-rose-600'>*</span>
                </FormLabel>
                <FormControl>
                  <InputInlineBlock className='col-span-3' placeholder='0986989342' {...field} />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <div className='grid grid-cols-4 col-span-2'>
                <FormLabel className='col-span-1 my-auto'>
                  Mật khẩu <span className='text-rose-600'>*</span>
                </FormLabel>
                <FormControl>
                  <div className='col-span-3'>
                    <PasswordInput className='col-span-3' placeholder='**********' id='password' autoComplete='new-password' {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </div>
            )}
          />
          <FormField
            control={form.control}
            name='passwordConfirm'
            render={({ field }) => (
              <div className='grid grid-cols-4 col-span-2'>
                <FormLabel className='col-span-1 my-auto'>
                  Mật khẩu xác nhận <span className='text-rose-600'>*</span>
                </FormLabel>
                <FormControl>
                  <div className='col-span-3'>
                    <PasswordInput className='col-span-3' placeholder='**********' id='password' autoComplete='new-password' {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name='permissionId'
            render={({ field }) => (
              <div className='grid grid-cols-4 col-span-2'>
                <FormLabel className='col-span-1 my-auto'>
                  Nhóm quyền <span className='text-rose-600'>*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className='my-auto'>
                      <SelectValue placeholder='Chọn nhóm quyền' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={DEFAULT_VAULE_SELECT}>Chọn nhóm quyền</SelectItem>
                    {permissions.map((permission) => (
                      <SelectItem key={permission.id} value={permission.id}>
                        {permission.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage className='col-start-2 col-span-3' />
              </div>
            )}
          />
          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <div className='grid grid-cols-4 col-span-2'>
                <FormLabel className='col-span-1 my-auto'>
                  Trạng thái tài khoản <span className='text-rose-600'>*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className='my-auto'>
                      <SelectValue placeholder='Trạng thái tài khoản' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={DEFAULT_VAULE_SELECT}>Trạng thái tài khoản</SelectItem>
                    <SelectItem value={StatusEnum.ACTIVE}>Kích hoạt</SelectItem>
                    <SelectItem value={StatusEnum.INACTIVE}>Tạm dừng</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className='col-start-2 col-span-3' />
              </div>
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
};

export default CreateUserForm;
