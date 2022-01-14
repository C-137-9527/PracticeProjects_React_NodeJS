// const EventEmitter = require("events");

// const myEmitter = new EventEmitter();

// myEmitter.on("clicked", () => console.log(123));
// myEmitter.emit("clicked");

const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  //   fs.readFile("test-file.txt", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });

  // STREAMING
  const readale = fs.createReadStream("test-file.txt");
  readale.on("data", (chunk) => {
    res.write(chunk);
  });
  readale.on("end", () => {
    res.end();
  });
});

server.listen(8000, "127.0.0.1", () => {
  console.log("stared");
});
