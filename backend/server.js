require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
const router = require('./routes');
app.use(express.json());
app.use(router);

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

mongoose.connection.on('connected', () => {
    console.log('Connected');
});

mongoose.connection.on('error', (err) => {
    console.log('Error', err);
});

app.get('/',(req,res,next)=>{
    res.send('Welcome to voicey');
})

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
});