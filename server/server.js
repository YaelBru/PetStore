const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConfig = require("./database/database.js");
const jwt = require("./middleware/jwt");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());

// Connection to MongoDB
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
  })
  .then(
    () => {
      console.log("Database Connected!");
    },
    (error) => {
      console.log("Database Not Connected" + error);
    }
  );

//Routes
const contactRoute = require("./routes/contact.route");
const itemsRoute = require("./routes/items.route");
const adoptionRoute = require("./routes/adoption.route");
const authRoute = require("./routes/auth.route");
const orderRoute = require("./routes/order.route");

app.use("/contact-us", contactRoute);
app.use("/adoption-section", adoptionRoute);
app.use("/store-items", itemsRoute);
app.use("/auth", authRoute);
app.use("/orders", jwt.checkToken, orderRoute);

app.use(express.static(__dirname + "/dist/arielas-pet-store"));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/arielas-pet-store/index.html"));
});

// Create port
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Connected to port " + port);
});

// Error Handling
app.use(function (err, req, res, next) {
  err.message = err.message || err.error.message;
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
