/**
 * @Date:   2020-01-28T10:06:12+00:00
 * @Last modified time: 2020-01-28T10:53:55+00:00
 */

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models/User");
const secret = process.env.API_SECRET;

module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = secret;
  passport.use(
    new JwtStrategy(opts, function(jwt_payload, done) {
      User.findOne({ id: jwt_payload.id }, function(err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    })
  );
};
