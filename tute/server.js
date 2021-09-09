/*
let http = require('http');
http.createServer(function (request, response) {
    console.log('request ', request.url);
    let d = new Date();
    let currentTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds();
    response.writeHead(200);
    response.write('Hello from FIT2095!! the time is : ' + currentTime);
    response.end();
}).listen(8080);
console.log('Server running at http://127.0.0.1:8080/');
*/

/*let http = require("http");
let fs = require("fs");
http.createServer(function (request, response) {
    console.log("request ", request.url);
    let filePath = "." + request.url;
    if (filePath === "./") {
      filePath = "./index.html";
    }
    fs.readFile(filePath, function (error, content) {
      if (error) {
        fs.readFile("./404.html", function (error, content) {
          response.writeHead(404, { // file not found
            "Content-Type": "text/html",
          });
          response.end(content, "utf-8");
        });
      } else {
        response.writeHead(200, { // OK
          "Content-Type": "text/html",
        });
        response.end(content, "utf-8");
      }
    });
  })
  .listen(8080);
console.log("Server running at http://127.0.0.1:8080/");
*/
/*
let http = require("http");
let url = require("url");
http.createServer(function (req, res) {
    console.log("URL=" + req.url);
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    var baseURL = "http://" + req.headers.host + "/";
    var url = new URL(req.url, baseURL);
    let params = url.searchParams;
    console.log(params);
    let msg = params.get("year") + " " + params.get("month");
    res.end(msg);
  }).listen(8080);
  */
 /*
  let http = require('http');
  let fs = require('fs');
  let fileName = 'index.html';
  http.createServer(function (request, response) {
      console.log('request ', request.url);
      let url = request.url;
      console.log('request ', url);
      switch (url) {
          case '/':
              fileName = 'index.html';
              break;
          case '/about':
              fileName = 'about.html';
              break;
          case '/contact':
              fileName = 'contact.html';
              break;
          default:
              fileName = 'error.html';
              break;
      }
      fs.readFile(fileName, function (error, content) {
          response.writeHead(200, {
              'Content-Type': 'text/html'
          });
          response.end(content, 'utf-8');
      });
  }).listen(8080);
  console.log('Server running at http://127.0.0.1:8080/');
  */
 let http = require('http');
let fs = require('fs');

 http.createServer(function(req, res) {
     console.log(req.url);
     let filename = ""
     switch(req.url) {
        case '/':
            filename="./index.html";
            break;
        case '/about':
            filename="./about.html"
            break;
        case '/contact':
            filename="./contact.html"
            break;
        default:
            filename="./error.html";
             break;
     }
     fs.readFile(filename, (err, data) => {
        if (err) console.log(err);
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(data);
     });
     
 }).listen(8080);