import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
interface IData<T = any> {
    success: boolean;
    message: string;
    data?: T;
    token?: string;
}
const baseURL = '/api';
const Axios = axios.create({
    baseURL
});

// const navigate=useNavigate();
Axios.interceptors.request.use(
    config => {
        if (config.url === '/user/admin') {
            return config;
        } else {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.warn('请先登录', { progress: 1 });
                setTimeout(() => {
                    window.location.href = '/';
                }, 2500);
                return Promise.reject('请先登录');
            } else {
                config.headers.Authorization = token;
                return config;
            }
        }
    },
    error => {
        toast.error(error);
        return Promise.reject(error);
    }
);
Axios.interceptors.response.use(
    (response: AxiosResponse<IData, any>) => {
        const { data } = response;
        if (data.success) {
            return response;
        } else {
            toast.error(data.message);
            return Promise.reject(data.message);
        }
    },
    error => {
        console.log(error);
        toast.error(error.message);
        return Promise.reject(error);
    }
);
async function request<T>(config: AxiosRequestConfig): Promise<IData<T>> {
    const response = await Axios.request<IData<T>>(config);
    return response.data;
}
export default request;
