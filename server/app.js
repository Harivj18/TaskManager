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


app.use(express.json())
app.use(cookies())

console.log('process.env.CLIENT_URL1',process.env.CLIENT_URL1);
console.log('process.env.CLIENT_URL2',process.env.CLIENT_URL2);
console.log('process.env.CLIENT_URL3',process.env.CLIENT_URL3);

app.use(cors({
    origin: [
        "https://task-manager-ui-eight.vercel.app",
        "https://task-manager-qegtyr7ze-harivj18s-projects.vercel.app",
        "https://task-manager-ui-git-main-harivj18s-projects.vercel.app"
    ],
    credentials: true
}));
app.use(bodyparser.json({limit: '15mb'}))

app.get('/hari', (req, res) => {
    res.write('Its working')
})
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