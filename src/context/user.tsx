'use client';

import { createContext, useContext, useState } from 'react';
import { getMe } from '@/api-be/client';
import { IGetUserById } from '@/api-be/interface';
import useSWR from 'swr';
import { SignJWT } from 'jose';
import { CookieUtilsClient } from '@/utils/cookie/client';
import { APP_CONFIG } from '@/config/app.config';

interface IProps {
  children: React.ReactNode;
}

export type GlobalContent = {
  dataContext: IGetUserById | null;
  setDataContext: (value: IGetUserById) => void;
};

export const UserGlobalContext = createContext<GlobalContent>({
  dataContext: null,
  setDataContext: () => {},
});

export const useUserContext = () => useContext(UserGlobalContext);

export const UserProvider = (props: IProps) => {
  const [user, setUser] = useState<IGetUserById | null>(null);
  const secret = new TextEncoder().encode(APP_CONFIG.ENV.JWT_SECRET);
  const SECONDS_IN_ONE_MINUTE = 60000;

  useSWR(getMe.key, getMe.fetch, {
    refreshInterval: APP_CONFIG.IS_LOCAL ? 999999 : SECONDS_IN_ONE_MINUTE,
    onSuccess(data) {
      if (JSON.stringify(user) !== JSON.stringify(data)) {
        setUser(data);
        new SignJWT({ ...data })
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          //.setExpirationTime('2h')
          .sign(secret)
          .then((token) => {
            CookieUtilsClient.add('inforUser', token);
          });
      }
    },
  });

  return (
    <>
      <UserGlobalContext.Provider value={{ dataContext: user, setDataContext: setUser }}> {props.children}</UserGlobalContext.Provider>
    </>
  );
};
