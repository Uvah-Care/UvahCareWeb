const User = require('../models/user-model');

module.exports.login = function(req,res){
    return res.render('login');
}

module.exports.login_check = function(req,res){
    if(req.user.password === 'hello-12345!'){
        res.redirect('/user/create/password',);
    }
    else{
        res.redirect('/user/profile');
        // res.send(`User was already present in data base : ${req.user.name} , ${req.user.email}`);
    }
    // console.log("checking place if it is a new user ==> ", req.user);
    // return res.send(
    //     `
    //         <h4>Checking if user signed in: ${req.user.name} is a new user or old user present in database</h4>
    //         <a href="/user/create">Create the new user</a>
    //     `
    // )
}

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
    res.render('new-password', {user_profile: req.user,} );
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
        res.redirect('/user/profile');
    }
    else{
        res.redirect('back');
    }
}

module.exports.profile= async function(req, res){
    // console.log(req.user);
    res.render('profile', {user_profile: req.user,} );
}

module.exports.logout= async function(req, res){
    req.logout();
    res.redirect('/login');
    // console.log(req.user);
    // res.render('p', {user_profile: req.user,} );
}

