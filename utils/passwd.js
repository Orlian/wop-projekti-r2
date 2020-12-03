'use strict';

const passport = require('passport');
const passportJWT = require('passport-jwt');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const userModel = require('../models/userModel');

passport.use(new Strategy( async(username, password, done) => {
  const params = [username];
  try{
    const [user] = await userModel.getUserLogin(params);
    console.log('Local strategy', user);
    if(user === undefined) {
      return done(null, false, {message: 'Incorrect username'});
    }
    if(!bcrypt.compareSync(password, user.password)) {
      return done(null, false, {message: 'Incorrect password'})
    }
    return done(null, {...user}, {message: 'Successful login'});
  } catch(err) {
    return done(err);
  }
},
));

passport.use(new JWTStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'this_is_a_mega_secret',
    },
    async (jwtPayload, done) => {
      try{
        console.log('jwtPayload', jwtPayload);
        const [user] = await userModel.getUser(jwtPayload.email); //TODO Tarkista muuttujien nimet
        if(user === undefined) {
          return done(null, false, {message: 'Username not found'});
        }
        const plainUser = {...user};
        return done(null, plainUser)
      } catch (err) {
        return done(err);
      }
    },
));

module.exports = passport;