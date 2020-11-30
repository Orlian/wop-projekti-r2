'use strict';

const passport = require('passport');
const passportJWT = require('passport-jwt');
const bcrypt = require('bcryptjs');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const userModel = require('../models/userModel');

passport.use(new JWTStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'this_is_a_mega_secret',
    },
    async (jwtPayload, done) => {
      try{
        const [user] = await userModel.getUser(jwtPayload.userid); //TODO Tarkista muuttujien nimet
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