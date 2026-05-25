const mongoose = require('mongoose');

const MongoDB = async() =>{
    try {
        const AtlesDB = process.env.MogoDNConnetingStirng ||'mongodb://hemachandranhema8754_db_user:F09oZcrRvHjg9hvj@ac-cduwql2-shard-00-00.62bc372.mongodb.net:27017,ac-cduwql2-shard-00-01.62bc372.mongodb.net:27017,ac-cduwql2-shard-00-02.62bc372.mongodb.net:27017/GminiAI?ssl=true&replicaSet=atlas-fmbi4s-shard-0&authSource=admin&retryWrites=true&w=majority';
        await mongoose.connect(AtlesDB);
        console.log('Cloude Atles MongoDB Connect Successfulley!');
    } catch (error) {
        console.log('MongoDB Connectig error', error.message);
        
    }
};

module.exports = MongoDB;

