const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = () => {
    mongoose.connect(db, {
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    }).then(() => {
        console.log("mongo DB Connected ")
    }).catch( err => console.error(err.message));
}

module.exports = connectDB;