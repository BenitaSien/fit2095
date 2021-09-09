const mongoose = require('mongoose');
const Doctor = require('./models/doctorSchema');
const Patient = require('./models/patientSchema');
let path = require('path')
const express = require("express");
const ejs = require("ejs");
const { nextTick } = require('process');

const app = express();
app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.listen(8080);

mongoose.connect('mongodb://localhost:27017/db', function (err) {
    if (err) {
        console.log('Error in Mongoose connection');
        throw err;
    }
    console.log('Successfully connected');
});

let viewsPath = __dirname + "/views/";

app.use(express.static(path.join(__dirname, 'public/images')));
app.use(express.static(path.join(__dirname, 'public/css')));


// GET requests

app.get("/", function(req, res) {
    res.render(viewsPath + "index.html");
});

app.get("/adddoctor", function(req, res) {
    res.sendFile(viewsPath + "adddoctor.html");
});

app.get("/listdoctors", function(req, res) {
    Doctor
    .find({},
    (function (err, data) {
        res.render(viewsPath + "listdoctors.html", {
            doctors: data
        });
    }));
});

app.get("/addpatient", function(req, res) {
    Doctor
    .find({},
    (function (err, data) {
        res.render(viewsPath + "addpatient.html", {
            doctors: data
        });
    }));
});

app.get("/listpatients", function(req, res) {
    Patient
    .find({}).populate('doctor').exec
        (function (err, data) {
        res.render(viewsPath + "listpatients.html", {
            patients: data
        });
    });
});

app.get("/deletepatient", function(req, res) {
    res.sendFile(viewsPath + "deletepatient.html");
});

app.get("/updatenumpatients", function(req, res) {
    Doctor
    .find({},
    (function (err, data) {
        res.render(viewsPath + "updatenumpatients.html", {
            doctors: data
        });
    }));
});

app.get("/invaliddata", function(req, res) {
    res.sendFile(viewsPath + "invaliddata.html");
})

// POST requests

app.post("/postNewDoctor", function(req, res) {
    doctorDetails = req.body;
    let newDoctor = new Doctor({
        _id: new mongoose.Types.ObjectId(),
        fullName: {
            firstName: doctorDetails.firstName,
            lastName: doctorDetails.lastName
        },
        dateOfBirth: doctorDetails.year +'-'+ doctorDetails.month +'-'+ doctorDetails.day,
        address: {
            state: doctorDetails.state,
            suburb: doctorDetails.suburb,
            street: doctorDetails.street,
            unit: doctorDetails.unit,

        },
        numPatients: doctorDetails.numPatients
        
    });
    newDoctor.save(function (err) {
        if (err) { 
            console.log("invalid data")
            res.redirect(viewsPath + "invaliddata.html");
            return;
        }
        console.log('new doctor successfully added');
        res.redirect("/listdoctors");

    })

});

app.post("/postnewpatient", function(req, res) {
    details = req.body;
    let newPatient = new Patient({
        _id: new mongoose.Types.ObjectId(),
        fullName: details.firstName + ' ' + details.lastName,
        doctor: details.doctor,
        age: String(details.age),
        dateOfVisit: details.year +'-'+ details.month +'-'+ details.day,
        caseDescription: details.caseDescription
        
    });
    newPatient.save(function (err) {
        if (err) { 
            res.redirect("/invaliddata");
            return;
        }
        console.log('new patient successfully added');
        Doctor.updateOne({_id: newPatient.doctor}, { 
            $inc: { numPatients: 1 }
        }, function() {
            console.log("patient count incremented")
        })
        res.redirect("/listpatients");

    })
});

app.post("/postdeletepatient", function(req, res) {
    details = req.body;
    Patient.deleteOne({'fullName': details.firstName + ' ' + details.lastName},
    function (err, doc) {
        if (err) { 
            res.redirect("/invaliddata");
            return;
        }
        console.log("patient deleted")
        res.redirect("/listpatients");

    })

});

app.post("/postupdatenumpatients", function(req, res) {
    details = req.body;
    Doctor.updateOne({'_id': details.id},
    { $set: {'numPatients': details.numPatients}},
    function (err, doc) {
        if (err) { 
            res.redirect("/invaliddata");
            return;
        }
        console.log("number of patients updated")
        res.redirect("/listdoctors");
    })
});