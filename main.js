const express = require("express");
const app = express();
const path = require("path");
const port = 8000;

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});