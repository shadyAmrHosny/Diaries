const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({
    auther:String,
    text:{
        type: String,
        required: [true, 'A POST MUST HAVE A TEXT'],
        // minlength:1,
        maxlength:3200
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        immutable: true // Field is unmodifiable
    },
    likes: {
        type:Number,
        default:0
    }
})




const Post=mongoose.model('Post',postSchema);


module.exports = Post;



// const userSchema = new mongoose.Schema({
//     privateField: {
//         type: String,
//         required: true,
//         immutable: true, // Field is unmodifiable
//         select: false, // Field is not returned in query results
//     },
//     // other fields in your schema
// });
//
// // Define an instance method that modifies the field
// userSchema.methods.modifyPrivateField = function (value) {
//     this.privateField = value;
// };
