const mongoose = require('mongoose');

const subscribeSchema = new mongoose.Schema({
    email: {type: String, required: Boolean},
    subscribedAt: {type: Date, default: Date.now}
})

const SubscribeModel = mongoose.model("subscribe", subscribeSchema)

module.exports = SubscribeModel