const express = require('express');
const cors = require('cors');
const axios = require('axios');
const searchButton = document.querySelector('.search-button');
const searchBar = document.querySelector('.search-bar');
const container = document.querySelector('.container');

const app = express();
app.use(cors());

const NEWS_API_KEY = '25f3575f395449c581d127cb0075588c';

searchButton.addEventListener('click', function () {
  const city = searchBar.value;
  const imageUrl = `https://source.unsplash.com/1600x900/?${city}`;
  container.style.backgroundImage = `url('${imageUrl}')`;
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/news', async (req, res) => {
  try {
    const city = req.query.city;
    const newsData = await getNewsData(city);
    res.send(newsData);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching news data. Please try again.');
  }
});

// async function getNewsData(city) {
//   const response = await axios.get(`https://newsapi.org/v2/everything?q=${city}&apiKey=${NEWS_API_KEY}`);
//   return response.data;
// }

function getNewsData(city) {
  return fetch(`https://your-netlify-app-name.netlify.app/.netlify/functions/get-news?city=${city}`)
    .then((response) => response.json());
}


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));






