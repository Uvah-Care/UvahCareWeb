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
        payment:{
            type:Boolean,
            require: true,
        },
        payment_records:{
            type:Array
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('Users', UserSchema);

module.exports = User;