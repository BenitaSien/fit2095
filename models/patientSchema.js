const mongoose = require('mongoose');
let patientSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    fullName: {
        type: String,
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    age: {
        type: Number,
        validate: {
            validator: function (ageValue) {
                return ageValue >= 0, ageValue <= 120;
            },
            message: 'Age should be 0 to 120'
        }
    },
    dateOfVisit: {
        type: Date,
        default: Date.now
    },
    caseDescription: {
        type: String,
        validate: {
            validator: function (caseDescrValue) {
                return caseDescrValue.length >= 10;
            },
            message: 'Case description should have at least 10 characters'
        }
    }
});

module.exports = mongoose.model('Patient', patientSchema);