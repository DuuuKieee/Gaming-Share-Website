var express = require("express");
var path = require('path');
var app = express();

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + 'D:/LTWPROJECT/GameStore/index.html'))

});

app.listen(8080);
console.log('Express server started');