require('dotenv').config();
const mongoose = require('mongoose')
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');


//My routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');


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
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);


app.listen(port,()=>{
    console.log(`App is running at ${port}`)
})