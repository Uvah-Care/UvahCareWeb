const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: true,
        },
        email:{
            type:String,
            require: true,
            unique: true,
        },
        password:{
            type:String,
            require: true,
        },
        subscription:{
            type:String,
        },
        payment_records:{
            type:Array
        },

        phone_no:{
            type:String
        },
        age:{
            type:Number
        },
        profession:{
            type:String
        },
        medical_problem:{
            type:String
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('Users', UserSchema);

module.exports = User;