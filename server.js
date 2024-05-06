// package imports
// const express = require('express')
import express from 'express'
import 'express-async-errors'
import dotenv from 'dotenv'
import colors from 'colors';
import cors from 'cors';
import morgan from 'morgan';


//files import
import connectDb from './config/db.js';

// routes imports
import testRoutes from './routes/testroute.js'
import authroutes from './routes/authRoutes.js'
import errorMiddleware from './middlewares/errorMiddleware.js';

//dot env config
dotenv.config()

//mongodb connection
connectDb();


//rest object
const app= express()

//middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
  


//routes

// app.get('/', (req, res)=>{
//     res.send("welcome to job app")
    
// })
app.use('/api/v1/test', testRoutes)
app.use('/api/v1/auth', authroutes)


//validation middleware
app.use(errorMiddleware)

//port
const port =process.env.PORT || 8080

//listen
app.listen(8080, ()=>{
    console.log(`node is running in ${process.env.DEV_MODE} Node on port no ${port} `.bgWhite.blue)
})