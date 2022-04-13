const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2' ).Strategy;

const GOOGLE_CLIENT_ID= '503153730365-arskqj2dck6u1vf266v0dkn03t643p0r.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET= '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';

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/login/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // console.log(profile)  
    return done(null, profile);
  }
));

passport.serializeUser(function(user,done){
  done(null, user);
});

passport.deserializeUser(function(user,done){
  // console.log(user)
    done(null,user);
});