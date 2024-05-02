import { TokenService } from './token.service'
import xior from 'xior';
import { createAxiosResponseInterceptor } from '@/plugins/axios.interceptors'

const axiosInstance = xior.create({
    baseURL: import.meta.env.VITE_ROOT_API,
});

createAxiosResponseInterceptor(axiosInstance);

class AuthenticationError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
    }
}

const AuthenticationService = {

    /**
     *
     * @param email
     * @param username
     * @param password
     * @param rules_accepted
     * @returns {Promise<AxiosResponse<any>>}
     */
    register: async function(email, username, password, rules_accepted) {
        const requestData = {
            method: 'post',
            url: "/api/users/registration/register",
            data: {
                email : email,
                username: username,
                password: password,
                rules_accepted: rules_accepted
            }
        }
        return axiosInstance.request(requestData).then(response => {
            return response;
        })
    },
    /**
     *
     * @param token
     * @returns {Promise<AxiosResponse<any>>}
     */
    confirm: function(token) {
        const requestData = {
            method: 'post',
            url: "/api/users/registration/confirm",
            data: {
                token : token
            }
        }
        return axiosInstance.request(requestData).then(response => {
            return response;
        })
    },

    /**
     * Login the user and store the access token to TokenService.
     * @param email
     * @param password
     * @returns {Promise<*>}
     */
    login: async function(email, password) {
        const requestData = {
            method: 'post',
            url: "/api/login_check",
            data: {
                username : email,
                password : password
            }
        }

        try {
            const response = await axiosInstance.request(requestData)

            TokenService.saveToken(response.data.token)
            TokenService.saveRefreshToken(response.data.refresh_token)

            return response.data;

        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.message)
        }
    },

    /**
     *
     * @param email
     * @returns {Promise<T>}
     */
    resettingSendEmail: function(email) {
        const requestData = {
            method: 'post',
            url: "/api/users/resetting/send-email",
            data: {
                username : email
            }
        }
        return axiosInstance.request(requestData).then(response => {
            return response;
        })
    },

    /**
     *
     * @param token
     * @param password
     * @returns {Promise<T>}
     */
    resettingReset: function(token, password) {
        const requestData = {
            method: 'post',
            url: "/api/users/resetting/reset",
            data: {
                token : token,
                password: password
            }
        }
        return axiosInstance.request(requestData).then(response => {
            return response;
        })
    },

    /**
     * Refresh the access token.
     **/
    refreshToken: async function() {
        const refreshToken = TokenService.getRefreshToken()

        let data = new FormData();
        data.set('refresh_token', refreshToken);

        const requestData = {
            method: 'post',
            url: import.meta.env.VITE_ROOT_API + "/token/refresh",
            data: data
        }
        try {
            const response = await axiosInstance.request(requestData)
            TokenService.saveToken(response.data.token);
            TokenService.saveRefreshToken(response.data.refresh_token);
            return true;

        } catch (error) {
           return false;
        }

    },

    /**
     * Logout the current user by removing the token from storage.
     *
     **/
    logout: async function() {
        // Remove the token and remove Authorization header from Api Service as well
        TokenService.removeToken()
        TokenService.removeRefreshToken()
        return true;
    }
}

export default AuthenticationService

export { AuthenticationService, AuthenticationError }
