const mongoose = require('mongoose');

const State_ = mongoose.Schema({
    stateid: {
        type: Number,
        required : true
    },
    lable: {
        type : String,
        required : true
    }
})

const state = mongoose.model("state", State_);

module.exports = state;