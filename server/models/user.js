const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    name : {
        type: String,
        required: true
    },
    outh: {
        type: Boolean,
        required: true
    },
    todo: [{type: Schema.Types.ObjectId, ref: 'Activity'}]
}, {
    timestamps: true
})

var User = mongoose.model('User', userSchema);

module.exports = User;