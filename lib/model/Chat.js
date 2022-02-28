const mongoose = require("mongoose");
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/bot';
mongoose.connect( mongoURL )
const ChatSchema = new mongoose.Schema( {

    _state: {
        type: mongoose.SchemaTypes.Mixed,
        required: true
    },

    lastActivity: {
        type: Number
    },
    
    platform: {
        type: String,
        required: true
    },
    
    user: {
        type: mongoose.SchemaTypes.Mixed,
        required: true
    }
} );

module.exports = mongoose.model( "Chat", ChatSchema );