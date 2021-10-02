require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use('/',(req,res,next)=>{
    res.send('Welcome to voicey')
})

app.listen(()=>{
    console.log(`listening on port ${PORT}`)
});