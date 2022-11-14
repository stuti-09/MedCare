const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const path = require('path')
const dotenv=require('dotenv')
const passport=require('passport')
const connectDB= require('./db/connect')
const morgan = require('morgan') //request logger middleware
const session=require('express-session')
const MongoStore=require('connect-mongo')
const indexroutes=require('./routes/index')
const authroutes=require('./routes/auth')
const medicinesroutes=require('./routes/medicines')


//load config
dotenv.config({path:'./config/config.env'})
//passport

require('./config/passport')(passport)

connectDB()

const app=express()
app.use(express.urlencoded({extended:false}))
app.use(express.json())
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}
//ejs
app.set('view engine', 'ejs');
app.set('views','views');

//session 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI,}),
  }))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//routes
app.use('/',indexroutes)
app.use('/auth',authroutes)
app.use('/medicines',medicinesroutes)
//static folder

app.use(express.static('public'));
app.use(expressLayouts);

const PORT= process.env.PORT||3000
app.listen(PORT,console.log(`Server runnimg in ${process.env.NODE_ENV} mode on port ${PORT}`))