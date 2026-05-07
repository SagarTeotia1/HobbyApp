import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { storageService } from './storage.service';

const API_BASE_URL = __DEV__
  ? 'http://10.0.2.2:3000/api/v1'
  : 'https://api.hobbyforge.app/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = storageService.getJWT();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // TODO: trigger re-auth flow
    }
    return Promise.reject(error);
  },
);

export interface ApiSuccess<T> {
  success: true;
  data: T;
  meta?: { pagination?: { page: number; limit: number; total: number } };
}

export interface ApiFailure {
  success: false;
  error: { code: string; message: string; details?: unknown };
}

export type ApiEnvelope<T> = ApiSuccess<T> | ApiFailure;

export async function unwrap<T>(promise: Promise<{ data: ApiEnvelope<T> }>): Promise<T> {
  const { data } = await promise;
  if (!data.success) {
    throw new Error(data.error.message);
  }
  return data.data;
}
