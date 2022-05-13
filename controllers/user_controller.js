// const req = require('express/lib/request');
// const res = require('express/lib/response');
const User = require('../models/user-model');
const Subscription = require('../models/subscription-model');

//render signin page
module.exports.signin = function(req,res){
    return res.render('signin');
}
//render signup page
module.exports.signup = function(req,res){
    return res.render('signup');
}

//if user is subscribed redirect to profile else to form
module.exports.login_check = function(req,res){
    if(req.user.subscription){
        res.redirect('/user/profile');
    }
    else{
        //send them for payment
        res.redirect('/subscribe/type');
    }
}

//if login fails
module.exports.login_failure = function(req,res){
    return res.render('fail401');
}

// module.exports.create_user = function(req,res){
//     User.create(
//         {
//             name: req.user.displayName,
//             email: req.user.email,
//             password: "hello-12345!",
//         },(error, user_inst)=>{
//             if(error){
//                 console.log('error in creating user:',error);
//             }
//             else{
//                 console.log('User created in database');
//             }
//             return res.send(user_inst);
//         }
//     );
// }

module.exports.create_password_render = function(req, res){
    res.render('new-password', 
        {
            user_profile: req.user,
            user_type: "NEW",
    });
    // res.send('<h1>New Password for user will be created here</h1>');
}
module.exports.change_password_render = function(req, res){
    res.render('new-password', 
        {
            user: req.user,
            user_type: "OLD",
    });
    // res.send('<h1>New Password for user will be created here</h1>');
}

module.exports.create_password= async function(req, res){
    if(req.body.password === req.body.confirm_password){
        let f_user = await User.findByIdAndUpdate(req.user.id,
            {
                name: req.user.name,
                email: req.user.email, 
                password: req.body.password,
            },
            {new: true}    
        )
        // console.log("user password changed: ", f_user);
        if(req.body.user_type === "OLD"){
            res.redirect('/user/profile');
        }
        else if(req.body.user_type === "NEW"){
            res.redirect('/join/pay');
        }
    }
    else{
        res.redirect('back');
    }
}

//render profile page
module.exports.profile= async function(req, res){
    // console.log(req.user);
    try{
        const f_sub = await Subscription.findOne({name: req.user.subscription});
        res.render('profile', {user: req.user, subscribe: f_sub});
    }
    catch(error){
        console.error('error in getting subscription: ',error )
    }
}
// logout user
module.exports.logout= async function(req, res){
    req.logout();
    res.redirect('/');
    // console.log(req.user);
    // res.render('p', {user_profile: req.user,} );
}

//middleware for user login verification
module.exports.isLoggedIn = function(req,res,next){
    if(req.user){
        next();
    }
    else{
        res.redirect('/user/signin');
    }
    // req.user? next(): res.sendStatus(401);
}

// (In local Signup) if user with same email exisited then send him to login page
module.exports.checkIfExisted = async function(req,res,next){
    let f_user = await User.find({email: req.body.email});
    if(f_user.length!==0){
        res.redirect('/user/signin');
    }
    else{
        next()
    }
}

