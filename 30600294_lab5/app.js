const express = require("express");
const morgan = require("morgan");
const ejs = require("ejs");
const mongodb = require('mongodb');
let path = require("path");
let randomstring = require("randomstring");

const app = express();
app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.listen(5050);

const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/';

let db;

MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
    if (err) {
        console.log('Err ', err);
    } else {
        console.log("Connected to server successfully");
        db = client.db('week5db');
    }
});

//db.collection('books');

let viewsPath = __dirname + "/views/";

app.use(express.static(path.join(__dirname, 'public/images')));
app.use(express.static(path.join(__dirname, 'public/css')));


// GET requests

app.get("/", function(req, res) {
    res.render(viewsPath + "index.html");
});

app.get("/addbook", function(req, res) {
    sendFileFunction(res, "addbook.html");
});

app.get("/listbooks", function(req, res) {
    db.collection('books')
    .find({})
    .toArray(function (err, data) {
        res.render(viewsPath + "listbooks.html", {
            books: data
        });
    });
});

app.get("/deletebytopic", function(req, res) {
    res.sendFile(viewsPath + "deletebytopic.html");
});

app.get("/updatetitle", function(req, res) {
    res.sendFile(viewsPath + "updatetitle.html");

});

app.get("/filter", function(req, res) {
    res.sendFile(viewsPath + "filter.html");

});

app.get("/*", function(req, res) {
    sendFileFunction(res, "404.html");
});


// POST requests

app.post("/postnewbook", function(req, res) {
    console.log(req.body);
    let bookDetails = req.body;
    db.collection("books").insertOne({
        ISBN: randomstring.generate(13),
        title: bookDetails.title,
        author: bookDetails.author,
        topic: bookDetails.topic,
        publicationDate: new Date(bookDetails.publicationDate),
        summary: bookDetails.summary,
    });
    res.redirect("/listbooks");
});

app.post("/deletebytopic", function(req, res) {
    let bookDetails = req.body;
    let filter = {topic: bookDetails.topic};
    db.collection("books").deleteMany(filter);
    res.redirect("/listbooks");
});

app.post("/updatetitle", function(req, res) {
    res.sendFile(viewsPath + "updatetitle.html");
    let bookDetails = req.body;
    let filter = {title: bookDetails.title};
    let update = {
        $set: {
            title: bookDetails.title,
            author: bookDetails.author,
            topic: bookDetails.topic,
            publicationDate: new Date(bookDetails.publicationDate),
            summary: bookDetails.summary
        },
    };

    db.collection("books").updateOne(filter, update);
    res.redirect("/listbooks");
});

app.post("/filter", function(req, res) {
    db.collection('books')
    .find({publicationDate: {
        $gte: new Date(req.body.datefirst),
        $lte: new Date(req.body.datesecond)
    }})
    .toArray(function (err, data) {
        res.render(viewsPath + "listbooks.html", {
            books: data
        });
    });
});

// functions

let sendFileFunction = function(res, pageName) {
    let fileName = viewsPath + pageName;
    res.sendFile(fileName)
}