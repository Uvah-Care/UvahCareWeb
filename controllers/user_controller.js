const User = require('../models/user-model');
module.exports.login = function(req,res){
    return res.render('login');
}

// module.exports.login_google_callback = function(req,res){
//     console.log('hello all this user login with google auth 2 is working');
//     return res.send('login sucessfull');
// }

module.exports.login_check = function(req,res){
    return res.send(
        `
            <h4>Checking if user signed in is a new user or old user present in database</h4>
            <a href="/user/create">Create the new user</a>
        `
    )
}

module.exports.login_failure = function(req,res){
    return res.redirect('fail401');
}

module.exports.create_user = function(req,res){
    User.create(
        {
            name: req.user.displayName,
            email: req.user.email,
            password: "hello-12345!",
        },(error, user_inst)=>{
            if(error){
                console.log('error in creating user:',error);
            }
            else{
                console.log('User created in database');
            }
            return res.send(user_inst);
        }
    );
}