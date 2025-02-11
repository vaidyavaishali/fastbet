const mongoose = require('mongoose');
const CardSchema = new mongoose.Schema({
    user: [{ type: String }],
    cards: [
        {
            player1: { type: String, default: "player1" },
            player2: { type: String, default: "player1" },
            totalRuns: { type: Number, default: 0 },
            isWinner: { type: Boolean, default: false },
            cardUser: [{ type: String }]
        },
        // { cardUser: [{ type: String }] }
    ]
}, { timestamps: true });

const CardModel = mongoose.model('Card', CardSchema);
module.exports = CardModel;
