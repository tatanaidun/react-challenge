const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/qubitDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
});

const User = mongoose.model("User", userSchema, "users");

//please change this schema if you want to have more columns in list
const schema = {
  id: Number,
  product: String,
  price: Number,
  //rating: Number,
};

const productSchema = new mongoose.Schema(schema);

const Product = mongoose.model("Product", productSchema, "products");

app.get("/", function (req, res) {
  res.status(200).send("Its backend bro");
});

app.get("/api/data", function (req, res) {
  Product.find(function (err, products) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(JSON.stringify(products));
    }
  });
});

app.post("/api/login", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username, password: password }, function (
    err,
    users
  ) {
    if (err) {
      console.log(err);
    } else {
      if (users) {
        res.status(200).send(JSON.stringify({ role: users.role }));
      } else {
        res.status(200).send(JSON.stringify({ error: "User Not found" }));
      }
    }
  });
});

app.listen(process.env.PORT || 5000, function () {
  console.log("server started on port 5000");
});
