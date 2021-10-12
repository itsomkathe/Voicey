const axios = require('axios');

const api = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
    }
});

export const sendOTP = (data)=> api.post('/api/send-otp', data);

export default api;