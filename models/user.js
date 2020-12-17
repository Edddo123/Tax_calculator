const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const userSchema = new Schema({
    email : {
        type: String,
        required:true
    } ,
    name : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },

    record : {
        type: Schema.Types.ObjectId,
        ref : 'Record'
    },

    post : {
        type : Object
    }
})

module.exports = mongoose.model('User', userSchema)