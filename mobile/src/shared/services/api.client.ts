import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { storageService } from './storage.service';
import type { ApiEnvelope } from '../types/api.types';

const DEV_LAN_BASE_URL = 'http://192.168.1.5:3000/api/v1';
export const API_BASE_URL = __DEV__ ? DEV_LAN_BASE_URL : 'https://api.hobbyforge.app/api/v1';

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

export async function unwrap<T>(promise: Promise<AxiosResponse<ApiEnvelope<T>>>): Promise<T> {
  const { data } = await promise;
  if (!data.success) {
    throw new Error(data.error.message);
  }
  return data.data;
}
