const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema(
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
        ph_number:{
            type:String,
            required: true,
        },
        age:{
            type:Number,
            require:true,
        },
        gender:{
            type:String,
            required: true,
        },
        profession: String,
        healthResolution: String,
        wakeUpNow: String,
        wakeUpAfter: String,
        goals: String,
        expectations: String,
        sacrifice: String,
        medicalHistory: String,
        otherquestions: String
    },
    {
        timestamps: true
    }
);

const RegForm = mongoose.model('form-responsse', FormSchema);

module.exports = RegForm;