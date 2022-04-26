const passport = require('passport');
const User = require('../models/user-model');
const LocalStrategy = require('passport-local').Strategy;  

passport.use(new LocalStrategy({
  usernameField: 'email',  
  passwordField: 'password',
  passReqToCallback: true,
},
  async function(request, username, password, done){
    //find a user and establish identity
    // console.log('testing for entering local strategy',request.body);
    try{
      let f_user = await User.findOne({email: username});
      if(f_user){
        //user is already registered
        if(f_user.password === request.body.password){
          console.log('user extisted:', f_user);
          done(null, f_user);
        }
        else{
          done(null, false);
        }
      }
      else{
        //user not present in database
        if(request.body.password === request.body.confirm_password){
          let new_user = await User.create({
            name: request.body.name,
            email: request.body.email,
            password: request.body.password, //temperary password
            payment: false,
          });
          done(null, new_user);
        }
        else{
          done(null, false);
        }
      }
    }
    catch(error){
      console.log('error occured:', error);
      done(null, false);
    }
  }
));

// passport.serializeUser(function(user,done){
//serializing
passport.serializeUser(
    function(user, done){
        done(null, user.id);
    }
);

//deserializing
passport.deserializeUser(function(id,done){
    User.findById(id, 
        function(error, f_user){
            if(error){
                console.log('error in finding user');
                return done(error);
            }

            return done(null, f_user);
        }
    );
});