const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cookies = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const {connectMongo} = require('./config/connection');
const userRoutes = require('./routes/userRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')
dotenv.config({path: './config/.env'})
const port = process.env.PORT || 8100;


app.use(bodyparser.json({limit: '15mb'}))
app.use(cookies())
app.use(cors({
    origin: "*",
    credentials: true
}));


app.use('/taskManager/protectedRoutes',userRoutes)
app.use('/taskManager/user', userRoutes);
app.use('/taskManager/dashboard', dashboardRoutes);


app.listen(port, (err) => {
    if (err) {
        console.log(`app.js => Error while listening on PORT : ${port}`,err);
        throw err
    }
    console.log(`app.js => Server is listening on the PORT: ${port}`);
    connectMongo()
})