const mongoose = require('mongoose');

const ExpertSchema = new mongoose.Schema(
    {
        exp_no:{
            type:String,
            required: true,
            unique: true,
        },
        name:{
            type:String,
            required: true,
        },
        experience:{
            type:String,
            required: true,
        },
        specialization:{
            type:String,
            required: true,
        },
        certification:{
            type:String,
            required:true,
        },
        about:{
            type:String,
            required: true,
        }
    }
);

const Expert = mongoose.model('experts', ExpertSchema);
module.exports = Expert;