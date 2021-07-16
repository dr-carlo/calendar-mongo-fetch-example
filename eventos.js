const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema({
    title: { type: String },
    notes: { type: String },
    isDeleted: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
});
module.exports = mongoose.model('Eventos', EventSchema);
