module.exports.home = function(req,res){
    return res.render('index');
}
module.exports.contact = function(req,res){
    return res.render('contact');
}
module.exports.experts = function(req,res){
    return res.render('experts');
}
module.exports.about = function(req,res){
    return res.render('about');
}
