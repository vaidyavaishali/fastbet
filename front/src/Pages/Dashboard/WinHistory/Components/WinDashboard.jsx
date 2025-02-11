import React from "react";
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
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;



const WinDashboard = () => {
  const bidData =[
    { number: 1, points: 50 },
    { number: 5, points: 30 },
    { number: 5, points: 30 },
  ];


  return (
    <Container>
      <Wrapper>
        <Title>Your Winning Bids</Title>
        {bidData.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <Th>Number</Th>
                <Th>Points</Th>
              </tr>
            </thead>
            <tbody>
              {bidData.map((bid, index) => (
                <tr key={index}>
                  <Td>{bid.number}</Td>
                  <Td>{bid.points}</Td>
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

export default WinDashboard;
