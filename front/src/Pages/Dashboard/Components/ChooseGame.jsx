import React from "react";
import styled from "styled-components";
import { FaTrophy } from "react-icons/fa";
import { GiCardAceHearts } from "react-icons/gi";
import { Link } from "react-router-dom";

const Container = styled.div`
  background-color: #0b3c68;
  display: flex;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
`;

const CardContainer = styled.div`
  background-color: white;
  width: 100%;
  padding: 40px 20px;
  border-radius: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

const GameCard = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
  width: 150px;
  text-decoration: none;
  color: inherit;

  svg {
    font-size: 80px;
    color: #0b3c68;
    transition: 0.3s;

    @media (max-width: 768px) {
      font-size: 60px;
    }
  }

  p {
    font-weight: bold;
    font-size: 16px;

    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  &:hover svg {
    color: #ffcc00;
  }
`;

// Define game options dynamically with appropriate icons & links
const gameOptions = [
  { id: 1, name: "Cricket", icon: <FaTrophy />, link: "/dashboard/cricket" },
  { id: 2, name: "Matka", icon: <GiCardAceHearts />, link: "/dashboard" },
  { id: 6, name: "Game 3", icon: <FaTrophy />, link: "/dashboard/tournaments" },
];

const ChooseGame = () => {
  return (
    <Container>
      <CardContainer>
        {gameOptions.map((game) => (
          <GameCard key={game.id} to={game.link}>
            {game.icon}
            <p>{game.name}</p>
          </GameCard>
        ))}
      </CardContainer>
    </Container>
  );
};

export default ChooseGame;
