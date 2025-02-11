import React from "react";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import matkaImage from '../../assets/matkaImag.png';
import { MainContainer } from "./Wallet";
import DashboardNavbar from "./Components/Navbar";
import { Link, useParams } from "react-router-dom";


const Container = styled.div`
  background-color: #0b3c68;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 40px;
`;

const Wrapper = styled.div`
  background-color: white;
  width: 100%;
  max-width: 1400px;
  padding: 30px;
  border-radius: 10px;
`;

export const BackButton = styled.button`
  background-color: #0b3c68;
  color: white;
  border: none;
  padding: 5px 15px;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  background: #0b3c68;
  border-radius: 20px;
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
  background-color: ${props => props.color};
  color: white;
  text-align: center;
  padding: 10px;
  font-weight: bold;
  width:fit-content;
  font-size: 16px;
  border-radius: 10px;
  margin: auto;
  animation: colorChange 0.5s infinite alternate;
  @keyframes colorChange {
    0% {
      background-color: red;
    }
    100% {
      background-color: #0b3c68;
    }
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  text-align: center;
`;

const PotImage = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 10px;
`;

const Label = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin: 0;
`;

const SubLabel = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: gray;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 2px solid #ccc; /* Added bottom border */
`;

const Play = () => {
  const { gameName } = useParams()
  const items = [
    { id: 1, title: "10 KA 95", subtitle: "SINGLE DIGIT", image: matkaImage },
    { id: 2, title: "10 KA 950", subtitle: "JODI DIGIT", image: matkaImage },
    { id: 3, title: "10 KA 95", subtitle: "SINGLE DIGIT", image: matkaImage },
    { id: 4, title: "10 KA 950", subtitle: "JODI DIGIT", image: matkaImage },
  ];
  // const { profile } = useProfile();
  // const navigate = useNavigate()
  return (

    <MainContainer>
      <DashboardNavbar />
      <Container>
        <Wrapper>
          <Header>
            <Link to="/dashboard">
              <BackButton>
                <FaArrowLeft />
              </BackButton>
            </Link>
            <Title>{gameName}</Title>
          </Header>

          <Banner>For Better Experience <br /> Download ShriMatka App</Banner>

          <GridContainer>
            {items.map((item) => (
              <Link to={`/dashboard/bidpage/${gameName}`} key={item.id}>
                <Card>
                  <PotImage src={item.image} alt={item.subtitle} />
                  <SubLabel>{item.title}</SubLabel>
                  <Label>{item.subtitle}</Label>
                </Card>
              </Link>
            ))}
          </GridContainer>
        </Wrapper>
      </Container>
    </MainContainer>


  );
};

export default Play;
