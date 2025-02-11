import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  padding: 30px 0px;
  @media (max-width: 768px) {
    width: 95%;
    padding: 0;
    margin: auto;
  }
`;

const Container = styled.div`
  background: #002b4e;
  width: 95%;
  margin: 10px auto;
  border: 1px solid #b2f7a5;
  padding: 20px;
  border-radius: 10px;
  color: white;
  text-align: center;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  background: #013a63;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #355f85;
`;

const Header = styled(Row)`
  background: #b2f7a5;
  color: black;
  font-weight: bold;
`;

const Cell = styled.div.attrs({ as: "div" })`
  flex: 1;
  text-align: center;
`;

const Link = styled.a`
  color: #a3f7b5;
  text-decoration: underline;
  cursor: pointer;
`;


const TimeTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/subscription-state`);
    
        // Check if response is JSON, not HTML
        if (!response.data || typeof response.data !== "object") {
          throw new Error("Invalid response: Expected JSON but received an HTML document.");
        }
    
        if (response.data.scrapedData && response.data.scrapedData.chartData) {
          setData(response.data.scrapedData.chartData);
        } else {
          setError("No market data found.");
        }
      } catch (err) {
        console.error("❌ API Error:", err);
        setError("Failed to fetch data. Please check the API.");
      } finally {
        setLoading(false);
      }
    };
    

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <MainContainer id="time-table">
      <Container>
        <Title>Market Data</Title>
        <Grid>
          <Header>
            <Cell>Market</Cell>
            <Cell>Open</Cell>
            <Cell>Close</Cell>
            <Cell>Chart</Cell>
          </Header>
          {data.map((market, index) => (
            <Row key={index}>
              <Cell>{market.market}</Cell>
              <Cell>{market.openTime}</Cell>
              <Cell>{market.closeTime}</Cell>
              <Cell>
                <Link href={market.chartLink} target="_blank" rel="noopener noreferrer">
                  View Chart
                </Link>
              </Cell>
            </Row>
          ))}
        </Grid>
      </Container>
    </MainContainer>
  );
};

export default TimeTable;

