const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema(
    {
        cost:{
            type:Number,
            required: true,
        },
        tenure:{
            type:String,
            required: true,
        },
        name:{
            type:String,
            required: true,
            unique: true,
        },
        title:{
            type:String,
            required:true,
        },
        properties:{
            type:Array,
            required: true,
        }
    }
);

const Subscription = mongoose.model('Subscriptions', SubscriptionSchema);
module.exports = Subscription;