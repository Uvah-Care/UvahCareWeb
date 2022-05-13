const Razorpay = require('razorpay');
// const RegForm = require('../models/form-response-model');
const User = require('../models/user-model');
const Subscription = require('../models/subscription-model');
const Expert = require('../models/expert-model');

var instance = new Razorpay({
    key_id: 'rzp_test_cnNgV26a1zX99m',
    key_secret: 'JA9J4N3QLEcTTouuDfytaZYI',
});

module.exports.type = function(req,res){
    return res.render('choose-sub',{user: req.user});
}

module.exports.user_details = function(req,res){

    console.log(req.params.sub_name);
    return res.render('user-details', {user: req.user, sub_name: req.params.sub_name});
    
    // if(req.params.cost==="499"){
    //     return res.render('user-details-1', {user: req.user,cost:499});
    // }
    // else if(req.params.cost==="1999"){
    //     return res.render('user-details-2', {user: req.user,cost:1999});
    // }
    // else if(req.params.cost==="2999"){        
    //     return res.render('user-details-3', {user: req.user,cost:2999});
    // }
}

module.exports.save_user_details = async function(req,res){
    // save user details here (ph. no, age, profession)
    console.log(req.body, req.params.sub_name);
    try{
        let user = await User.findById(req.user.id);
        user.phone_no = req.body['tel'];
        user.age = req.body['age'];
        user.profession = req.body['profession'];
        user.medical_problem = req.body['medical-problem'];
        user.timming = req.body['timming'];
        user.save();
    }
    catch(error){
        console.log('error in saving user data: ',error);
    }
    res.redirect(`/subscribe/pay/${req.params.sub_name}`);
}


module.exports.payment = async function(req,res){
    // console.log("order request id",req.body)
    try{
        const f_sub = await Subscription.findOne({name:req.params.sub_name}); 
    
        res.render('razorpay',{user: req.user, subscribe: f_sub});
    }
    catch(error){
        console.error("error in finding the req. subscription: ", error);
    }
}

module.exports.create_payment_order= async function(req,res){
    var options = {
      amount: req.params.cost,  
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
        let f_sub = await Subscription.findOne({name: req.params.sub_name});
        let current = new Date;
        //update payment records
        f_user.subscription = req.params.sub_name;
        if(f_user.payment_records){
            f_user.payment_records.push(
                {
                    amount: f_sub.cost,
                    subscription: f_sub.name,
                    title: f_sub.title,
                    payment_id: req.body.response.razorpay_payment_id,
                    date: current.toDateString(),
                }
            )
        }
        else{
            f_user.payment_records = [{
                amount: f_sub.cost,
                subscription: f_sub.name,
                title: f_sub.title,
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



// module.exports.make_new_expert= async function(req,res){
//     const exp = {
//         exp_no: "exp-2",
//         name: "Dr. Reena Arora",
//         experience: "20+ years",
//         specialization: "ayurvedic medicines",
//         certification:"Morarji Desai National Institute of Yoga",
//         about: "Dr Reena Arora is the Director of Ayurvedic Clinic. It was conceptualized in the year 2005. She obtained Bachelor of Ayurvedic Medicine and Surgery (BAMS) degree from MD University Rohtak in 1996. She was among the top 10 aspirants who secured admission in BAMS from Haryana State. She completed Post Graduate Diploma in Panchkarma from Tilak Ayurvedic College, Pune University in the year 2003. She has also done Certificate Course in Yoga from Morarji Desai Institute of Yoga, Delhi.<br><br> She is passionate and avid practitioner of ayurveda for more than twenty years and cured many patients suffering from chronic diseases through ayurvedic medicines. She also prescribes specific diet according to disease and prakarti of the patient.<br><br>She has won many accolades for promoting Ayurveda. She has won first prize in an article writing contest of Ministry of AYUSH on the topic of prevention and management of diabetes through ayurveda in context of modern lifestyle. She has also participated in International and National conferences. She won outstanding paper award on “PCOD” from Vaidyaratanam. She has also been a regular member of various health shows on All India Radio and Doordarshan. She is an active member of NASYA. She actively participates in the events and conferences related to ayurveda and yoga.<br>",
//     }
//     try{
//         console.log(exp);
//         let f_exp = await Expert.create(exp);
//         console.log(f_exp);
//         res.send("new expert saved");
//     }
//     catch(error){
//         console.error("error in making new expert: ",error);
//         res.send("new expert not-saved");    
//     }
// }


// module.exports.make_new_sub= async function(req,res){
//     const sub = {
//         cost: 14999,
//         tenure: "monthly",
//         name: "sub-8",
//         title:"one-One Yoga + diet consultation pack+ayurvedic Doctor's health Consultation (disease based full pack) - Rs 14999/month",
//         properties: [
//             "Unlimited  On Demand Ayurvedic doctor consultancies",
//             "Yoga sessions",
//             "Strength and Flexibility Training",
//             "Meditation and Pranayama Session",
//             "Disease specific Yoga ( Yoga Therapy)",
//             "Diet planning by Ayurvedic Nutritionist",
//             "Know your dosha , and heal",
//             "Lifestyle Management",
//             "Mindfulness /Spiritual Awakening Sessions",
//             "Self Healing Sessions",
//             "Inner Peace and Consciousness practice"
//         ],
//     }
//     try{
//         let f_sub = await Subscription.create(sub);
//         console.log(f_sub);
//     }
//     catch(error){
//         console.error("error in making new subscription: ",error)
//         res.send("new subscription not-saved");    
//     }
//     res.send("new subscription saved");
// }