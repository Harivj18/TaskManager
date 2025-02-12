const mongoose = require('mongoose');

module.exports = {
    connectMongo : async () => {
        try {
            await mongoose.connect(process.env.MONGO_URI);
            console.log('connection.js : connectMongo => Mongo DB Connection Established Successfully !!');
        } catch (error) {
            console.log('connection.js: connectMongo => Error while making mongo connection from mongodb',error);
            throw error;
        }
    }
}