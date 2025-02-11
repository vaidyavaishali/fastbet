import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  background-color: #0b3c68;
  display: flex;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  background-color: white;
  width: 100%;
  padding: 20px;
  border-radius: 20px;
`;

const TabContainer = styled.div`
  display: flex;
  width: 100%;
  border-radius: 30px;
  overflow: hidden;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  flex: 1;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  text-align: center;
  color: white;
  background-color: ${({ active }) => (active ? "#0b3c68" : "gray")};
  border-radius: ${({ first, last }) =>
    first ? "30px 0 0 30px" : last ? "0 30px 30px 0" : "0"};

  &:hover {
    background-color: ${({ active }) => (active ? "#0b3c68" : "#888")};
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
  color: black;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 32px;
    text-align: center;
  }
`;

const MessageBox = styled.div`
  background-color: #e0e0e5;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  font-size: 16px;
  color: black;
  font-weight: bold;
  margin-top: 15px;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  background-color: #0b3c68;
  color: white;
  padding: 10px;
  text-align: left;
  border-radius: 5px;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
`;

const BidsDashboard = () => {
  const [activeTab, setActiveTab] = useState("bids");

  // Sample bid data
  const bidData = [
    { id: 1, game: "Game A", points: 50, date: "2025-02-10" },
    { id: 2, game: "Game B", points: 75, date: "2025-02-09" },
  ];

  return (
    <Container>
      <Wrapper>
        {/* Tabs */}
        <TabContainer>
          <Tab first active={activeTab === "bids"} onClick={() => setActiveTab("bids")}>
            Bids
          </Tab>
          <Tab last active={activeTab === "gali-bids"} onClick={() => setActiveTab("gali-bids")}>
            Gali Bids
          </Tab>
        </TabContainer>

        {/* Content */}
        <Title>Your Bids</Title>
        {bidData.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <Th>Game</Th>
                <Th>Points</Th>
                <Th>Date</Th>
              </tr>
            </thead>
            <tbody>
              {bidData.map((bid) => (
                <tr key={bid.id}>
                  <Td>{bid.game}</Td>
                  <Td>{bid.points}</Td>
                  <Td>{bid.date}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <MessageBox>You do not have any bid.</MessageBox>
        )}
      </Wrapper>
    </Container>
  );
};

export default BidsDashboard;