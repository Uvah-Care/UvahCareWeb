const passport = require('passport');
const User = require('../models/user-model');
const GoogleStrategy = require('passport-google-oauth2' ).Strategy;

const GOOGLE_CLIENT_ID= '503153730365-arskqj2dck6u1vf266v0dkn03t643p0r.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET= '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';

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/login/google/callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    // console.log(profile)  
    let f_user = await User.findOne({email: profile.email})
    if(f_user){
      //user is already registered
      done(null, f_user);
    }
    else{
      //user not present in database
      let new_user = await User.create({
        name: profile.displayName,
        email: profile.email,
        password: "UVAHCARE-123", //temperary password
      });
      done(null, new_user);
    }
  }
));

passport.serializeUser(function(user,done){
  done(null, user.id);
});

passport.deserializeUser( async function(id,done){
  try{
    let f_user = await User.findById(id);
    done(null, f_user);
  }
  catch(error){
    console.log("error in finding user: ",error);
  }
});