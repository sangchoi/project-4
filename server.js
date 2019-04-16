require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');
const RateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();
// you can get form data
app.use(express.urlencoded({extended: false}));
// you can get normal payload from ajax axios
app.use(express.json());
app.use(helmet());

const loginLimiter = new RateLimit({
    windowMs: 5*60*1000, //5minutes
    max: 3,//how many times can someone try to log in in 5mins
    delayMs: 0, // disabled
    message: "Maximum login attempts exceeded! BYE."
});

const signupLimiter = new RateLimit({
    windowMs: 60*60*1000, //1 hour
    max: 3,
    delayMs: 0, // disabled
    message: "Maximum accounts created. Please try again later."
})

mongoose.connect('mongodb://localhost/jwt', {useNewUrlParser: true});
const db = mongoose.connection;
db.once('open', () => {
    console.log(`Connected to Mongo on ${db.host}:${db.port}`)
});
db.on('error', (err) => {
    console.log(`Database error:\n${err}`)
})

app.use('/auth/login', loginLimiter);
app.use('/auth/signup', signupLimiter);

app.use('/auth', require('./routes/auth'));
app.use('/locked', 
        expressJWT({secret: process.env.JWT_SECRET}).unless({method: 'POST'}), 
        require('./routes/locked'))


app.listen(process.env.PORT, () => {
    console.log(`You are listening to the sweet sounds of port ${process.env.PORT} in the morning...`)
})


