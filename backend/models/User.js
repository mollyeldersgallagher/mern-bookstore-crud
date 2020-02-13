/**
 * @Date:   2020-01-28T10:16:38+00:00
 * @Last modified time: 2020-02-03T14:20:01+00:00
 */
 const mongoose = require('mongoose');
 const bcrypt = require('bcryptjs');

 const UserSchema = new mongoose.Schema({
   email: {
     type: String,
     default: ''
   },
   password: {
     type: String,
     default: ''
   },
   isDeleted: {
     type: Boolean,
     default: false
   },
   signUpDate: {
     type: Date,
     default: Date.now()
   }
 });

 UserSchema.methods.generateHash = function(password) {
   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
 };
 UserSchema.methods.validPassword = function(password) {
   return bcrypt.compareSync(password, this.password);
 };

 module.exports = mongoose.model('user', UserSchema);
