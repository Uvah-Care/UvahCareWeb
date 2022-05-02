module.exports.home = function(req,res){
    return res.render('index',{user: req.user});
}
module.exports.contact = function(req,res){
    return res.render('contact',{user: req.user});
}
module.exports.experts = function(req,res){
    return res.render('experts',{user: req.user});
}
module.exports.about = function(req,res){
    return res.render('about',{user: req.user});
}
module.exports.terms_of_service = function(req,res){
    return res.render('terms-of-service',{user: req.user});
}
module.exports.privacy_policy = function(req,res){
    return res.render('privacy-policy',{user: req.user});
}

