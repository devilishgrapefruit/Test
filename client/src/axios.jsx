import axios from "axios"

const host = axios.create({
    baseURL: 'https://board-games-kcvd.onrender.com' + '/server',
})

host.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config
})

export default host;