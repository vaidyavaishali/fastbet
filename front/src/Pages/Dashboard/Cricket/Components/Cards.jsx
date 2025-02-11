import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useProfile } from "../../../../context/ProfileContext";


const ChoosePlayerCards = () => {
  const [cards, setCards] = useState([]); // Stores 3 cards
  const [allPlayers, setAllPlayers] = useState([]); // Stores player options
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [modalPlayers, setModalPlayers] = useState({ player1: "", player2: "" });
  const { profile } = useProfile();
  

  // const [selectedPlayers, setSelectedPlayers] = useState(new Set());

  // const getSelectedPlayers = () => selectedPlayers;
  const fetchCards = () => {
    axios.get("http://localhost:4000/api/cards")
      .then(response => setCards(response.data.slice(0, 3))) // Ensure only 3 cards
      .catch(error => console.error("Error fetching cards:", error));

  }
  useEffect(() => {
    fetchCards();
    axios.get("http://localhost:4000/api/players")
      .then(response => setAllPlayers(response.data))
      .catch(error => console.error("Error fetching players:", error));
  }, []);

  const openModal = (index) => {
    setSelectedCardIndex(index);
    setModalPlayers({ player1: cards[index]?.cards[0]?.player1 || "", player2: cards[index]?.cards[0]?.player2 || "" });
  };

  const closeModal = () => {
    setSelectedCardIndex(null);
  };

  const handleSubmit = () => {
    if (!modalPlayers.player1 || !modalPlayers.player2) {
      toast.error("Please select both players before submitting.");
      return;
    }

    const player1Data = allPlayers.find(player => player.playerName === modalPlayers.player1);
    const player2Data = allPlayers.find(player => player.playerName === modalPlayers.player2);

    if (!player1Data || !player2Data) {
      toast.error("Error: Player data not found.");
      return;
    }

    const totalRuns = player1Data.score + player2Data.score;

    if (selectedCardIndex === null || selectedCardIndex >= cards.length || !cards[selectedCardIndex]) {
      toast.error("No valid card selected.");
      return;
    }

    const cardId = cards[selectedCardIndex]?._id;
    if (!cardId) {
      console.error("❌ Invalid cardId:", cardId);
      toast.error("Error: Invalid card selection.");
      return;
    }

    axios.put(`http://localhost:4000/api/cards/select/${cardId}`, {
      player1: modalPlayers.player1,
      player2: modalPlayers.player2,
      user: profile.email,
      totalRuns: totalRuns
    })
      .then(response => {
        setCards(prevCards => prevCards.map(card => (card._id === cardId ? response.data : card)));
        // setSelectedPlayers(prev => new Set([...prev, modalPlayers.player1, modalPlayers.player2]));

        closeModal();
        toast.success("Players selected successfully!");
      })
      .catch(error => {
        console.error(error);
        toast.error("You Already Selected This Card");
      });
  };



  const handleReset = () => {
    axios.delete("http://localhost:4000/api/cards/reset")
      .then(response => {
        if (response.status === 200) {
          toast.success("Cards reset successfully!");
          fetchCards();
        }
      })
      .catch(error => {
        console.error(error);
        toast.error("Failed to reset cards");
      });
  };

  const handlePlay = () => {
    if (cards.length === 0) {
      toast.error("No cards available to play.");
      return;
    }

    // ✅ Find the card with the highest `totalRuns`
    let winningCard = cards.reduce((maxCard, card) => {
      let currentCardTotal = card.cards[0]?.totalRuns || 0;
      return currentCardTotal > (maxCard.cards[0]?.totalRuns || 0) ? card : maxCard;
    }, cards[0]);

    if (!winningCard || !winningCard._id) {
      toast.error("No valid winning card found.");
      return;
    }

    // ✅ Display the winning card details
    if (winningCard.cards[0]?.totalRuns > 0) {
      toast.success(
        `🏆 Winning Card!\n 
        Player 1: ${winningCard.cards[0]?.player1 || "N/A"}\n 
        Player 2: ${winningCard.cards[0]?.player2 || "N/A"}\n 
        Total Runs: ${winningCard.cards[0]?.totalRuns}`
      );

      // ✅ API call to update isWinner
      axios.put(`http://localhost:4000/api/cards/winner/${winningCard.cards[0]._id}`)
        .then(response => {
          toast.success("🏆 Winning card updated in the database!");
          fetchCards(); // ✅ Refresh cards after updating the winner
        })
        .catch(error => {
          console.error("❌ Error updating winning card:", error);
          toast.error("Failed to update the winning card.");
        });
    } else {
      toast.info("No card has a valid total runs score yet.");
    }
  };

  
  const getSelectedPlayers = () => {
    const selected = new Set();
    cards.forEach(card => {
      card.cards.forEach(subCard => {
        if (subCard.player1) selected.add(subCard.player1);
        if (subCard.player2) selected.add(subCard.player2);
      });
    });
    return selected;
  };
  return (
    <SectionWrapper>
      <Title>Choose Players for 3 Cards</Title>
      <CardsWrapper>
        {cards.map((card, index) => {
          const isWinner = card.cards[0]?.isWinner;
          return (
            <PlayerCard
              key={card._id}
              selected={card.cards[0]?.player1 && card.cards[0]?.player2}
              onClick={() => openModal(index)}
              style={{ backgroundColor: isWinner ? "#ffeb3b" : undefined }} // Highlight winner card
            >
              <p>Player 1: {card.cards[0]?.player1 || "Not Selected"}</p>
              <p>Player 2: {card.cards[0]?.player2 || "Not Selected"}</p>
              <p>Total Runs: {card.cards[0]?.totalRuns !== undefined ? card.cards[0]?.totalRuns : "0"}</p>
            </PlayerCard>
          );
        })}
      </CardsWrapper>


      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
        <Button onClick={handlePlay}>Play</Button>
        <Button onClick={handleReset} color="#ff5722" hoverColor="#e64a19">Reset</Button>
      </div>

      {selectedCardIndex !== null && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "white", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
            <h3>Select Players</h3>
            <Select
              value={modalPlayers.player1}
              onChange={(e) => setModalPlayers({ ...modalPlayers, player1: e.target.value })}
              disabled={!!modalPlayers.player1 || getSelectedPlayers().has(modalPlayers.player2)} // Disable if player1 is already set
            >
              <option value="">Select Player</option>
              {allPlayers.map(player => (
                <option
                  key={player.playerName}
                  value={player.playerName}
                  disabled={getSelectedPlayers().has(player.playerName) || modalPlayers.player2 === player.playerName}
                >
                  {player.playerName}
                </option>
              ))}
            </Select>

            <Select
              value={modalPlayers.player2}
              onChange={(e) => setModalPlayers({ ...modalPlayers, player2: e.target.value })}
              disabled={!!modalPlayers.player2 || getSelectedPlayers().has(modalPlayers.player1)} // Disable if player2 is already set
            >
              <option value="">Select Player</option>
              {allPlayers.map(player => (
                <option
                  key={player.playerName}
                  value={player.playerName}
                  disabled={getSelectedPlayers().has(player.playerName) || modalPlayers.player1 === player.playerName}
                >
                  {player.playerName}
                </option>
              ))}
            </Select>
            <div style={{ marginTop: "20px" }}>
              <Button onClick={handleSubmit}>Submit</Button>
              <Button onClick={closeModal} color="gray" hoverColor="lightgray">Cancel</Button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </SectionWrapper>
  );
};

export default ChoosePlayerCards;

const SectionWrapper = styled.section`
  color: #fff;
  text-align: center;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  @media (min-width: 768px) {
    height: 75vh;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const CardsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const PlayerCard = styled.div`
  background-color: ${({ selected }) => (selected ? "#4caf50" : "#c4c4c4")};
  width: 260px;
  height: 250px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  color: black;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  transition: 0.3s;
`;

const Button = styled.button`
  background-color: ${({ color }) => color || "#4caf50"};
  color: white;
  font-size: 1.2rem;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${({ hoverColor }) => hoverColor || "#45a049"};
  }
`;

const Select = styled.select`
  margin-top: 10px;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #333;
  cursor: pointer;
  width: 90%;
`;
