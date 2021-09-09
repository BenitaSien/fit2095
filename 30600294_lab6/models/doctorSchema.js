const mongoose = require('mongoose');
let doctorSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    fullName: {
        firstName: {
            type: String,
            required: true
        },
        lastName: String
    },
    dateOfBirth: {
        type: Date
        
    },
    address: {
        state: {
            type: String,
            validate: {
                validator: function (stateValue) {
                    return stateValue.length >= 2 && stateValue.length <= 3;
                },
                message: 'State should have 2 to 3 characters'
            }
        },
        suburb: {
            type: String
        },
        street: {
            type: String
        },
        unit: {
            type: String
        }
    },
    numPatients: {
        type: Number,
        validate: {
            validator: function (numPatientsValue) {
                return numPatientsValue >= 0;
            },
            message: 'Number of patients must be positive'
        }

    }
});

module.exports = mongoose.model('Doctor', doctorSchema);