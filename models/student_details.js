const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const studentSchema = new Schema({



    studentName: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true,

    },

    gender: {
        type: String,
        required: true,

    },

    studentClass: {
        type: String,
        required: true,
    }

})




module.exports = mongoose.model('StudentDetails', studentSchema)