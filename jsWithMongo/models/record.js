const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
    Tax_Type : {
        type: String,
        required : true
    },
    Tax_Amount : {
        type: Object,
        required : true
    },
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    
    
},
{timestamps: true})

module.exports = mongoose.model('Record', recordSchema)