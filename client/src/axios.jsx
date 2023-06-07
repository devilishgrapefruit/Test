import axios from "axios"

const host = axios.create({
    baseURL: process.env.MY_DEPLOY_SERVER_URI,
})

host.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config
})

export default host;