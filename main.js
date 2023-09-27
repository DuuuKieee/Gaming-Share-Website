const express = require("express");
const { register } = require("./db.js");
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const path = require("path");
const { error } = require("console");
const port = 8000;


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// use built-in middleware from Express to serve static assets
app.use(
  express.static(path.join(__dirname, "/public"), {
    setHeaders: function (res, path) {
      if (path.endsWith(".gz")) {
        // add a HTTP response header for gzip
        res.set("Content-Encoding", "gzip");
      }
      if (path.includes("wasm")) {
        // add a HTTP response header for wasm
        res.set("Content-Type", "application/wasm");
      }
    },
  })
);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname, "/login.html"));
}); ``

app.get("/register", function (req, res) {
  res.sendFile(path.join(__dirname, "register.html"))
});

app.post("/register", function (req, res) {
  if (req.body.password == req.body.password_repeat) {
    if (register(req.body.email, req.body.username, req.body.password) == false) {
      res.redirect('/register');
    }
    else {
      res.redirect('/login');
    }
  }
  else {
    return error('concak nhap cho dung coi');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});