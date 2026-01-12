import axios from 'axios'

// ✅ Create Axios instance
const api = axios.create({
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
})

// ✅ Optional: Interceptors for auth token, errors, etc.
api.interceptors.request.use((config) => {
    // Example: Add token from localStorage
    // const token = localStorage.getItem('token')
    // if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})



export default api
