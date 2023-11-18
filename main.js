const evn = require("dotenv").config();
const express = require("express");
const passport = require('passport');
const jwt = require('jsonwebtoken')
const session = require('express-session');
const { register, login } = require("./db.js");
const { jwtMiddleware, convertJWTToJS, sign } = require("./jwt.js")
var cors = require("cors");
const app = express();
const multer = require("multer");
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

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/games"); //important this is a direct path fron our current file to storage location
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});


// The Multer Middleware that is passed to routes that will receive income requests with file data (multipart/formdata)
// You can create multiple middleware each with a different storage engine config so save different files in different locations on server
const upload = multer({ storage: fileStorageEngine });

// Single File Route Handler
app.post("/upload/single", upload.single("games"), (req, res) => {
  console.log(req.file);
  res.send("Single FIle upload success");
});

// Multiple Files Route Handler
app.post("/upload/multiple", upload.array("games", 4), (req, res) => {
  const gameData = JSON.parse(req.body.gameData);
  const gameName = gameData.gameName;
  const fileNames = []; // Mảng để lưu tên tệp tin

  req.files.forEach((file) => {
    const fileName = file.filename; // Lấy tên tệp tin
    fileNames.push(fileName); // Thêm tên tệp tin vào mảng
  });

  gameUpload(gameName, "testuser", fileNames); // Truyền mảng tên tệp tin vào hàm gameUpload
  res.send("Multiple Files Upload Success");
});



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
        res.status(400).json({ message: 'DangKyThatBai' });
      }
    })
    .catch((error) => {
      console.error(error);
      res.json({ message: 'DangKyLoi' });
    });
});

const generalAccessToken = (data) => {
  const accesstoken = jwt.sign({ data }, process.env.ACCESS_SECRET, { expiresIn: "30m" });
  return accesstoken;
}
const generalRefreshToken = (data) => {
  const refreshtoken = jwt.sign({ data }, process.env.REFRESH_SECRET, { expiresIn: "30d" });
  return refreshtoken;
}
app.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname, "/login.html"));
});

app.post('/api/playgame', async (req, res) => {
  try {
    playGame(req.body.gamename)
    .then((result) => {
      return res.json({ gameData: result });
    })
  } catch (error) {
    console.error("Error while playing game:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/main", Auth, function (req, res) {
res.sendFile(path.join(__dirname, "/public/main.html"));
});

app.post('/api/login', (req, res) => {
  login(req.body.username, req.body.password)
    .then((result) => {
      if (result === true) {
        const accesstoken = generalAccessToken({ username: req.body.username, role: 'user' })
        const refreshtoken = generalRefreshToken({ username: req.body.username, role: 'user' })
        res.cookie("token", accesstoken, {
          httpOnly: true,
        });
        res.status(200).json({
          accesstoken: accesstoken,
          refreshtoken: refreshtoken
        });
        console.log("accesstoken:", accesstoken);
      } else {
        console.log("sai");
        // res.json({ message: 'DangKyThatBai' });
        res.status(400).json({ message: 'DangKyThatBai' });
      }
    })
    .catch((error) => {
      console.error(error);
      res.json({ message: 'DangKyLoi' });
    });
});

app.post('/api/upload', (req, res) => {
  gameUpload(req.body.gamename, req.body.username)
    .then((result) => {
      if (result === true) {
        res.status(200).json({
          message: "Access Token"
        });
      } else {
        console.log("sai");
        // res.json({ message: 'DangKyThatBai' });
        res.status(400).json({ message: 'DangKyThatBai' });
      }
    })
    .catch((error) => {
      console.error(error);
      res.json({ message: 'DangKyLoi' });
    });
});

app.post("/api/getuser", (req, res) => {
  getUser(req.body.username)
  .then((result) => {
    res.status(200).json({
      username: result.username,
      role: result.role,
      game: result.game,
    });
  }).catch((error) => {
    console.error(error);
    res.json({ message: 'DangKyLoi' });
  });
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});