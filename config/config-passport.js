const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const Users = require('../model/users');

require('dotenv').config();

const params = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

passport.use(
  new Strategy(params, async function (payload, done) {
    try {
      const user = await Users.findById(payload.id);
      console.log('passport');
      if (!user) {
        return done(new Error('User not found'), false);
      }
      if (!user.token) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(err, false);
    }
  })
);
