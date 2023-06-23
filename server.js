const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const { TwitterClient } = require('twitter-api-client');

const twitterClient = new TwitterClient({
  apiKey: 'x8zmkl7uLnhsGYSen09wieHq5',
  apiSecret: '8A9fjVI0lTg222grWv7P1xZLfEarHMC9rYLlvznba8VjawDxOp',
  accessToken: '1375948652-zQMJUW91KxZvF1AbWbg1fkh1XmHxSPi3vbwDSYq',
  accessTokenSecret: 'GMjfeEp3btGsWpD1HN9DDG2N95w5qAUlenLNTpIpVlzswj9AFT'
});

app.get('/tweets', async (req, res) => {
  try {
    const city = req.query.city;
    const data = await twitterClient.tweets.search({ q: `#${city}`, count: 5 });

    res.json(data.statuses);
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while fetching tweets.');
  }
});
