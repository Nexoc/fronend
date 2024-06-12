import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Vuex from 'vuex'


axios.defaults.baseURL = 'http://localhost:8001'

// axios.defaults.baseURL = 'http://localhost:8001/api/v1'

store.dispatch("token_storage")


// REFRESH TOKEN
async function refreshToken() {
    const refreshToken= localStorage.getItem('refresh_token');

    try {
        const responce = await axios.post('/api/v1/auth/refresh', {
            token: refreshToken
        });

        const newAccessToken = responce.data.accessToken;
        return newAccessToken;
    } catch (error) {
        console.error('Unable to refresh token', error);
        throw error;
    }
}

// request interceptor
axios.interceptors.request.use(
    async config => {
        const accessToken = localStorage.getItem('access_token');
        if(accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;            
        }

        return config;
    },
    error => {
        Promise.reject(error);
    }
);

// response interceptor
axios.interceptors.response.use(
    responce => {
        return responce;
    },
    async error =>
     {
        const originalRequest = error.config;

        if (error.responce.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newAccessToken = await refreshToken();
                axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
                
            } catch(err) {
                // error by refresh token
                console.log('Token refresh failed', err);
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);


const app = createApp(App);

app.config.globalProperties.$axios = axios;
app.use(store).use(router).use(Vuex).mount('#app')





















