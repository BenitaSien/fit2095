// Author: Benita Sien 30600294

let express = require("express");
let app = express();
let url = require("url");

// Database - an array of books
let db = [];

// home - return list of curent books
app.get("/", function (req, res) {
    res.send(generateList());
});

// a) add book
app.get("/addbook", function (req, res) {
    // get url and parameters
    let baseURL = "http://" + req.headers.host + "/";
    let url = new URL(req.url, baseURL);
    let params = url.searchParams;
    console.log(params);
    let newBook = {         // create book object
        id: generateId(),
        title: params.get("title"),
        author: params.get("author"),
        topic: params.get("topic"),
        cost: params.get("cost")
    };
    db.push(newBook);           // push new book into database
    res.send(generateList());   // send the list of books
});

// b) list all books
app.get("/getAllBooks", function (req, res) {
    res.send(generateList());   // send the list of books
});

// c) delete book by id
app.get("/deleteid/:idToDelete", function (req, res) {
    deleteBook(req.params.idToDelete);  // delete the book via deleteBook function
    res.send(generateList());   // send the list of books
});

// d) get bookstore total value
app.get("/getbookstorevalue", function (req, res) {
    let cost = 0;   // total cost of bookstore
    for (let i = 0; i < db.length; i++) {   // iterate through books and sum cost
        cost += parseFloat(db[i]    .cost);
    }
    let msg = `Total book store value: $${cost}`
    res.send(msg);
});

app.get("/booksinacategory/:category", function(req,res) {
    let count = 0
    for (let i = 0; i < db.length; i++) {
        if (db[i].topic == req.params.category) {
            count++;
        }
    } 
    res.send(`Number of books in category "${req.params.category}": ${count}`);
});
app.listen(8080);

// generate the formatted list of books
function generateList() {
    let st = "ID    Title  Author   Topic  Cost</br>";
    for (let i = 0; i < db.length; i++) {   // iterate through books and print attributes
        st += db[i].id + " | " + db[i].title + " | " + db[i].author + " | " + db[i].topic + " | " + db[i].cost + "</br>";
    }
    return st;
}

// find the book containing given id and delete it
function deleteBook(id) {
    for (let i = 0; i < db.length; i++) {   // iterate through books
        if (db[i].id == id) {       // check book for matching id
            return db.splice(i, 1); // splice out the book if id matches
        }
    }
}

// generate a random ID
function generateId() {
    return Math.round(Math.random()*1000);  // return a random number
}