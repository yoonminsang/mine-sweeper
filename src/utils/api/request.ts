import axios, { AxiosInstance, AxiosResponse } from 'axios';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface IResetToken {
  requestAgain: boolean;
  newAccessToken: string;
}

const client: AxiosInstance = axios.create();

client.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/api' : '';
client.defaults.withCredentials = true;

const multipartHeader = { 'Content-Type': 'multipart/form-data' };
const applicationHeader = { 'Content-Type': 'application/json' };

async function request<T>(method: Method, url: string, data?: unknown, multipart?: boolean): Promise<AxiosResponse<T>> {
  const contentType = multipart ? multipartHeader : applicationHeader;
  try {
    const accessToken = window.localStorage.getItem('user') || '';
    const res = await client({
      method,
      url,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...contentType,
      },
      data,
    });

    if (res.data.requestAgain) {
      const { newAccessToken } = res.data as IResetToken;
      if (newAccessToken) {
        window.localStorage.setItem('user', newAccessToken);
      }

      const newResult = await request<T>(method, url, data);
      return newResult;
    }

    if (res.data.expiredRefreshToken) {
      // TODO
    }

    return res;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401) {
        window.localStorage.removeItem('user');
        window.location.href = '/';
      }
    }
    throw err;
  }
}

export default request;
