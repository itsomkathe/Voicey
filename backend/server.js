require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const router = require('./routes');
app.use(express.json());
app.use(router);

app.get('/',(req,res,next)=>{
    res.send('Welcome to voicey');
})

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
});