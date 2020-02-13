/**
 * @Date:   2020-02-11T15:12:27+00:00
 * @Last modified time: 2020-02-11T15:17:11+00:00
 */

 const mongoose = require('mongoose');
 
 const AuthorSchema = new mongoose.Schema({
   name: String,
   email: String,
   office: String
 });


module.exports = mongoose.model('Author', AuthorSchema);
