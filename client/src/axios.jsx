import axios from "axios"

const host = axios.create({
    baseURL: 'http://localhost:7000' + '/server',
})

host.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config
})

export default host;