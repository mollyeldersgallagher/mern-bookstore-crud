const router = require("express").Router();
const multer = require("multer");
const uuidv4 = require("uuid/v4");
const passport = require("passport");
const settings = require("../config/passport")(passport);

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

//cb = callback fucnction
//uuidv4is a Universally unique identifier
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    cb(null, uuidv4() + "-" + fileName);
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  }
});

let Book = require("../models/Book");

router.route("/").get((req, res) => {
  Book.find()
    .populate("author_id")
    .populate("genre_id")
    .exec()
    .then(books => res.json(books))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  const bookId = req.params.id;

  Book.findById(bookId)
    .populate("author_id")
    .populate("genre_id")
    .exec()
    .then(result => {
      if (!result) {
        return res.status(404).json({
          message: "book not found with id " + bookId
        });
      }
      res.json(result);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).json({
          message: "book not found with id " + bookId
        });
      }
      return res.status(500).json({
        message: "Error retrieving book with id " + bookId
      });
    });
});

router.route("/").post(
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const token = getToken(req.headers);
    const book = req.body;
    //validate book
    if (token) {
      if (!book.isbn) {
        return res.status(400).json({
          message: "book isbn can not be empty"
        });
      }
      if (!book.title) {
        return res.status(400).json({
          message: "book title can not be empty"
        });
      }

      const newBook = new Book(book);
      console.log(newBook);
      newBook
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

router.route("/:id").put(
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const token = getToken(req.headers);
    const bookId = req.params.id;
    const newBook = req.body;
    if (token) {
      if (!newBook.title) {
        return res.status(400).json({
          message: "Book title can not be empty"
        });
      }

      // Find Book and update it with the request body
      Book.findByIdAndUpdate(bookId, newBook, {
        new: true
      })
        .then(book => {
          if (!book) {
            return res.status(404).json({
              message: "book not found with id " + bookId
            });
          }
          res.json(book);
        })
        .catch(err => {
          if (err.kind === "ObjectId") {
            return res.status(404).json({
              message: "book not found with id " + bookId
            });
          }
          return res.status(500).json({
            message: "Error updating book with id " + bookId
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

router.route("/:id").delete(
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const token = getToken(req.headers);
    const bookId = req.params.id;
    if (token) {
      Book.findByIdAndRemove(bookId)
        .then(book => {
          if (!book) {
            return res.status(404).json({
              message: "book not found with id " + bookId
            });
          }
          res.json({
            message: "book deleted successfully!"
          });
        })
        .catch(err => {
          if (err.kind === "ObjectId" || err.name === "NotFound") {
            return res.status(404).json({
              message: "book not found with id " + bookId
            });
          }
          return res.status(500).send({
            message: "Could not delete book with id " + bookId
          });
        });
    } else {
      return res.status(403).json({
        success: false,
        messsage: "Unuthorized"
      });
    }
  }
);

module.exports = router;
