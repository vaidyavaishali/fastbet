import React from "react";
import styled from "styled-components";
import { FaChartBar, FaPlay } from "react-icons/fa";

const Container = styled.div`
  background-color: #0b3c68;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  background-color: white;
  width: 100%;
  padding: 30px;
  border-radius: 10px;
`;

const Title = styled.h2`
  font-size: 50px;
  font-weight: bold;
  color: black;
  margin-bottom: 15px;
  text-align: left;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 15px;
`;

const GameCard = styled.div`
  background-color: #0b3c68;
  color: white;
  padding: 20px;  /* Reduced padding */
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
//   height: 90px;  /* Set a fixed height */
`;

const ChartSection = styled.div`
  display: flex;
 align-items: center;
  justify-content:start;
  flex-direction: column;
  width: 70px;
  text-align: center;

  svg {
    font-size: 30px; /* Reduced icon size */
    background-color: #d4f4a6;
    padding: 10px;
    border-radius: 50%;
    color: #0b3c68;
    margin-bottom: 5px;
  }

  p {
    font-size: 12px; /* Reduced font size */
    font-weight: bold;
     margin-top:3px;
  }
`;

const GameDetails = styled.div`
  flex: 1;
  text-align: center;
  padding: 0;
  height: fit-content;

  h4 {
    color: red;
    font-size: 14px; /* Reduced font size */
    font-weight: bold;
  }

  h3 {
    font-size: 14px; /* Reduced font size */
    font-weight: bold;
    margin: 2px 0;
  }

  p {
    font-size: 12px; /* Reduced font size */
  }
`;

const PlayButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:start;
  width: 70px;
  text-align: center;

  svg {
    font-size: 20px; /* Reduced icon size */
    background-color: #d4f4a6;
    padding: 15px;
    border-radius: 50%;
    color: red;
    margin-bottom: 5px;
  }

  p {
    font-size: 12px; /* Reduced font size */
    font-weight: bold;
  margin-top:3px;
  }
`;

const gamesData = [
    { id: 1, number: "770-40-226", name: "SRIDEVI MORNING", open: "09:10 AM", close: "10:10 AM" },
    { id: 2, number: "450-91-137", name: "RUDRAKSH MORNING", open: "10:10 AM", close: "11:10 AM" },
    { id: 3, number: "137-19-289", name: "KARNATAKA DAY", open: "10:05 AM", close: "11:05 AM" },
    { id: 4, number: "899-68-125", name: "MILAN MORNING", open: "10:25 AM", close: "11:25 AM" },
    { id: 5, number: "139-37-340", name: "KALYAN MORNING", open: "11:00 AM", close: "11:55 AM" },
    { id: 6, number: "489-12-246", name: "SRIDEVI", open: "11:20 AM", close: "12:20 PM" },
    { id: 7, number: "340-78-378", name: "MADHUR MORNING", open: "11:20 AM", close: "12:20 PM" },
    { id: 8, number: "380-10-370", name: "TIME BAZAR", open: "12:55 PM", close: "01:55 PM" },
    { id: 9, number: "780-57-359", name: "MADHUR DAY", open: "01:25 PM", close: "02:30 PM" },
];

const GaliDesawar = () => {
    return (
        <Container>
            <Wrapper>
                <Title>Gali Desawar Games</Title>
                <GridContainer>
                    {gamesData.map((game) => (
                        <GameCard key={game.id}>
                            <ChartSection>
                                <FaChartBar />
                                <p>Chart</p>
                                <p>Open: {game.open}</p>
                            </ChartSection>
                            <GameDetails>
                                <h4>{game.number}</h4>
                                <h3>{game.name}</h3>
                                <p style={{ color: "red", fontWeight: "bold" }}>Bid is Closed</p>
                            </GameDetails>
                            <PlayButton>
                                <FaPlay />
                                <p>Play</p>
                                <p>Close: {game.close}</p>
                            </PlayButton>
                        </GameCard>
                    ))}
                </GridContainer>
            </Wrapper>
        </Container>
    );
};

export default GaliDesawar;
