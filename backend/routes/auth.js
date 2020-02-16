/**
 * @Date:   2020-01-28T10:17:38+00:00
 * @Last modified time: 2020-01-28T11:18:39+00:00
 */

const passport = require("passport");
const settings = require("../config/passport")(passport);
const jwt = require("jsonwebtoken");
const router = require("express").Router();

let User = require("../models/User");

router.post("/register", (req, res) => {
  //destructoring assignment -> destructerd request
  const { body } = req; // vs const body = req.body;
  const { password } = body; // password = body.password
  let { email } = body;

  // Checking if there is an email and password entered
  if (!email) {
    return res.json({
      success: false,
      message: "Error Email cannot be blank."
    });
  }

  if (!password) {
    return res.json({
      success: false,
      message: "Error Password cannot be blank."
    });
  }
  // case sensitive
  email = email.toLowerCase();
  email = email.trim();

  //verify email doesn exists//save
  User.find(
    {
      email: email
    },
    (err, previousUsers) => {
      if (err) {
        return res.json({
          success: false,
          message: "Error: Server Error!"
        });
      } else if (previousUsers.length > 0) {
        return res.json({
          success: false,
          message: "Error: Account already exists!"
        });
      }

      // save user
      const newUser = new User();
      newUser.email = email;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.json({
            success: false,
            message: "Error: Server Error!"
          });
        }
        return res.json({
          success: true,
          message: "Account created for user"
        });
      });
    }
  );
});

router.post("/login", function(req, res) {
  const { body } = req; // vs const body = req.body;
  const { password } = body; // password = body.password
  let { email } = body;

  if (!email) {
    return res.json({
      success: false,
      message: "Error Email cannot be blank."
    });
  }
  if (!password) {
    return res.json({
      success: false,
      message: "Error Password cannot be blank."
    });
  }
  email = email.toLowerCase().trim();

  //Finding user on login with email parameter
  User.findOne({ email }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Authentication failed. User not found."
      });
    } else {
      //if password matches
      if (user.validPassword(password)) {
        // if user is found and password is right then creates a token
        let token = jwt.sign(user.toJSON(), process.env.API_SECRET);
        res.json({ success: true, token: "JWT " + token });
      } else {
        res.staus(401).json({
          success: false,
          message: "Authentication failed. Wrong Password"
        });
      }
    }
  });
});

module.exports = router;
