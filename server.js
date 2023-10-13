const mongoose = require('mongoose')
const dotenv =require('dotenv')

dotenv.config({ path: './config.env' });
const application=require('./application')
const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.connect(DB,{
    useNewUrlParser : true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(()=>{
    console.log('DB Connection Successful')})

const port = process.env.PORT ;
const server=application.listen(port,()=>{
    console.log(`APPLICATION RUNNING ON PORT ${port}...`)

    //=> this callback will call as soon as server start listening
})
