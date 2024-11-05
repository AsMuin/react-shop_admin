import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const baseURL='/api'
const request = axios.create({
    baseURL,
})
const navigate=useNavigate();
request.interceptors.request.use((config)=>{
    if(config.url==='/admin'){
        return config
    }else{
        const token =localStorage.getItem('token');
        if(!token){
            navigate('/');
            toast.warn('请先登录');
            return Promise.reject('请先登录');
        }else{
            config.headers.Authorization=token;
            return config;
        }
    }
},(error)=>{
    toast.error(error);
    return Promise.reject(error)
})
request.interceptors.response.use(response=>{
    const {data}=response;
    if(data.success){
        return data;
    }else{
        toast.error(data.message);
        return Promise.reject(data.message);
    }
},(error)=>{
    toast.error(error);
    return Promise.reject(error)
})
export default request;