const express=require('express');
const morgan = require('morgan');

const appError=require('./utils/AppError')
const globalErrorHandler=require('./controllers/errorController')

const postRouter=require('./routes/postRoutes')

const application=express();

application.use(express.json({ limit: '10kb' }));

// Development logging

if (process.env.NODE_ENV==='development') {
    application.use(morgan('dev'))
}

application.use('/api/v1/posts',postRouter)



application.all('*',(req, res, next)=>{
    next(new appError(`can't find ${req.originalUrl}`,404))
})


application.use(globalErrorHandler)

module.exports=application;