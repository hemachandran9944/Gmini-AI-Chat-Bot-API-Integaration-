const mongoose = require('mongoose');
const MessageSchema = require('./Message'); 

const ChatSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false
        },
        title: {
            type: String,
            trim: true,
            default: 'New Conversation'
        },
        status: {
            type: String,
            enum: ['active', 'archived', 'deleted'],
            default: 'active'
        },
        modelName: {
            type: String,
            default: 'gemini-2.5-flash'
        },
        messages: {
            type: [MessageSchema],
            default: []
        },
        totalTokensUsed: {
            type: Number,
            default: 0
        },
        messageCount: {
            type: Number,
            default: 0
        },
        lastMessageAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model('Chat', ChatSchema);