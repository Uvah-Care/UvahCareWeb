const Razorpay = require('razorpay');
// const RegForm = require('../models/form-response-model');
const User = require('../models/user-model');

var instance = new Razorpay({
    key_id: 'rzp_test_cnNgV26a1zX99m',
    key_secret: 'JA9J4N3QLEcTTouuDfytaZYI',
});

module.exports.type = function(req,res){
    return res.render('choose-sub');
}

module.exports.user_details = function(req,res){
    console.log(req.params.cost);
    if(req.params.cost==="499"){
        return res.render('user-details-1', {user_profile: req.user,cost:499});
    }
    else if(req.params.cost==="1999"){
        return res.render('user-details-2', {user_profile: req.user,cost:1999});
    }
    else if(req.params.cost==="2999"){        
        return res.render('user-details-3', {user_profile: req.user,cost:2999});
    }
}

module.exports.save_user_details = async function(req,res){
    // save user details here (ph. no, age, profession)
    console.log(req.body, req.params.cost);
    try{
        let user = await User.findById(req.user.id);
        user.phone_no = req.body['tel'];
        user.age = req.body['age'];
        user.profession = req.body['profession'];
        user.medical_problem = req.body['medical-problem'];
        user.save();
    }
    catch(error){
        console.log('error in saving user data: ',error);
    }
    res.redirect(`/subscribe/pay/${req.params.cost}`);
}


module.exports.payment = async function(req,res){
    // console.log("order request id",req.body)
    res.render('razorpay',{user_profile: req.user, cost: req.params.cost});
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

    //verify payment
    let body=req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;
   
    var crypto = require("crypto");
    var expectedSignature = crypto.createHmac('sha256', 'WDF7fn4fTm7XyuZum5eZAjm0')
                                     .update(body.toString())
                                     .digest('hex');
    var response = {"signatureIsValid":"false"}
    if(expectedSignature === req.body.response.razorpay_signature)
        response={"signatureIsValid":"true"}
    
    try{
        let f_user = await User.findById(req.user.id);
        let current = new Date;
        //update payment records
        f_user.subscription = req.params.cost;
        if(f_user.payment_records){
            f_user.payment_records.push(
                {
                    amount: req.params.cost,
                    payment_id: req.body.response.razorpay_payment_id,
                    date: current.toDateString(),
                }
            )
        }
        else{
            f_user.payment_records = [{
                amount: req.params.cost,
                payment_id: req.body.response.razorpay_payment_id,
                date: current.toDateString(),
            }];
        }
        await f_user.save();
    }
    catch(error){
        console.log('error in updating user: ',error);
    }
    res.send('Payment Verified');
}
