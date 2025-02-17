import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { APP_CONFIG } from './config/app.config';
import { jwtVerify } from 'jose';
import { IGetUserById } from './api-be/interface';
import { EnumPermission, EnumRoleCode } from './constants/enum';
import { convertRouteToEnum } from './common/convert-permission-to-route';

const PUBLIC_ROUTES: string[] = ['/dang-nhap'];
const ROUTE_LOGIN = '/dang-nhap';
const ROUTE_HOME = '/home';
const ROUTE_ROOT = '/';

export async function middleware(request: NextRequest) {
  const currentRoute = request.nextUrl.pathname;
  console.log('ROUTE AT MIDDLEWARE::', currentRoute);

  // login page
  if (isLoginPage(currentRoute)) {
    const token = getTokenByCookies('accessToken');
    if (token) return redirectToHomePage(request);
  }

  // public route
  if (isPublicRoute(currentRoute)) {
    return NextResponse.next();
  }

  // private route
  if (isPrivateRoute(currentRoute)) {
    const token = getTokenByCookies('accessToken');
    if (!token) return redirectToLoginPage(request);

    if (isRootPage(currentRoute)) return NextResponse.redirect(new URL(ROUTE_HOME, request.url));

    // check có cookie hợp lệ không?
    const inforUser = await getPermissionByToken();
    if (!inforUser) return redirectToLoginPage(request);

    //check permission có access page không?
    const isAllow = checkPermissionWithCurrentRoute({ currentRoute, inforUser });
    if (!isAllow) return NextResponse.rewrite(new URL('/not-found', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

const isLoginPage = (route: string): boolean => route === ROUTE_LOGIN;
const isRootPage = (route: string): boolean => route === ROUTE_ROOT;

const getTokenByCookies = (key: string) => {
  const cookieStore = cookies();
  const token = cookieStore.get(key);
  return token?.value;
};

async function getPermissionByToken(): Promise<IGetUserById | false> {
  try {
    const token = getTokenByCookies('inforUser');
    if (!token) return false;

    const verify: any = await jwtVerify(token, new TextEncoder().encode(APP_CONFIG.ENV.JWT_SECRET));
    return verify.payload;
  } catch (error) {
    return false;
  }
}

const isPrivateRoute = (route: string): boolean => !PUBLIC_ROUTES.includes(route);
const isPublicRoute = (route: string): boolean => PUBLIC_ROUTES.includes(route);

const redirectToLoginPage = (request: NextRequest) => {
  const response = NextResponse.redirect(new URL(ROUTE_LOGIN, request.url));
  response.cookies.delete('accessToken');
  response.cookies.delete('permission');
  return response;
};

const redirectToHomePage = (request: NextRequest) => {
  return NextResponse.redirect(new URL(ROUTE_HOME, request.url));
};

const checkPermissionWithCurrentRoute = ({ currentRoute, inforUser }: { currentRoute: string; inforUser: IGetUserById }) => {
  if (inforUser.roleCode === EnumRoleCode.ADMIN || inforUser.roleCode === EnumRoleCode.SUPER_ADMIN) {
    return true;
  }

  if (inforUser.roleCode === EnumRoleCode.EMPLOYEE) {
    const prefix = currentRoute.split('/')[1]; // prefix: (bai-tap)
    const listPrefixAllowToAccess = inforUser.permission.details
      .map((permission) => {
        return convertRouteToEnum(permission);
      })
      .flat(Infinity) as string[];

    // nếu không phải trang home
    if (currentRoute !== '/home' && !listPrefixAllowToAccess.includes(prefix)) {
      return false;
    }
  }
  return true;
};
