import axios from 'axios'
import { createAxiosRequestInterceptor, createAxiosResponseInterceptor } from './axios.interceptors'
//import {cacheAdapterEnhancer, throttleAdapterEnhancer} from "axios-extensions";

const instance = axios.create({
    baseURL: import.meta.env.VITE_ROOT_API,
    //adapter: hrottleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter, { enabledByDefault: false, cacheFlag: 'useCache'}), { threshold: 2 * 1000 })
});

createAxiosRequestInterceptor(instance);
createAxiosResponseInterceptor(instance);

export default {
    install: (app) => {
        app.config.globalProperties.axios = instance
    }
}