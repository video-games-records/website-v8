import xior from 'xior';
import { createAxiosRequestInterceptor, createAxiosResponseInterceptor } from './axios.interceptors'
import cachePlugin from 'xior/plugins/cache';

export const instance = xior.create({
    baseURL: import.meta.env.VITE_ROOT_API,
});

instance.plugins.use(
    cachePlugin({
        enableCache: false,
        cacheItems: 100,
        cacheTime: 1e3 * 60 * 5,
    })
);

createAxiosRequestInterceptor(instance);
createAxiosResponseInterceptor(instance);

export default {
    install: (app) => {
        app.config.globalProperties.axios = instance
    }
}