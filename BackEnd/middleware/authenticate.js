const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { secretKey } = require('../config');
const User = require('../models/user');

// Configure JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};
passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      // Find the user by ID
      const user = await User.findById(payload.id);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

// Authentication middleware
const authenticate = passport.authenticate('jwt', { session: false });

module.exports = {
  authenticate,
};