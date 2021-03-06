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
export const createAccount = (data)=> api.post('/api/createaccount', data);
export const signIn = (data)=> api.post('/api/signin', data);
export const addPhoto = (data)=> api.post('/api/addphoto', data);
export const getRooms = ()=> api.get('/api/getrooms');
export const createRoom = (data)=> api.post('/api/createroom', data);
export const getRoom = (roomId)=> api.get(`/api/rooms/${roomId}`);
export default api;