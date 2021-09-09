let express = require("express");
let app = express();
let path = require("path");

// array of books
let db = [];

let viewsPath = __dirname + "/views/";

app.use(express.urlencoded({extended: true}));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(express.static(path.join(__dirname, 'public/images')));
app.use(express.static(path.join(__dirname, 'public/css')));


// GET requests

app.get("/", function(req, res) {
    res.render(viewsPath + "index.html");
})

app.get("/addbook", function(req, res) {
    sendFileFunction(res, "addbook.html");
})

app.get("/listbooks", function(req, res) {
    renderListBooksPage(res);
})


app.get("/invaliddata", function(req, res) {
    sendFileFunction(res, "invaliddata.html");
})

app.get("/search/:searchParam", function(req, res) {
    let searchResults = [];
    for (i=0; i<db.length; i++) {
        if (db[i].title.toLowerCase().includes(req.params.searchParam.toLowerCase())) {
            searchResults.push(db[i]);
        }
    }
    res.render(viewsPath + "listbooks.html", {
        books: searchResults
    })
})

app.get("/*", function(req, res) {
    sendFileFunction(res, "404.html");
})


// POST requests

app.post("/postnewbook", function(req, res) {
    console.log(req.body);

    // validation
    if (Math.min(req.body.title.length, req.body.author.length, req.body.topic.length) < 3 
    || req.body.cost < 0
    || !req.body.title 
    || !req.body.author  
    || !req.body.topic 
    || !req.body.cost ) {
        res.render(viewsPath + "invaliddata.html");
        console.log("invalid data");
    } else {
        db.push(req.body);      // add book to db
        renderListBooksPage(res);     // go to list books
        console.log("success");
    }
})

// functions

let sendFileFunction = function(res, pageName) {
    let fileName = viewsPath + pageName;
    res.sendFile(fileName)
}

let renderListBooksPage = function(res) {
    res.render(viewsPath + "listbooks.html", {
        books: db
    })
}

app.listen(8080);