import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const TimeTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/subscription-state`);
        const apiData = response.data;

        if (apiData.scrapedData && apiData.scrapedData.chartData) {
          setData(apiData.scrapedData.chartData);
        } else {
          setError("No market data found.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again.");
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
