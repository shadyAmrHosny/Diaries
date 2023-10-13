const express=require('express');
const morgan = require('morgan');

const postRouter=require('./routes/postRoutes')

const application=express();

application.use(express.json({ limit: '10kb' }));

// Development logging

if (process.env.NODE_ENV==='development') {
    application.use(morgan('dev'))
}

application.use('/api/v1/posts',postRouter)


module.exports=application;