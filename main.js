const express = require("express");
const app = express();
const multer = require('multer');
const path = require("path");
const decompress = require("decompress");
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://TooBunReal:Mk0378203515@dbcluster.orpnbw1.mongodb.net/?retryWrites=true&w=majority";
const port = 8000;
let uploadedFileName = '';
let isLogin = false;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// use built-in middleware from Express to serve static assets

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    
  }
});
const dbName = "DB";
const collectionName = "User";
const collectionGameName = "GameData";
const database = client.db(dbName);
const collection = database.collection(collectionName);
const gamecollection = database.collection(collectionGameName);



app.use(
  express.static(path.join(__dirname, `/GameFolder`), {
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

// Cấu hình multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Thư mục đích để lưu trữ các tệp tin đã được tải lên
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + '-' + file.originalname; // Đặt tên tệp tin mới
    uploadedFileName = fileName;
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });

app.get(`/dbtest2`, function (req, res) {
  gameRedirect(2);
});
app.get(`/dbtest`, function (req, res) {
  res.sendFile(path.join(__dirname, 'register.html'));
});
app.post(`/dbtest`, function(req,res) {
  // Lấy dữ liệu từ yêu cầu POST
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  // Gọi hàm run() hoặc các xử lý khác tại đây
  login(username, password);
});
app.get(`/gamemenu`, function (req, res) {
  res.sendFile(path.join(__dirname, `/gamemenu.html`));
});
// Đường dẫn cho trang uploads
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'upload.html'));
});
// Route handler for game page
app.get('/:gamename', function (req, res) {
  const gamename = req.params.gamename;
  res.sendFile(path.join(__dirname, `/GameFolder/${gamename}.html`));
});



// Xử lý yêu cầu upload
app.post('/upload', upload.array('files'), (req, res) => {
  if (req.files.length > 0) {

    res.send('Files uploaded successfully.');
    const gamename = req.body.gamename;
    gameUpload(gamename, "Duuukieee");
    decompress("uploads/"+uploadedFileName, "GameFolder")
      .then((files) => {
        console.log(files);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    res.status(400).send('No files were uploaded.');
  }
});
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
async function run(_email, _username,_password) {
  const recipes = [
    {
      username: _username,
      password: _password,
      email: _email
    },
  ];
  
  try {
    const insertManyResult = await collection.insertMany(recipes);
    console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
  } catch (err) {
    console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
  }
}
async function login(_username, _password) {
  var query = { username: _username, password: _password };
  try {
    var queryResult = await collection.find(query).toArray();
    if (queryResult.length > 0) {
      console.log("Login successful");
    } else {
      console.log("Login fail");
    }
  } catch (err) {
    console.error(`Something went wrong trying to perform the login: ${err}\n`);
  }
}
async function gameUpload(_gamename, _username) {
  const recipes = [
    {
      name: _gamename,
      author: _username,
      date: new Date()
    },
  ];
  
  try {
    const insertManyResult = await gamecollection.insertMany(recipes);
    console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
  } catch (err) {
    console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
  }
}
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});