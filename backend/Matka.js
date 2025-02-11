
const axios = require('axios');
const puppeteer = require('puppeteer-core'); // Use 'puppeteer-core' since we are specifying Chrome's path
const express = require('express');
const PORT = 3000;
// const ScraperRouter = require('./Routes/scraper'); 
const ScraperRouter = express.Router();

// Endpoint to fetch subscription state and scrape the webpage
ScraperRouter.get('/api/subscription-state', async (req, res) => {
    try {
        const apiKey = 'ced26f3a4b1a8b74418acd8fad1e9d90';
        const domain = 'https://www.shrimatka.in';
        const apiUrl = `https://www.push.shrimatka.in/api/subscription-state/?key=${apiKey}&domain=${domain}`;

        // Fetch data from the API
        const apiResponse = await axios.get(apiUrl);

        // Log the API response
        console.log('API Response:', apiResponse.data);

        // Use Puppeteer to scrape the webpage
        const browser = await puppeteer.launch({
            executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
            headless: true
        });
        
        
        const page = await browser.newPage();

        // Navigate to the domain and wait for JavaScript to render
        await page.goto(domain, { waitUntil: 'networkidle2' });

        // Extract market data
        const scrapedData = await page.evaluate(() => {
            const markets = [];
            const marketElements = document.querySelectorAll('.clmn.clmn6.mblinbk.center');
            marketElements.forEach(el => {
                const circle = el.querySelector('.v-center');
                const openCloseTimes = el.querySelectorAll('.cmlo.font1 .clmn.clmn6.center.mblinbk');
                const marketName = el.querySelector('h2.center.font125')?.innerText.trim();

                if (circle && openCloseTimes.length === 2 && marketName) {
                    const openNumber = circle.querySelector('.font150:nth-child(1)')?.innerText.trim();
                    const jodiDigit = circle.querySelector('b.font4')?.innerText.trim();
                    const closeNumber = circle.querySelector('.font150:nth-child(3)')?.innerText.trim();
                    const openTime = openCloseTimes[0].querySelector('span')?.innerText.trim();
                    const closeTime = openCloseTimes[1].querySelector('span')?.innerText.trim();

                    markets.push({
                        marketName,
                        openNumber,
                        jodiDigit,
                        closeNumber,
                        openTime,
                        closeTime
                    });
                }
            });

            // Extract Market Open Close Chart data
            const chartData = [];
            const chartRows = Array.from(document.querySelectorAll('table tr'));

            chartRows.forEach(row => {
                const cells = row.querySelectorAll('td');
                if (cells.length >= 3) {
                    const market = cells[0].innerText.trim();
                    const openTime = cells[1].innerText.trim();
                    const closeTime = cells[2].innerText.trim();
                    const chartLink = cells[3]?.querySelector('a')?.href || '#';

                    chartData.push({
                        market,
                        openTime,
                        closeTime,
                        chartLink
                    });
                }
            });

            return { markets, chartData };
        });

        await browser.close();

        // Send the API response and scraped data back to the client
        res.json({
            message: 'Data fetched and scraped successfully',
            subscriptionState: apiResponse.data,
            scrapedData
        });
    } catch (error) {
        console.error('Error fetching or scraping data:', error.message);
        res.status(500).json({
            error: 'An error occurred while fetching or scraping data',
            details: error.message
        });
    }
});

module.exports = ScraperRouter
