require('dotenv').config();
const mongoose = require('mongoose')
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');

const app = express();

const port = 4000;


//db connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=> {
    console.log("DB CONNECTED");
})

//middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//My routes
app.use('/api',authRoutes)



app.listen(port,()=>{
    console.log(`App is running at ${port}`)
})