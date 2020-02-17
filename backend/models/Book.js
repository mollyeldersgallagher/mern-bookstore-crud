/**
 * @Date:   2020-02-03T10:14:00+00:00
 * @Last modified time: 2020-02-11T18:08:15+00:00
 */

const mongoose = require("mongoose");

//Book Schema that contains two foreign keys creating many to many relationship
// as a book can have many author ideas, leaving authors to have many books

const BookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author"
    }
  ],
  genre_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre"
    }
  ],
  lastUpdated: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Book", BookSchema);
