const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    subscribeDate : {
        type: Date,
        required: true,
        default: Date.now
    },
    recipe: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Subscriber', subscriberSchema);
