const path = require("path");
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("6702be9aa8db7fa3143bdeed")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(process.env.MONGODB_URL)
  .then((result) => {
    console.log("Connected!");
    // const user = new User({
    //   name: "nikhil",
    //   email: "nikhildhamecha19@gmail.com",
    //   cart: { items: [] },
    // });
    // user.save();
    app.listen(3000);
  })
  .catch((err) => console.log(err));
