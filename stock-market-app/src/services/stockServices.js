// import axios from 'axios';

// const API_KEY = process.env.REACT_APP_API_KEY;
// const BASE_URL = 'https://api.polygon.io/v2/aggs/ticker';

// export const fetchStockData = async (symbol, fromDate, toDate) => {
//     try {
//         const response = await axios.get(
//             `${BASE_URL}/${symbol}/range/1/day/${fromDate}/${toDate}?adjusted=true&sort=asc&apiKey=${API_KEY}`
//         );
//         return response.data.results;
//     } catch (error) {
//         console.error('Error fetching stock data:', error);
//         throw error;
//     }
// };
