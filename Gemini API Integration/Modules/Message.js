const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            enum: ['user', 'model'],
            required: true
        },
        parts: [
            {
                text: {
                    type: String,
                    required: true,
                    trim: true
                }
            }
        ],
        tokenCount: {
            type: Number,
            default: 0
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    },
    { _id: true, versionKey: false }
);

module.exports = MessageSchema;