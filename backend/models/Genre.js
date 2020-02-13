/**
 * @Date:   2020-02-11T17:00:10+00:00
 * @Last modified time: 2020-02-11T17:00:53+00:00
 */

   const mongoose = require('mongoose');


 const GenreSchema = new mongoose.Schema({
   name: String,
   description: String
 });

  module.exports = mongoose.model('Genre', GenreSchema);
