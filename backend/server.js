require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
const router = require('./routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Connected');
});

mongoose.connection.on('error', (err) => {
    console.log('Error', err);
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin: ['http://localhost:3000']
}));
app.use(express.json({limit : '10mb'}));
app.use(router);
app.get('/',(req,res,next)=>{
    res.send('Welcome to voicey');
})

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
});