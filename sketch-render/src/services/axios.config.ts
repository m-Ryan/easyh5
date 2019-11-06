import axios, { AxiosResponse } from 'axios';
import { AxiosRequestConfig } from 'axios';
export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(async function(config) {
	try {
	} catch (error) {

	} finally {
		return config;
	}
});

axiosInstance.interceptors.response.use(function<T>(
  res: AxiosResponse<T>
) {
  return new Promise((resolve, reject) => {
		return resolve(res);
  });
});


export const request = {
	async get<T>(url: string, config?: AxiosRequestConfig | undefined) {
    return axiosInstance.get<T>(url, config).then(data => data.data)
  },
  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig | undefined
  ) {
    return axiosInstance.post<T>(url, data, config).then(data => data.data);
  }
}
