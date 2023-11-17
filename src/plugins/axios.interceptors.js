import {TokenService} from "@/services/token.service";

export function createAxiosRequestInterceptor(axiosInstance) {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('access_token');
            if (token) {
                config.headers["Authorization"] = 'Bearer ' + token;
            }
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
            if (error.response.status === 401) {
                TokenService.removeToken()
            }
            // If error was not 401 just reject as is
            console.log(error);
            throw error
        }
    );
}