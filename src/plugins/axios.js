import axios from 'axios'
//import {cacheAdapterEnhancer, throttleAdapterEnhancer} from "axios-extensions";

export default {
    install: (app, options) => {
        app.config.globalProperties.axios = axios.create({
            baseURL: import.meta.env.VITE_ROOT_API,
            //adapter: hrottleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter, { enabledByDefault: false, cacheFlag: 'useCache'}), { threshold: 2 * 1000 })
        })
    }
}
