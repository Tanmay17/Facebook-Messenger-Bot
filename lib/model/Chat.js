const mongoose = require("mongoose");

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