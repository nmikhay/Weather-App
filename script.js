const API_KEY = '88fdbc4e346a5342836c5e0386c89467';

window.addEventListener('load', () => {
  const searchButton = document.querySelector('.search-button');
  const searchBar = document.querySelector('.search-bar');

  searchButton.addEventListener('click', () => {
    const city = searchBar.value.trim();
    if (city !== '') {
      getWeatherAndNewsData(city);
      searchBar.value = '';
    }
  });

  searchBar.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      const city = searchBar.value.trim();
      if (city !== '') {
        getWeatherAndNewsData(city);
        searchBar.value = '';
      }
    }
  });
});

async function getWeatherAndNewsData(city) {
  try {
    const weatherData = await getWeatherData(city);
    showWeatherData(weatherData);

    const newsData = await getNewsData(city);
    showNewsData(newsData);

    setBackgroundImage(city);
  } catch (error) {
    console.log(error);
    alert('Error fetching weather and news data. Please try again.');
  }
}

function setBackgroundImage(city) {
  const body = document.body;
  const imageUrl = `https://source.unsplash.com/1600x900/?${city}`;

  body.style.backgroundImage = `url(${imageUrl})`;
}

function getWeatherData(city) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
    .then((response) => response.json());
}

function getNewsData(city) {
  return fetch(`http://localhost:3000/news?city=${city}`)
    .then((response) => response.json());
}

function showWeatherData(data) {
  const cityElement = document.querySelector('.city');
  const countryElement = document.querySelector('.country');
  const timeElement = document.querySelector('.time');
  const iconElement = document.querySelector('.weather-icon .icon');
  const descriptionElement = document.querySelector('.description');
  const temperatureElement = document.querySelector('.temperature');
  const humidityElement = document.querySelector('.humidity');
  const windSpeedElement = document.querySelector('.wind-speed');

  const city = data.name;
  const country = data.sys.country;
  const timezoneOffset = data.timezone;
  const localTime = new Date(Date.now() + timezoneOffset * 1000).toLocaleTimeString();
  const icon = data.weather[0].icon;
  const description = data.weather[0].description;
  const temperature = data.main.temp;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  cityElement.textContent = city;
  countryElement.textContent = `Country: ${country}`;
  timeElement.textContent = `Local Time: ${localTime}`;
  iconElement.src = `http://openweathermap.org/img/wn/${icon}.png`;
  descriptionElement.textContent = description;
  temperatureElement.textContent = `Temperature: ${temperature}°C`;
  humidityElement.textContent = `Humidity: ${humidity}%`;
  windSpeedElement.textContent = `Wind Speed: ${windSpeed} m/s`;
}

function showNewsData(data) {
  const newsListElement = document.querySelector('.news-list');
  newsListElement.innerHTML = '';

  const articles = data.articles.slice(0, 6);
  articles.forEach((article, index) => {
    const articleElement = document.createElement('div');
    articleElement.className = 'article';

    const titleElement = document.createElement('h3');
    const titleLink = document.createElement('a');
    titleLink.href = article.url;
    titleLink.textContent = `${index + 1}. ${article.title}`;
    titleElement.appendChild(titleLink);
    articleElement.appendChild(titleElement);

    const sourceElement = document.createElement('p');
    sourceElement.textContent = article.source.name;
    articleElement.appendChild(sourceElement);

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = article.description;
    articleElement.appendChild(descriptionElement);

    newsListElement.appendChild(articleElement);
  });
}























