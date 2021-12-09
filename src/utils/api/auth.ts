import { ILogUser, IUser } from '@/types/auth';
import { IError } from '@/types/error';
import request from './request';

export const loginApi = (email: string, password: string) =>
  request<ILogUser | IError>('POST', '/api/auth/login', { email, password });

export const signupApi = (email: string, password: string, nickname: string) =>
  request<ILogUser | IError>('POST', '/api/auth/signup', { email, password, nickname });

export const logoutApi = () => request('DELETE', '/api/auth');

export const checkAuthApi = () => request<IUser | null>('GET', '/api/auth');
