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
            <a></a>
        `
    )
}

module.exports.login_failure = function(req,res){
    return res.redirect('fail401');
}
