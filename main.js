const evn = require("dotenv").config();
const express = require("express");
const passport = require('passport');
const session = require('express-session');
const { register, login } = require("./db.js");
var cors = require("cors");
const app = express();
const path = require("path");
const port = 8000;
const bodyParser = require('body-parser');

require("dotenv").config();
app.use(cors());
app.use(
  express.static(path.join(__dirname, "/public"), {
    setHeaders: function (res, path) {
      if (path.endsWith(".gz")) {
        res.set("Content-Encoding", "gzip");
      }
      if (path.includes("wasm")) {
        res.set("Content-Type", "application/wasm");
      }
    },
  })
);


app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 60000 }
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(passport.initialize());
app.use(passport.session());

function Auth(req, res, next) {
  if (req.session.User && req.session.User.islogin) {
    return next();
  } else {
    res.redirect('/login');
  }
}


app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});
app.get('/api/test', (req, res) => {
  res.json({ message: 'I am a message from Server!' });
})
app.post('/api/register', (req, res) => {
  register(req.body.email, req.body.username, req.body.password, req.body.password_repeat)
    .then((result) => {
      if (result === true) {
        res.status(200).json({
          message: "test"
        });
      } else {
        console.log("sai");
        // res.json({ message: 'DangKyThatBai' });
        res.status(400).json({message: 'DangKyThatBai'});
      }
    })
    .catch((error) => {
      console.error(error);
      res.json({ message: 'DangKyLoi' });
    });
});
app.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname, "/login.html"));
});

app.post('/api/login', (req, res) => {
  login(req.body.username, req.body.password)
    .then((result) => {
      if (result === true) {
        res.status(200).json({
          message: "Access Token"
        });
      } else {
        console.log("sai");
        // res.json({ message: 'DangKyThatBai' });
        res.status(400).json({message: 'DangKyThatBai'});
      }
    })
    .catch((error) => {
      console.error(error);
      res.json({ message: 'DangKyLoi' });
    });
});

app.get("/main", Auth, function (req, res) {
  res.sendFile(path.join(__dirname, "/main.html"));
});

app.post("/login", function (req, res) {
  login(req.body.username, req.body.password)
    .then((result) => {
      if (result === true) {
        console.log("return success");
        req.session.User = {
          username: req.body.username,
          islogin: true,
          like: '4550'
        }
        res.redirect('/main');
      } else {
        console.log("sai");
        return res.redirect('/login');
      }
    })
    .catch((error) => {
      console.error(error);
      return res.redirect('/login');
    });
});

app.get("/register", function (req, res) {
  res.sendFile(path.join(__dirname, "/register.html"))
});

app.post("/register", function (req, res) {
  register(req.body.email, req.body.username, req.body.password, req.body.password_repeat)
    .then((result) => {
      if (result === true) {
        return res.redirect('/login');
      } else {
        console.log("sai");
        return res.redirect('/register');
      }
    })
    .catch((error) => {
      console.error(error);
      return res.redirect('/register');
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});