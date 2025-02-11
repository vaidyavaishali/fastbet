const express = require("express");
const Card = require("../../models/cricket/cardsModel");
const CardModel = require("../../models/cricket/cardsModel");
const { default: mongoose } = require("mongoose");
const playerModel = require("../../models/cricket/playerModels");

// Create or update card selections


const selectCard = async (req, res) => {
    try {
        const { cardId } = req.params;
        const { player1, player2, user, totalRuns } = req.body;

        console.log("Received totalRuns:", totalRuns);
        console.log("Request Body:", req.body);

        let findcard = await Card.findOne({ _id: cardId });
        let findAllCards = await Card.find();
        if (!findcard) {
            return res.status(404).json({ message: "Card document not found" });
        }


        // ✅ Ensure `user` array exists
        if (!findcard.user) {
            findcard.user = [];
        }

        // ✅ Check if the user has already selected any card
        // const userAlreadySelected = findcard.cards.some(card => card.cardUser?.includes(user));
        // if (userAlreadySelected) {
        //     return res.status(409).json({ message: "User has already selected a card. Cannot select another one." });
        // }
        console.log(findAllCards, "addcard")
        // const emailToCheck = "vaidyavaishali2144@gmail.com";
        const emailExists = findAllCards.some(obj => obj.user.includes(user));
console.log(emailExists,"emailExists")
        if (emailExists) {
            return res.status(409).json({ message: "User has already selected a card. Cannot select another one." });
        }
        // ✅ Add user to `user` array if not already present
        if (!findcard.user.includes(user)) {
            findcard.user.push(user);
        } else {
            return res.status(409).json({ message: "User already in card, no update needed." });
        }

        console.log("Existing Users:", findcard.user);


        // ✅ Find a card with both players already selected
        let selectedCard = findcard.cards.find(card => card.player1 && card.player2);

        if (selectedCard) {
            // ✅ If players are already selected, only add user to `cardUser`
            if (!selectedCard.cardUser) {
                selectedCard.cardUser = [];
            }

            if (!selectedCard.cardUser.includes(user)) {
                selectedCard.cardUser.push(user);
                console.log("User added to existing card.");
            } else {
                return res.status(409).json({ message: "User already in card, no update needed." });
            }
        } else {
            // ✅ If no card has players, assign new players
            selectedCard = findcard.cards.find(card => !card.player1 || !card.player2);

            if (selectedCard) {
                if (!selectedCard.player1) {
                    selectedCard.player1 = player1;
                }
                if (!selectedCard.player2) {
                    selectedCard.player2 = player2;
                }
                selectedCard.totalRuns = totalRuns;

                if (!selectedCard.cardUser) {
                    selectedCard.cardUser = [];
                }
                selectedCard.cardUser.push(user);
                console.log("New players assigned.");
            } else {
                return res.status(400).json({ message: "No available card to update." });
            }
        }

        console.log("Selected Card After Update:", selectedCard);

        // ✅ Mark fields as modified so MongoDB detects changes
        findcard.markModified("cards");
        findcard.markModified("user");

        await findcard.save();

        return res.status(200).json(findcard); // ✅ Ensure only ONE response is sent
    } catch (error) {
        console.error("Error updating card:", error);
        if (!res.headersSent) {
            return res.status(500).json({ message: error.message }); // ✅ Ensures only ONE response is sent
        }
    }
};

const updateWinner = async (req, res) => {
    try {
      const { cardId } = req.params;
  
      // ✅ Set `isWinner: false` for all cards first
      await Card.updateMany({}, { $set: { "cards.$[].isWinner": false } });
  
      // ✅ Find the winning card and update it
      const updatedCard = await Card.findOneAndUpdate(
        { "cards._id": cardId },
        { $set: { "cards.$.isWinner": true } },
        { new: true }
      );
  
      if (!updatedCard) {
        return res.status(404).json({ message: "Winning card not found" });
      }
  
      res.status(200).json(updatedCard);
    } catch (error) {
      console.error("Error updating winner:", error);
      res.status(500).json({ message: error.message });
    }
  };
  
  




// Get the current card state
const getCards = async (req, res) => {
    try {
        let cards = await Card.find(); // Fetch all cards

        // Ensure there are at least 3 cards
        if (cards.length < 3) {
            const newCards = [];
            for (let i = cards.length; i < 3; i++) {
                newCards.push(new Card({
                    cards: [{
                        "player1": "",
                        "player2": "",
                        "totalRuns": 0,
                        "isWinner": false,

                        "_id": new mongoose.Types.ObjectId()
                    }]
                }))
            };
            await Card.insertMany(newCards);
            cards = await Card.find();
        }

        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Reset the game
const resetCards = async (req, res) => {
    try {
        await Card.deleteMany({});
        res.status(200).json({ message: "Game reset successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { selectCard, getCards, resetCards, updateWinner };