const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    creator: {
        type:String,
        required : true
    } ,
    content: {
        type:String,
        required : true
    } ,
    userId : {
        type: Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    }
}, {timestamps: true}, {useFindandModify: false})

module.exports = mongoose.model('Post', postSchema)