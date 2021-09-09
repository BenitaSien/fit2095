// Author: Benita Sien 30600294
let http = require('http');
let fs = require('fs');

 http.createServer(function(req, res) {
     console.log(req.url);
     let filename = ""
     // print the semester week
     if (req.url.includes('whichweek')) {   // check for 'whichweek' in URL
        res.writeHead(200, {
            "Content-Type": "text/html",
          });
          // get url
          var baseURL = "http://" + req.headers.host + "/";
          var url = new URL(req.url, baseURL);
          let params = url.searchParams;
          let msg = "";
          // get the week
          
          let week = getDaysDiff(params.get("d"), params.get("m"), params.get("y"));
          if (week == -1) {     // before semester
            msg = "The semester has not started"
          } else if (week > 14) {   // after week 14
              msg = "The semester has ended"
          } else {
              // otherwise, print the week
              msg = week.toString()
          }
          res.write(msg);
          res.end();
     } else {
        // select the page
        let folderName = "30600294_lab2";
        switch(req.url) {
            case '/':               // index page
                filename="./" + folderName + "/index.html";
                break;
            case '/assessments':    // assessments page
                filename="./" + folderName + "/assessments.html"
                break;
            case '/topics':         // topics page
                filename="./" + folderName + "/topics.html"
                break;
            case '/help':         // topics page
                filename="./" + folderName + "/help.html"
                break;
            default:                // error page
                filename="./" + folderName + "/404.html";
                break;
        }
    // read selected file
     fs.readFile(filename, (err, data) => {
        if (err) console.log(err);
        res.writeHead(200, {"Content-Type": "text/html"}); // 404
        res.end(data);
     });
    }
     
 }).listen(5050);

 function getDaysDiff(d, m, y) {
    let returnValue = -1;
    let currentDay = new Date();
    currentDay.setDate(parseInt(d));
    currentDay.setMonth(parseInt(m) - 1); // months start from 0
    currentDay.setYear(parseInt(y));
    let firstDay = new Date("7/26/2021"); // first day in semester 2
    if (currentDay >= firstDay) {
        var diffDays = parseInt((currentDay - firstDay) / (1000 * 60 * 60 * 24)); //gives day difference 
        returnValue = (Math.floor(diffDays / 7) + 1);
    }
    return (returnValue);
}