const passport= require('passport');
const LocalStrategy= require('passport-local').Strategy;
const User= require('./models/users').users;

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({  
            username: username
        } 
      ).then((user)=>{
        if (!user) {
          console.log('user not found');
          return done(null, false, {message: "No such user"});
        }
        if (user.password !== password) {
          console.log('wrong password');
          return done(null, false, {message: "Wrong password"});
        }
        return done(null, user);

      }).catch((err)=>{
        console.log('error in login');
        return done(err);
      })
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.username);
  });

  passport.deserializeUser(function(username, done) {
    User.findOne({
        username: username
    }).then((user)=>{
        if(!user){
          return done(new Error('No such user'));
        }

        return done(null, user);

    }).catch((err)=>{
      return done(err);
    })
  });

  module.exports= {
    passport
  };