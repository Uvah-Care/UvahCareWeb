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

//serializing
passport.serializeUser(
    function(user, done){
        done(null, user.id);
    }
);

//deserializing
passport.deserializeUser( async function(id,done){
  try{
    let f_user = await User.findById(id);
    done(null, f_user);
  }
  catch(error){
    console.log("error in finding user: ",error);
  }
});