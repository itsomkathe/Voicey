const axios = require('axios');

const api = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
    headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
    }
});

export const sendOTP = (data)=> api.post('/api/send-otp', data);
export const verifyOTP = (data)=> api.post('/api/verify-otp', data);

export default api;