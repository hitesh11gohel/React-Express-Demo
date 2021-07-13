const mongoose = require('mongoose');

const city  = mongoose.Schema({
    cityid : {
        type : Number,
        required : true
    },
    lable : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    }
})

const City = mongoose.model("city",city);

module.exports = City