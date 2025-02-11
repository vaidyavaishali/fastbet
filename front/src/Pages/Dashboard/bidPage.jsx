import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { MainContainer } from "./Wallet";
import { BackButton } from "./Play";
import { FaArrowLeft } from "react-icons/fa";
import { useProfile } from "../../context/ProfileContext";
import { toast } from "react-toastify";

const Container = styled.div`
  background-color: #0b3c68;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  background-color: white;
  width: 100%;
  padding: 20px 20px 90px 20px;
  border-radius: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #0b3c68;
  border-radius: 20px;
  padding: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #6fdc6f;
  text-transform: uppercase;
  text-align: center;
  flex: 1;
`;

const Banner = styled.div`
  background-color: red;
  color: white;
  text-align: center;
  padding: 10px;
  font-weight: bold;
  font-size: 16px;
  border-radius: 10px;
  margin: 20px auto 0 auto;
  width: 100%;
  animation: backgroundChange 1s infinite;

  @keyframes backgroundChange {
    0% { background-color: red; }
    50% { background-color: #0b3c68; }
  }
`;
const BidForm = styled.div`
  background-color: #e0e0e5;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  text-align: left;
  width: 40%;
  padding-bottom: 60px;
  box-sizing:border-box;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Label = styled.label`
  font-weight: bold;
  color: black;
`;

const NumberRow = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 10px;
`;

const NumberButton = styled.button`
  background: #0b3c68;
  color: white;
  border: none;
  padding: 10px;
  width: 40%;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  border-radius: 8px;
`;

const InputField = styled.input`
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-left: 10px;
  width: 50%;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  padding: 10px;
  background: white;
  border-radius: 10px;

`;

const SubmitButton = styled.button`
  background: #0b3c68;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const CloseButton = styled.button`
background: gray;
color: white;
padding: 10px 20px;
font-size: 16px;
font-weight: bold;
border: none;
border-radius: 8px;
cursor: pointer;
`;


const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 80%;
  max-width: 400px;
  text-align: center;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;
const BottomContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;`
; 

const BidPage = () => {
  const { gameName } = useParams();
  const { profile } = useProfile();
  const [points, setPoints] = useState(Array(10).fill(""));
  const [totalBidPoints, setTotalBidPoints] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const handleInputChange = (index, value) => {
    const newPoints = [...points];
    newPoints[index] = value ? parseFloat(value) || "" : ""; // Ensure numeric values
    setPoints(newPoints);
  
    const nonEmptyBids = newPoints.filter((point) => point !== "").length;
    const sum = newPoints.reduce((acc, curr) => acc + (parseFloat(curr) || 0), 0);
    setTotalBidPoints(sum);
  
    if (nonEmptyBids < 3) {
      toast.error("At least 3 bids should be added");
    }
  };
  

  const handleSubmit = () => {
    setShowPopup(true);
  };

  return (
    <MainContainer>
      <Container>
        <Wrapper>
          <Header>
            <Link to={`/dashboard/play/${gameName}`}>
              <BackButton>
                <FaArrowLeft />
              </BackButton>
            </Link>
            <Title>{gameName}</Title>
          </Header>
          <Banner>For Better Experience <br /> Download ShriMatka App</Banner>

          <BidForm>
            <Label>Enter Your Bid</Label>
            {points.map((point, index) => (
              <NumberRow key={index}>
                <NumberButton>{index}</NumberButton>
                <InputField
                  type="number"
                  value={point}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  placeholder="Enter Points"
                />
              </NumberRow>
            ))}
          </BidForm>
          <BottomContainer>
          <Footer>
            <div><strong>{totalBidPoints}</strong> Bid Points</div>
            <div><strong>{profile.walletBalance}</strong> Balance Points</div>
            <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
          </Footer>
          </BottomContainer>
        </Wrapper>
      </Container>

      {showPopup && (
        <>
          <Overlay onClick={() => setShowPopup(false)} />
          <Popup>
            <h2>Bid Summary</h2>
            {points.map((point, index) => point && (
              <p key={index}>Number {index}: {point} Points</p>
            ))}
            <p><strong>Total Points: {totalBidPoints}</strong></p>
            <CloseButton onClick={() => setShowPopup(false)}>Close</CloseButton>
          </Popup>
        </>
      )}
    </MainContainer>
  );
};

export default BidPage;
