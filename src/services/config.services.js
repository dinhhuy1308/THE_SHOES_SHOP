import axios from "axios";
import { getLocalStorage } from "../utils/LocalStorage/LocalStorage";
import { ACCESS_TOKEN } from "../contants";

const BASE_URL = 'https://shop.cyberlearn.vn/api';

export const axiosWithAuth = axios.create({
    baseURL: BASE_URL,
    timeout: 180_000,
}) 

axiosWithAuth.interceptors.request.use((config)=>{
    config.headers = {
        Authorization: `Bearer ${getLocalStorage(ACCESS_TOKEN)}`,
    }

    return config;
}, (err) => {
    return Promise.reject(err)
})


