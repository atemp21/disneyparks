const path = require('path');
const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const dbconnectionlocal = "mongodb://127.0.0.1:27017/disney-parks"
const dbconnection = process.env.MONGODB_URI
//routes
const waitRoutes = require("./routes/wait-times");

const app = express();

//db connection
mongoose.connect(dbconnection)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

//using
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "angular")))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/wait-times", waitRoutes);
app.use((req, res, next)=>{
  res.sendFile(path.join(__dirname, 'angular', "index.html"))
})
module.exports = app;