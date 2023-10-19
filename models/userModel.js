const mongoose=require('mongoose')
const validator = require('validator');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'USER MUST HAVE A NAME'],
        minlength:3,
        validate:[validator.isAlpha, 'NAME MUST ONLY CONTAIN CHARACTERS']
    },
    gender:{
        type:String,
        required:true,
        enum:{
          values: ['male','female'],
            message: 'GENDER IS EITHER: MALE OR FEMALE'
        }
    },
    birthdate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                //1990-10-12
                // Check if the birthdate is within a valid range
                const currentDate = new Date();
                const minDate = new Date(currentDate.getFullYear() - 100, currentDate.getMonth(), currentDate.getDate());
                const maxDate = new Date(currentDate.getFullYear() - 13, currentDate.getMonth(), currentDate.getDate());
                return value >= minDate && value <= maxDate;
            },
            message: 'BIRTHDATE MUST BE BETWEEN 13 AND 100 YEAS AGO.',
        },
        username:{
            type: String,
            required:[true,'USER MUST HAVE A USERNAME'],
            unique:true,
            validate: {
                validator: function(value) {
                    return /^[^\d][\w\d]+$/.test(value);
                },
                message: 'Invalid username format',
            },
        },
        photo: String,
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: 8,
            select: false
        },
        passwordConfirm: {
            type: String,
            required: [true, 'Please confirm your password'],
            validate: {
                // This only works on CREATE and SAVE!!!
                validator: function(el) {
                    return el === this.password;
                },
                message: 'Passwords are not the same!'
            }
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
        active: {
            type: Boolean,
            default: true,
            select: false
        }

    }
})








const User=mongoose.model('User',userSchema);

module.exports = User;

// const birthdate = new Date('1990-10-12'); // Replace with your desired birthdate
//
// const formattedBirthdate = birthdate.toISOString().split('T')[0];
//
// console.log(formattedBirthdate); // Output: 1990-10-12





//
//
// const userSchema = new Schema({
//     username: {
//         type: String,
//         validate: {
//             validator: function(value) {
//                 return /^[^\d][\w\d]+$/.test(value);
//             },
//             message: 'Invalid username format',
//         },
//     },
// });
// username: {
//     type: String,
//         required: true,
//         unique: true,
//         validate: {
//         validator: function (value) {
//             // Check if the username starts with a character and contains only alphanumeric characters
//             return /^[A-Za-z][A-Za-z0-9]*$/.test(value);
//         },
//         message: 'Username must start with a character and can only contain alphanumeric characters.',
//     },
