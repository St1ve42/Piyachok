import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL as string,
    headers: {
        Accept: 'application/json'
    }
})

