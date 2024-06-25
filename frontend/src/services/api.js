import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001', // Adjust this to your backend URL
});

api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token'); // Or however you are storing the token
      console.log(token)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
export default api;



// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;
