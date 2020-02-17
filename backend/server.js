const express = require("express");
const body_parser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const booksRouter = require("./routes/books");
const authorsRouter = require("./routes/authors");
const genresRouter = require("./routes/genres");
const authRouter = require("./routes/auth");
// const path = require("path");
// var multer = require("multer");
// var GridFsStorage = require("multer-gridfs-storage");
// var Grid = require("gridfs-stream");

const app = express();

app.use(body_parser.json());
app.use(cors());

//Pulling api from the env file
const uri = process.env.ATLAS_URI;

// establishing a database connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;

// Grid.mongo = mongoose.mongo;
// let gfs = Grid(mongoose.connection.db, mongoose.mongo);

// app.use(function(req, res, next) {
//   //allow cross origin requests
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "POST, PUT, OPTIONS, DELETE, GET"
//   );
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });

connection.once("open", () => {
  //Initialising the stream
  // gfs = new mongoose.mongo.GridFSBucket(connection.db, {
  // bucketName: "uploads"
  // });
  console.log("MongoDB database connection established successfully");
});

// var storage = GridFsStorage({
//   gfs: gfs,
//   filename: function(req, file, cb) {
//     var datetimestamp = Date.now();
//     cb(
//       null,
//       file.fieldname +
//         "-" +
//         datetimestamp +
//         "." +
//         file.originalname.split(".")[file.originalname.split(".").length - 1]
//     );
//   },
//   /** With gridfs we can store aditional meta-data along with the file */
//   metadata: function(req, file, cb) {
//     cb(null, { originalname: file.originalname });
//   },
//   root: "ctFiles" //root name for collection to store files into
// });

// var upload = multer({
//   //multer settings for single upload
//   storage: storage
// }).single("file");

// /** API path that will upload the files */
// app.post("/upload", function(req, res) {
//   upload(req, res, function(err) {
//     if (err) {
//       res.json({ error_code: 1, err_desc: err });
//       return;
//     }
//     res.json({ error_code: 0, err_desc: null });
//   });
// });

// app.get("/file/:filename", function(req, res) {
//   gfs.collection("ctFiles"); //set collection name to lookup into

//   /** First check if file exists */
//   gfs.files
//     .find({ filename: req.params.filename })
//     .toArray(function(err, files) {
//       if (!files || files.length === 0) {
//         return res.status(404).json({
//           responseCode: 1,
//           responseMessage: "error"
//         });
//       }
//       /** create read stream */
//       var readstream = gfs.createReadStream({
//         filename: files[0].filename,
//         root: "ctFiles"
//       });
//       /** set the proper content type */
//       res.set("Content-Type", files[0].contentType);
//       /** return response */
//       return readstream.pipe(res);
//     });
// });

// app.get("/file", function(req, res) {
//   gfs.collection("ctFiles"); //set collection name to lookup into

//   gfs.files.find().toArray(function(err, files) {
//     if (!files || files.length === 0) {
//       return res.status(404).json({
//         responseCode: 1,
//         responseMessage: "error"
//       });
//     }
//     res.send(JSON.stringify(files));
//   });
// });

app.get("/", (req, res) => {
  res.json({ message: "You are in the root route" });
});

//Setting Express paths to routers

app.use("/books", booksRouter);
app.use("/authors", authorsRouter);
app.use("/genres", genresRouter);
app.use("/account", authRouter);

const port = process.env.PORT || 4000;
// const server = process.env.REACT_APP_BACKEND;
console.log(this.server);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
