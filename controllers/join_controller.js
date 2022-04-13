const Razorpay = require('razorpay');
const RegForm = require('../models/form-response-model');

var instance = new Razorpay({
    key_id: 'rzp_test_cnNgV26a1zX99m',
    key_secret: 'JA9J4N3QLEcTTouuDfytaZYI',
});
  

module.exports.registerForm = async function(req,res){
    // let x = await RegForm.findOne({email: 
    //     "hello@mail.com"});
    // console.log(x);
    return res.render('join');
}

module.exports.register = async function(req,res){
    // console.log(req.body);
    // await RegForm.create(req.body);
    console.log('form submitted--> data registered');
    return res.redirect('/join/pay');
}

module.exports.create_payment_order= async function(req,res){
    var options = {
      amount: 49900,  
      currency: "INR",
      receipt: "rcp1"
    };
    try{
      let order = await instance.orders.create(options)
      console.log(order);
      res.send( {orderId : order.id } )
    }
    catch(error){
    console.log("error in creating order:", error);
    }
}

module.exports.verify_payment= async function(req,res){
    let body=req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;
   
    var crypto = require("crypto");
    var expectedSignature = crypto.createHmac('sha256', 'WDF7fn4fTm7XyuZum5eZAjm0')
                                     .update(body.toString())
                                     .digest('hex');
    var response = {"signatureIsValid":"false"}
    if(expectedSignature === req.body.response.razorpay_signature)
        response={"signatureIsValid":"true"}
    res.send('Payment Verified');
}

module.exports.payment = async function(req,res){
//     // console.log("order request id",req.body)

    res.render('razorpay');
}