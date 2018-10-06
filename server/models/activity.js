const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    description: String,
    isComplete: Boolean,
    due_date: Date
}, {
    timestamps: true
})

var Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;