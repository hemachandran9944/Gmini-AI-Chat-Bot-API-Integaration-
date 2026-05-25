require('dotenv').config();
if (!globalThis.crypto){
    globalThis.crypto = require('crypto');
}

const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const MogoDataBase = require('./Config/AtlasDB');

const ChatRoutes = require('./Routes/chatRoutes');


dotenv.config();
const app = express();
app.use(express.json());


app.use((req, res, next)=>{
    console.log(`${req.method} Request to: ${req.url}`);
    next();
});



app.use('/api/chat', ChatRoutes);



app.use((req, res)=>{
    res.status(404).json({status: 'Failed', message: 'Page not found'});
});

MogoDataBase();


try {
    const PORT = process.env.PORT || 5000
    app.listen(PORT, ()=>{
        console.log(` Server running on port ${PORT}`);
    });
} catch (error) {
    console.log('Server error', error.message);
}