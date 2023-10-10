const express = require("express");
const passport = require('passport');
const session = require('express-session');
const { register, login } = require("./db.js");
const { error } = require("console");
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const path = require("path");
const port = 8000;
const bodyParser = require('body-parser');

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

app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(passport.initialize());
app.use(passport.session());

function Auth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}


app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname, "/login.html"));
});

app.get("/success", Auth, function (req, res) {
  res.sendFile(path.join(__dirname, "/success.html"));
});

app.post("/login", function (req, res) {
  login(req.body.username, req.body.password);
  res.sendFile(path.join(__dirname, "/success.html"));
});

app.get("/register", function (req, res) {
  res.sendFile(path.join(__dirname, "/register.html"))
});

app.post("/register", function (req, res) {

  if (register(req.body.email, req.body.username, req.body.password, req.body.password_repeat) === true) {
    console.log(register(req.body.email, req.body.username, req.body.password, req.body.password_repeat));
    return res.redirect('/login');

  }
  else {
    console.log("sai");
    console.log(register(req.body.email, req.body.username, req.body.password, req.body.password_repeat));
    return res.redirect('/register');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});