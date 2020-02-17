/**
 * @Date:   2020-01-28T10:06:12+00:00
 * @Last modified time: 2020-01-28T10:53:55+00:00
 */
//Requiring passport-jwt requirements needed to authenticate the user login
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

// Getting the user schema
const User = require("../models/User");
// retrieving the api key for the authentication
const secret = process.env.API_SECRET;

// exporting the passport requirements needed to get token and login by checking users
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
