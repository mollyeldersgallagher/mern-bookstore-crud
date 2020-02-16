/**
 * @Date:   2020-02-11T15:12:27+00:00
 * @Last modified time: 2020-02-11T15:17:11+00:00
 */

const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  { toJSON: { virtuals: true } }
);

// Virtuals provides the capability of reverse population.
// In this case returning all the books with the author

AuthorSchema.virtual("books", {
  ref: "Book",
  localField: "_id",
  foreignField: "author_id",
  justOne: false
});

module.exports = mongoose.model("Author", AuthorSchema);
