//template to wrap the node js
const express = require("express");
const app = express();

//middle ware
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// database connection and when it gets established server connection
const mongoose = require("mongoose");
const Customer = require("./db-models/details");

//multer for image
const multer = require("multer");
const uuidv4 = require("uuidv4");

const DIR = "./public/";

//cors
const cors = require("cors");
app.use(cors());

//image filr
app.use("/public", express.static("public"));

const urlDB =
  "mongodb+srv://node:@nanya12Mondal@nodetuo.5hfrr.mongodb.net/nodetuo?retryWrites=true&w=majority";

mongoose
  .connect(urlDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((result) => {
    console.log("connection established");
    app.listen(3000, () => console.log("listening to 3000"));
  })
  .catch((err) => console.log(err));

//image uploader
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, `${Date.now()}_${file.originalname}`);
  },
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
  },
});

// CRUD operations

// get all data from database
app.get("/all-data", (req, res) => {
  Customer.find()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => console.log(error));
});

//get single data from database
app.get("/singledata/:index", (req, res) => {
  Customer.findById({ _id: req.params.index })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//post api call
app.put("/createuser/:index", (req, res) => {
  const indexURL = req.params.index;
  Customer.findByIdAndUpdate(
    { _id: indexURL },
    {
      $set: req.body,
    }
  )
    .then((result) => {
      const message = "User Created";
      res.send(message);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/user-profile", upload.single("profileImg"), (req, res, next) => {
  //const url = req.protocol + "://" + req.get("host");
  const url =
    req.protocol + "://" + req.get("host") + "/public/" + req.file.filename;
  const user = new Customer({
    profileImg: url /* + "/public/" + req.file.filename */,
  });
  user
    .save()
    .then((result) => {
      res.status(201).json({
        message: "User registered successfully!",
        userCreated: {
          _id: result._id,
          profileImg: result.profileImg,
        },
      });
    })
    .catch((err) => {
      console.log(err),
        res.status(500).json({
          error: err,
        });
    });
});

//put request
app.put("/updateuser/:index", (req, res) => {
  console.log(req.body);
  console.log(req.params.index);
  const indexURL = req.params.index;
  Customer.findByIdAndUpdate(
    { _id: indexURL },
    {
      $set: req.body,
    }
  )
    .then((result) => {
      const message = "User updated.";
      res.send(message);
    })
    .catch((err) => console.log(err));
});

//delete data
app.delete("/delete/:id", (req, res) => {
  console.log(req.params.id);
  Customer.findByIdAndDelete({ _id: req.params.id })
    .then((result) => {
      const message = "User removed";
      res.send(message);
    })
    .catch((err) => console.log(err));
});
