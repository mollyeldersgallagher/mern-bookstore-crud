const router = require("express").Router();
const multer = require("multer");
const uuidv4 = require("uuid/v4");
const passport = require("passport");
const settings = require("../config/passport")(passport);

// Gets token if the user is logged in to send the token in a header
const getToken = headers => {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

// requiring
let Author = require("../models/Author");
let Book = require("../models/Book");

// Specified endpoints
// GET all authors with their related books
router.route("/").get((req, res) => {
  Author.find()
    .populate("books")
    .then(authors => res.json(authors))
    .catch(err => res.status(400).json("Error: " + err));
});

// GET the book with that id and its related books
router.route("/:id").get((req, res) => {
  const authorId = req.params.id;

  Author.findById(authorId)
    .populate("books")
    .then(result => {
      if (!result) {
        return res.status(404).json({
          message: "author not found with id " + authorId
        });
      }
      res.json(result);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).json({
          message: "author not found with id " + authorId
        });
      }
      return res.status(500).json({
        message: "Error retrieving author with id " + authorId
      });
    });
});

// POST author object to the database
router.route("/").post(
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const token = getToken(req.headers);
    const author = req.body;
    //validate author
    if (token) {
      if (!author.name) {
        return res.status(400).json({
          message: "author email can not be empty"
        });
      }
      if (!author.email) {
        return res.status(400).json({
          message: "author email can not be empty"
        });
      }

      const newAuthor = new Author(author);
      newAuthor
        .save()
        .then(data => {
          res.json(data);
        })
        .catch(err => res.status(400).json("Error: " + err));
    } else {
      return res.status(403).json({
        success: false,
        message: "Unauthorized."
      });
    }
  }
);

// PUT the new author object into the database updating the existing document
router.route("/:id").put(
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const token = getToken(req.headers);
    const authorId = req.params.id;
    const newAuthor = req.body;
    if (token) {
      if (!newAuthor.name) {
        return res.status(400).json({
          message: "Author name can not be empty"
        });
      }

      // Find Author and update it with the request body
      Author.findByIdAndUpdate(authorId, newAuthor, {
        new: true
      })
        .then(author => {
          if (!author) {
            return res.status(404).json({
              message: "author not found with id " + authorId
            });
          }
          res.json(author);
        })
        .catch(err => {
          if (err.kind === "ObjectId") {
            return res.status(404).json({
              message: "author not found with id " + authorId
            });
          }
          return res.status(500).json({
            message: "Error updating author with id " + authorId
          });
        });
    } else {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }
  }
);

// DELETE the author with the id secifid through parameters
router.route("/:id").delete(
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const token = getToken(req.headers);
    const authorId = req.params.id;
    if (token) {
      Author.findByIdAndRemove(authorId)
        .then(author => {
          if (!author) {
            return res.status(404).json({
              message: "author not found with id " + authorId
            });
          }
          res.json({
            message: "author deleted successfully!"
          });
        })
        .catch(err => {
          if (err.kind === "ObjectId" || err.name === "NotFound") {
            return res.status(404).json({
              message: "author not found with id " + authorId
            });
          }
          return res.status(500).send({
            message: "Could not delete author with id " + authorId
          });
        });
    } else {
      Book.findByIdAndRemove({ author_id: authorId }).exec();
      return res.status(403).json({
        success: false,
        messsage: "Unuthorized"
      });
    }
  }
);

module.exports = router;
