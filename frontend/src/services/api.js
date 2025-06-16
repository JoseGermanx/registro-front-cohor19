
import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:10000"
})

api.interceptors.request.use((config)=> {
    const token = localStorage.getItem("token") // obtener el token del localStorage
    // si el token existe, agregarlo a los headers de la peticion
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

export default api