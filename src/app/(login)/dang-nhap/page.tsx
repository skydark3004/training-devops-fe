'use client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { LoginSchemaType, loginSchema } from '@/schemaValidations';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { PasswordInput } from '@/components/ui/password-input';
import { ILoading, useLoadingStore } from '@/store';
import useSWRMutation from 'swr/mutation';
import styles from './page.module.css';
import { Checkbox } from '@/components/ui/checkbox';
import { getMe, login } from '@/api-be/client';
import { ToastError, ToastSucess } from '@/common';
import { CookieUtilsClient } from '@/utils/cookie/client';
import { APP_CONFIG } from '@/config/app.config';
import { useRouter } from 'next/navigation';
import { SignJWT } from 'jose';
import { localStorageUtils } from '@/utils/local-storage';

export default function LoginPage() {
  const router = useRouter();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: APP_CONFIG.IS_LOCAL ? 'admin@gmail.com' : localStorageUtils.get('username'),
      password: APP_CONFIG.IS_LOCAL ? '123456789' : localStorageUtils.get('password'),
      isKeepLogin: true,
    },
  });

  const setLoading = useLoadingStore((state: ILoading) => state.setIsLoading);

  const { trigger } = useSWRMutation(login.key, login.fetch);
  const { trigger: fetchMe } = useSWRMutation(getMe.key, getMe.fetch);

  const handleSubmitForm = async (values: LoginSchemaType) => {
    try {
      setLoading(true);
      const data = await trigger({ username: values.username, password: values.password, isKeepLogin: values.isKeepLogin });
      CookieUtilsClient.add('accessToken', data.accessToken);

      // add inforUser for cookie
      const me = await fetchMe();
      const secret = new TextEncoder().encode(APP_CONFIG.ENV.JWT_SECRET);
      const token = await new SignJWT({ ...me })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        //.setExpirationTime('2h')
        .sign(secret);

      CookieUtilsClient.add('inforUser', token);

      if (values.isKeepLogin) {
        localStorageUtils.add('username', values.username);
        localStorageUtils.add('password', values.password);
      }

      router.push('/home');
      ToastSucess('Đăng nhập thành công');
    } catch (error: any) {
      ToastError(error.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='grid xl:grid-cols-2 h-screen sm:grid-cols-1'>
        <div className=''>
          <img
            alt='background image'
            height={'100'}
            src='/login/background.png'
            style={{ width: '100%', minHeight: '100%', objectFit: 'cover' }}></img>
        </div>
        <div className='flex justify-center items-center h-screen p-20'>
          <div className={` ${styles.formLogin} w-full bg-white p-5 rounded shadow-md ml-10 mr-10`}>
            <h2 className='text-2xl font-semibold mb-2'>Đăng nhập</h2>
            <hr style={{ border: '1px solid black' }}></hr>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmitForm)} className='mt-2 flex flex-col justify-center items-center w-full'>
                <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem className='w-full mb-5'>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder='men_heath@gmail.com' type='email' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => {
                    return (
                      <FormItem className='w-full'>
                        <FormLabel>Mật khẩu</FormLabel>
                        <FormControl>
                          <PasswordInput placeholder='**********' id='password' autoComplete='new-password' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <div className='flex row-auto justify-between w-full mt-3'>
                  <FormField
                    control={form.control}
                    name='isKeepLogin'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md'>
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Lưu mật khẩu</FormLabel>
                      </FormItem>
                    )}
                  />
                  <a href='#' className='text-blue-600 underline text-sm cursor-h1ointer'>
                    Quên mật khẩu
                  </a>
                </div>

                <Button className='!mt-10 w-full pl-20 pr-20' type='submit'>
                  Đăng nhập
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
