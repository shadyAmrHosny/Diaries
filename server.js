const mongoose = require('mongoose');
const dotenv =require('dotenv');

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: './config.env' });
const application=require('./application')
const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB,{
    useNewUrlParser : true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(()=>{
    console.log('DB Connection Successful')});

const port = process.env.PORT ;
const server=application.listen(port,()=>{
    console.log(`APPLICATION RUNNING ON PORT ${port}...`)

    //=> this callback will call as soon as server start listening
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
