import {useSecurityStore} from "@/store/security";

export function createAxiosRequestInterceptor(axiosInstance) {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('access_token');
            if (token) {
                config.headers["Authorization"] = 'Bearer ' + token;

            }
            config.headers['Accept-Language'] = localStorage.lang;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
}


export function createAxiosResponseInterceptor(axiosInstance) {
    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalConfig = error.config;
            if (error.response.status === 401  && !originalConfig._retry) {
                originalConfig._retry = true;
                if (error.config.url.includes('/token/refresh')) {
                    await useSecurityStore().logout();
                    throw error
                } else {
                    try{
                        await useSecurityStore().refreshToken();
                        return axiosInstance(originalConfig);
                    } catch (e) {
                        throw error
                    }
                }
            }
            throw error
        }
    );
}
