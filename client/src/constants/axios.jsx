import axios from 'axios'
import { serverURL } from './constan';


const api = axios.create({baseURL:serverURL});

// api.interceptors.request.use(
//     function(config) {
//         let admin = JSON.parse( localStorage.getItem("adminData"))
//         const token = admin.token
//         console.log('token is : ',token);
//         if (token) {
//             config.headers['Authorization'] = token
//         }
//         return config;
//     },
//     function(error){
//         return Promise.reject(error);
//     }
// );

export default api
