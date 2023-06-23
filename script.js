const API_KEY = '88fdbc4e346a5342836c5e0386c89467';

window.addEventListener('load', () => {
  const searchButton = document.querySelector('.search-button');
  const searchBar = document.querySelector('.search-bar');

  searchButton.addEventListener('click', async () => {
    const city = searchBar.value.trim();
    if (city !== '') {
      await getWeatherData(city);
      await fetchRecentTweets(city);
      searchBar.value = '';
    }
  });

  searchBar.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      const city = searchBar.value.trim();
      if (city !== '') {
        getWeatherData(city);
        fetchRecentTweets(city);
        searchBar.value = '';
      }
    }
  });
});

function getWeatherData(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => showWeatherData(data))
    .catch((error) => {
      console.log(error);
      alert('Error fetching weather data. Please try again.');
    });
}

function showWeatherData(data) {
  const cityElement = document.querySelector('.city');
  const iconElement = document.querySelector('.icon');
  const descriptionElement = document.querySelector('.description');
  const temperatureElement = document.querySelector('.temperature');
  const humidityElement = document.querySelector('.humidity');
  const windSpeedElement = document.querySelector('.wind-speed');

  const city = data.name;
  const icon = data.weather[0].icon;
  const description = data.weather[0].description;
  const temperature = data.main.temp;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  cityElement.textContent = city;
  iconElement.src = `http://openweathermap.org/img/wn/${icon}.png`;
  descriptionElement.textContent = description;
  temperatureElement.textContent = `Temperature: ${temperature}°C`;
  humidityElement.textContent = `Humidity: ${humidity}%`;
  windSpeedElement.textContent = `Wind Speed: ${windSpeed} m/s`;
}

async function fetchRecentTweets(city) {
  const hashtag = city.toLowerCase().replace(/\s/g, '');
  const apiUrl = `http://localhost:3000/tweets?hashtag=${encodeURIComponent(hashtag)}`;

  const response = await fetch(apiUrl);
  const data = await response.json();
  displayTweets(data);
}

function displayTweets(tweets) {
  const tweetsContainer = document.querySelector('.tweets-container');

  tweetsContainer.innerHTML = '';

  tweets.forEach((tweet) => {
    const tweetElement = document.createElement('div');
    tweetElement.classList.add('tweet');

    const usernameElement = document.createElement('span');
    usernameElement.classList.add('username');
    usernameElement.textContent = `@${tweet.user.screen_name}`;

    const textElement = document.createElement('p');
    textElement.classList.add('text');
    textElement.textContent = tweet.text;

    const likesElement = document.createElement('p');
    likesElement.classList.add('likes');
    likesElement.textContent = `Likes: ${tweet.favorite_count}`;

    const timestampElement = document.createElement('span');
    timestampElement.classList.add('timestamp');
    timestampElement.textContent = new Date(tweet.created_at).toLocaleString();

    tweetElement.appendChild(usernameElement);
    tweetElement.appendChild(textElement);
    tweetElement.appendChild(likesElement);
    tweetElement.appendChild(timestampElement);

    tweetsContainer.appendChild(tweetElement);
  });
}







