const express = require('express');
const { createPlayer, getAllPlayers, getPlayerById } = require('../../controller/cricket/playerController');
const { selectCard, getCards, resetCards, updateWinner } = require('../../controller/cricket/cardsController');
const playerRouter = express.Router();
// Define routes
playerRouter.post('/api/players', createPlayer);
playerRouter.get('/api/players/:playerId', getPlayerById);
playerRouter.get('/api/players', getAllPlayers);

playerRouter.get("/api/cards", getCards);
playerRouter.put("/api/cards/select/:cardId", selectCard);
playerRouter.delete("/api/cards/reset", resetCards);
playerRouter.put("/api/cards/winner/:cardId", updateWinner);


module.exports = playerRouter;