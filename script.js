import './style.css';

const elements = require('./modules/createElements.js');

elements.add();

const searchArea = document.querySelector('.search_area');
const currentCityWeather = document.querySelector('.current_city');
const currentTemperature = document.querySelector('.current_temperature');
const iconWeather = document.querySelector('.icon_weather');
const weatherDescription = document.querySelector('.weather_status');
const feelsLike = document.querySelector('.feels_like');
const currentWind = document.querySelector('.current_wind');
const currentHumidity = document.querySelector('.current_humidity');
const currentCoordinates = document.querySelector('.current_coordinates');
const currentTime = document.querySelector('.current_time');
const buttonSearchCity = document.querySelector('.search_city');
const warningMessage = document.querySelector('.warning_message');
const firstDay = document.querySelector('.first_day');
const firstDayTemperature = document.querySelector('.first_day_temperature');
const firstDayIcon = document.querySelector('.first_day_icon');
const secondDay = document.querySelector('.second_day');
const secondDayTemperature = document.querySelector('.second_day_temperature');
const secondDayIcon = document.querySelector('.second_day_icon');
const thirdDay = document.querySelector('.third_day');
const thirdDayTemperature = document.querySelector('.third_day_temperature');
const thirdDayIcon = document.querySelector('.third_day_icon');

const location = require('./modules/getCurrentLocation');

let currentCity;

const state = {
  tempUnit: 'celsius',
  language: 'en',
};

let stateLocalStorage = { ...state };

if (localStorage.getItem('myKey111')) {
  stateLocalStorage = JSON.parse(localStorage.getItem('myKey111'));
  state.language = stateLocalStorage.language;
  state.tempUnit = stateLocalStorage.tempUnit;
}

const languageWords = {
  by: ['пошук', 'адчуваецца', 'вецер', 'вільготнасць', 'м/с', 'Надвор\'е не вызначана. Праверце напісанне горада ці абраны мову!'],
  en: ['search', 'feels like', 'wind', 'humidity', 'm/s', 'The weather is not defined. Check the spelling of the city or the selected language!'],
  ru: ['поиск', 'ощущается', 'ветер', 'влажность', 'м/с', 'Погода не определена. Проверьте правильность написания города или выбранный язык!'],
};

buttonSearchCity.textContent = `${languageWords[state.language][0]}`;

const buttonCelsius = document.querySelector('.celsius');
const buttonFahrenheit = document.querySelector('.fahrenheit');
if (state.tempUnit === 'celsius') {
  buttonCelsius.style.backgroundColor = '#adb4b8';
  buttonCelsius.style.color = '#ffffff';
}
if (state.tempUnit === 'fahrenheit') {
  buttonFahrenheit.style.backgroundColor = '#adb4b8';
  buttonFahrenheit.style.color = '#ffffff';
}

async function getCurrentCity() {
  const currentLocation = await location.getCurrent();
  currentCity = String(currentLocation.split(', ').shift());
  searchArea.value = currentCity;
  currentCityWeather.textContent = currentLocation;
  return currentCity;
}

getCurrentCity();

const month = require('./modules/getCurrentMonth.js');

(async () => {
  try {
    const currentMonth = await month.getCurrent();
    const urlImage = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${currentMonth}&client_id=bcc7fd39e47c2ecb7bcd2d838595a60a46d21d757df7b6c7421ee2539f62cede`;
    const response = await fetch(urlImage);
    const data = await response.json();
    document.body.style.backgroundImage = `url('${data.urls.small}')`;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
  } catch (err) {
    document.body.style.background = 'linear-gradient(180deg, #00347e96 0%, #0c0c7a75 100%)';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
  }
})();

const changeUnit = require('./modules/changeUnitTemp.js');

function showWarningMessage(lang) {
  warningMessage.style.display = 'block';
  warningMessage.textContent = String(`${languageWords[lang][5]}`);
}

function stopWarningMessage() {
  warningMessage.style.display = 'none';
}

async function getStartWeather() {
  try {
    const city = await location.getCurrent();
    const lang = state.language;
    const urlCurrentWeather = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${lang}&units=metric&APPID=1680775399c397289135173804e05f81`;
    const response = await fetch(urlCurrentWeather);
    const data = await response.json();
    const currentWeatherTextContent = currentCityWeather.textContent.split(', ').shift();
    currentCityWeather.textContent = `${currentWeatherTextContent}, ${data.city.country}`;
    iconWeather.src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
    weatherDescription.textContent = (String(`${(data.list[0].weather[0].description)}`)).toUpperCase();
    currentWind.textContent = String(`${languageWords[lang][2].toUpperCase()}: ${(data.list[0].wind.speed)} ${languageWords[lang][4]}`);
    currentHumidity.textContent = String(`${languageWords[lang][3].toUpperCase()}: ${(data.list[0].main.humidity)}%`);
    firstDayIcon.src = `https://openweathermap.org/img/wn/${data.list[7].weather[0].icon}@2x.png`;
    secondDayIcon.src = `https://openweathermap.org/img/wn/${data.list[15].weather[0].icon}@2x.png`;
    thirdDayIcon.src = `https://openweathermap.org/img/wn/${data.list[23].weather[0].icon}@2x.png`;
    if (state.tempUnit === 'celsius') {
      currentTemperature.textContent = String(`${((data.list[0].main.temp_min + data.list[0].main.temp_max) * 0.5).toFixed(0)}°`);
      firstDayTemperature.textContent = String(`${((data.list[7].main.temp_min + data.list[7].main.temp_max) * 0.5).toFixed(0)}°`);
      secondDayTemperature.textContent = String(`${((data.list[15].main.temp_min + data.list[15].main.temp_max) * 0.5).toFixed(0)}°`);
      thirdDayTemperature.textContent = String(`${((data.list[23].main.temp_min + data.list[23].main.temp_max) * 0.5).toFixed(0)}°`);
      feelsLike.textContent = String(`${languageWords[lang][1].toUpperCase()}: ${(data.list[0].main.temp_kf).toFixed(0)}°`);
    }
    if (state.tempUnit === 'fahrenheit') {
      currentTemperature.textContent = String(`${(changeUnit.toFahrenheit((data.list[0].main.temp_min + data.list[0].main.temp_max) * 0.5)).toFixed(0)}°`);
      firstDayTemperature.textContent = String(`${(changeUnit.toFahrenheit((data.list[7].main.temp_min + data.list[7].main.temp_max) * 0.5)).toFixed(0)}°`);
      secondDayTemperature.textContent = String(`${(changeUnit.toFahrenheit((data.list[15].main.temp_min + data.list[15].main.temp_max) * 0.5)).toFixed(0)}°`);
      thirdDayTemperature.textContent = String(`${(changeUnit.toFahrenheit((data.list[23].main.temp_min + data.list[23].main.temp_max) * 0.5)).toFixed(0)}°`);
      feelsLike.textContent = String(`${languageWords[lang][1].toUpperCase()}: ${(changeUnit.toFahrenheit(data.list[0].main.temp_kf)).toFixed(0)}°`);
    }
  } catch (err) {
    showWarningMessage();
    setTimeout(stopWarningMessage, 5000);
  }
}

getStartWeather();

function getWeekDay(date, days, timezone, lang) {
  const dateCopy = new Date(date);
  const weekDayOptions = {
    weekday: 'long',
    timeZone: `${timezone}`,
  };
  dateCopy.setDate(date.getDate() + days);
  dateCopy.getDate();
  return (dateCopy.toLocaleString(lang, weekDayOptions));
}

async function currentLocationTime() {
  const urlCurrentLocation = 'https://ipinfo.io/json?token=c3e2765857dc1a';
  const response = await fetch(urlCurrentLocation);
  const data = await response.json();
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: `${data.timezone}`,
  };
  const newDate = new Date();
  currentTime.textContent = newDate.toLocaleString(state.language, dateOptions);
  firstDay.textContent = getWeekDay(newDate, 1, dateOptions.timeZone, state.language);
  secondDay.textContent = getWeekDay(newDate, 2, dateOptions.timeZone, state.language);
  thirdDay.textContent = getWeekDay(newDate, 3, dateOptions.timeZone, state.language);
}

async function loadBackgroundImage() {
  try {
    const currentMonth = await month.getCurrent();
    const urlImage = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${currentMonth}&client_id=bcc7fd39e47c2ecb7bcd2d838595a60a46d21d757df7b6c7421ee2539f62cede`;
    const response = await fetch(urlImage);
    const data = await response.json();
    document.body.style.backgroundImage = `url('${data.urls.small}')`;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
  } catch (err) {
    document.body.style.background = 'linear-gradient(180deg, #00347e96 0%, #0c0c7a75 100%)';
  }
}

async function getCurrentTime(city, lang) {
  const urlCurrentTime = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=efd858dc1f7e4d7eb98877c3cc540d73&pretty=1`;
  const response = await fetch(urlCurrentTime);
  const data = await response.json();
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: `${data.results[0].annotations.timezone.name}`,
  };
  const newDate = new Date();
  currentTime.textContent = newDate.toLocaleString(lang, dateOptions);
  firstDay.textContent = getWeekDay(newDate, 1, dateOptions.timeZone, lang);
  secondDay.textContent = getWeekDay(newDate, 2, dateOptions.timeZone, lang);
  thirdDay.textContent = getWeekDay(newDate, 3, dateOptions.timeZone, lang);
}

currentLocationTime();

setInterval(() => getCurrentTime(searchArea.value, state.language), 60000);

async function getCurrentWeather(city, lang) {
  try {
    const urlCurrentWeather = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${lang}&units=metric&APPID=1680775399c397289135173804e05f81`;
    const response = await fetch(urlCurrentWeather);
    const data = await response.json();
    const currentWeatherTextContent = currentCityWeather.textContent.split(', ').shift();
    currentCityWeather.textContent = `${currentWeatherTextContent}, ${data.city.country}`;
    iconWeather.src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
    weatherDescription.textContent = (String(`${(data.list[0].weather[0].description)}`)).toUpperCase();
    currentWind.textContent = String(`${languageWords[lang][2].toUpperCase()}: ${(data.list[0].wind.speed)} ${languageWords[lang][4]}`);
    currentHumidity.textContent = String(`${languageWords[lang][3].toUpperCase()}: ${(data.list[0].main.humidity)}%`);
    firstDayIcon.src = `https://openweathermap.org/img/wn/${data.list[7].weather[0].icon}@2x.png`;
    secondDayIcon.src = `https://openweathermap.org/img/wn/${data.list[15].weather[0].icon}@2x.png`;
    thirdDayIcon.src = `https://openweathermap.org/img/wn/${data.list[23].weather[0].icon}@2x.png`;
    if (state.tempUnit === 'celsius') {
      currentTemperature.textContent = String(`${((data.list[0].main.temp_min + data.list[0].main.temp_max) * 0.5).toFixed(0)}°`);
      firstDayTemperature.textContent = String(`${((data.list[7].main.temp_min + data.list[7].main.temp_max) * 0.5).toFixed(0)}°`);
      secondDayTemperature.textContent = String(`${((data.list[15].main.temp_min + data.list[15].main.temp_max) * 0.5).toFixed(0)}°`);
      thirdDayTemperature.textContent = String(`${((data.list[23].main.temp_min + data.list[23].main.temp_max) * 0.5).toFixed(0)}°`);
      feelsLike.textContent = String(`${languageWords[lang][1].toUpperCase()}: ${(data.list[0].main.temp_kf).toFixed(0)}°`);
    }
    if (state.tempUnit === 'fahrenheit') {
      currentTemperature.textContent = String(`${(changeUnit.toFahrenheit((data.list[0].main.temp_min + data.list[0].main.temp_max) * 0.5)).toFixed(0)}°`);
      firstDayTemperature.textContent = String(`${(changeUnit.toFahrenheit((data.list[7].main.temp_min + data.list[7].main.temp_max) * 0.5)).toFixed(0)}°`);
      secondDayTemperature.textContent = String(`${(changeUnit.toFahrenheit((data.list[15].main.temp_min + data.list[15].main.temp_max) * 0.5)).toFixed(0)}°`);
      thirdDayTemperature.textContent = String(`${(changeUnit.toFahrenheit((data.list[23].main.temp_min + data.list[23].main.temp_max) * 0.5)).toFixed(0)}°`);
      feelsLike.textContent = String(`${languageWords[lang][1].toUpperCase()}: ${(changeUnit.toFahrenheit(data.list[0].main.temp_kf)).toFixed(0)}°`);
    }
  } catch (err) {
    showWarningMessage(lang);
    setTimeout(stopWarningMessage, 5000);
  }
}

const map = require('./modules/loadMap.js');

async function getCurrentMap(city) {
  const urlGeoCoding = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=efd858dc1f7e4d7eb98877c3cc540d73&pretty=1`;
  const response = await fetch(urlGeoCoding);
  const data = await response.json();
  const latitude = data.results[0].geometry.lat;
  const longitude = data.results[0].geometry.lng;
  const strLatitude = String(latitude.toFixed(2)).replace(/\./gi, '°');
  const strLongitude = String(longitude.toFixed(2)).replace(/\./gi, '°');
  currentCoordinates.textContent = `Latitude: ${strLatitude}', Longitude: ${strLongitude}'`;
  map.load(longitude, latitude);
}

const animation = require('./modules/buttonAnimation.js');

const buttonChangeTemperatureUnit = document.querySelector('.change_temperature_unit');

buttonChangeTemperatureUnit.addEventListener('mouseover', (event) => {
  setTimeout(animation.mouseOver, 0, event, state.tempUnit);
});

buttonChangeTemperatureUnit.addEventListener('mouseout', (event) => {
  setTimeout(animation.mouseOut, 0, event, state.tempUnit);
});

const buttonChangeBackground = document.querySelector('.change_background');
buttonChangeBackground.addEventListener('click', (event) => {
  loadBackgroundImage();
  setTimeout(animation.mouseDown, 150, event, 50, 50, 50, 50);
  setTimeout(animation.mouseUp, 350, event, 5, 5, 5, 5);
});

buttonSearchCity.addEventListener('click', async (event) => {
  setTimeout(animation.mouseDown, 150, event, 0, 50, 0, 50);
  setTimeout(animation.mouseUp, 350, event, 0, 5, 0, 5);
  currentCityWeather.textContent = searchArea.value;
  await getCurrentWeather(searchArea.value, state.language);
  await getCurrentMap(searchArea.value);
  await getCurrentTime(searchArea.value, state.language);
  await loadBackgroundImage();
});

(() => {
  function success(pos) {
    const crd = pos.coords;
    const { latitude } = crd;
    const { longitude } = crd;
    const strLatitude = String(latitude.toFixed(2)).replace(/\./gi, '°');
    const strLongitude = String(longitude.toFixed(2)).replace(/\./gi, '°');
    currentCoordinates.textContent = `Latitude: ${strLatitude}', Longitude: ${strLongitude}'`;
    map.load(longitude, latitude);
  }
  navigator.geolocation.getCurrentPosition(success);
})();

buttonCelsius.addEventListener('click', (event) => {
  if (state.tempUnit === 'fahrenheit') {
    setTimeout(animation.mouseDown, 250, event, 0, 50, 0, 50);
    setTimeout(animation.mouseUp, 450, event, 0, 5, 0, 5);
    state.tempUnit = 'celsius';
    localStorage.setItem('myKey111', JSON.stringify(state));
    buttonCelsius.style.backgroundColor = '#aeb5b9';
    buttonCelsius.style.color = '#ffffff';
    buttonFahrenheit.style.backgroundColor = '#4c5255';
    buttonFahrenheit.style.color = '#ffffff66';
    currentTemperature.textContent = changeUnit.getCelsius(currentTemperature.textContent);
    feelsLike.textContent = `${(languageWords[state.language][1]).toUpperCase()}: ${changeUnit.getCelsius(feelsLike.textContent.split(': ').pop())}`;
    firstDayTemperature.textContent = changeUnit.getCelsius(firstDayTemperature.textContent);
    secondDayTemperature.textContent = changeUnit.getCelsius(secondDayTemperature.textContent);
    thirdDayTemperature.textContent = changeUnit.getCelsius(thirdDayTemperature.textContent);
  }
});

buttonFahrenheit.addEventListener('click', (event) => {
  if (state.tempUnit === 'celsius') {
    setTimeout(animation.mouseDown, 150, event, 50, 0, 50, 0);
    setTimeout(animation.mouseUp, 350, event, 5, 0, 5, 0);
    state.tempUnit = 'fahrenheit';
    localStorage.setItem('myKey111', JSON.stringify(state));
    buttonFahrenheit.style.backgroundColor = '#aeb5b9';
    buttonFahrenheit.style.color = '#ffffff';
    buttonCelsius.style.backgroundColor = '#4c5255';
    buttonCelsius.style.color = '#ffffff66';
    currentTemperature.textContent = changeUnit.getFahrenheit(currentTemperature.textContent);
    feelsLike.textContent = `${(languageWords[state.language][1]).toUpperCase()}: ${changeUnit.getFahrenheit(feelsLike.textContent.split(': ').pop())}`;
    firstDayTemperature.textContent = changeUnit.getFahrenheit(firstDayTemperature.textContent);
    secondDayTemperature.textContent = changeUnit.getFahrenheit(secondDayTemperature.textContent);
    thirdDayTemperature.textContent = changeUnit.getFahrenheit(thirdDayTemperature.textContent);
  }
});

const buttonVoiceSearch = document.querySelector('.voice_search');
buttonVoiceSearch.addEventListener('click', () => {
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  // eslint-disable-next-line no-undef
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = state.language;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.start();
  recognition.onresult = (event) => {
    searchArea.value = event.results[0][0].transcript;
    recognition.stop();
  };
});

const currentLangContent = document.querySelector('.current_language_content');

const buttonFirstLang = document.querySelector('.first_language');
const firstLangContent = document.querySelector('.first_language_content');

const buttonSecondLang = document.querySelector('.second_language');
const secondLangContent = document.querySelector('.second_language_content');

if (stateLocalStorage.language === firstLangContent.textContent) {
  firstLangContent.textContent = currentLangContent.textContent;
  currentLangContent.textContent = stateLocalStorage.language;
} else if (stateLocalStorage.language === secondLangContent.textContent) {
  secondLangContent.textContent = currentLangContent.textContent;
  currentLangContent.textContent = stateLocalStorage.language;
}

function langTranslation(lang) {
  const windValue = currentWind.textContent.slice(0, currentWind.textContent.length - 3).split(': ').pop();
  buttonSearchCity.textContent = `${languageWords[lang][0]}`;
  feelsLike.textContent = `${(languageWords[lang][1]).toUpperCase()}: ${feelsLike.textContent.split(': ').pop()}`;
  currentWind.textContent = `${(languageWords[lang][2]).toUpperCase()}: ${windValue} ${languageWords[lang][4]}`;
  currentHumidity.textContent = `${(languageWords[lang][3]).toUpperCase()}: ${currentHumidity.textContent.split(': ').pop()}`;
}

const blockChangeLanguage = document.querySelector('.change_language_block');

buttonFirstLang.addEventListener('click', (event) => {
  setTimeout(animation.mouseDown, 150, event, 50, 50, 50, 50);
  setTimeout(animation.mouseUp, 350, event, 5, 5, 5, 5);
  state.language = firstLangContent.textContent;
  localStorage.setItem('myKey111', JSON.stringify(state));
  firstLangContent.textContent = currentLangContent.textContent;
  currentLangContent.textContent = state.language;
  langTranslation(state.language);
  getCurrentWeather(searchArea.value, state.language);
  getCurrentTime(searchArea.value, state.language);
});

buttonSecondLang.addEventListener('click', (event) => {
  setTimeout(animation.mouseDown, 150, event, 50, 50, 50, 50);
  setTimeout(animation.mouseUp, 350, event, 5, 5, 5, 5);
  state.language = secondLangContent.textContent;
  localStorage.setItem('myKey111', JSON.stringify(state));
  secondLangContent.textContent = currentLangContent.textContent;
  currentLangContent.textContent = state.language;
  langTranslation(state.language);
});

const keyAnimation = require('./modules/keyAnimation.js');

let keyStatus = 'false';

document.body.addEventListener('keydown', (event) => {
  const key = event.which;
  if (key === 18) {
    keyStatus = 'true';
  }
});

document.body.addEventListener('keyup', (event) => {
  const key = event.which;
  if (key === 18) {
    keyStatus = 'false';
  }
});

document.body.addEventListener('keydown', async (event) => {
  const key = event.which;
  if (key === 81 && keyStatus === 'true') {
    loadBackgroundImage();
    setTimeout(keyAnimation.keyDown, 150, buttonChangeBackground, 50, 50, 50, 50);
    setTimeout(keyAnimation.keyUp, 350, buttonChangeBackground, 5, 5, 5, 5);
  }
  if (key === 83 && keyStatus === 'true') {
    setTimeout(keyAnimation.keyDown, 150, buttonSearchCity, 0, 50, 0, 50);
    setTimeout(keyAnimation.keyUp, 350, buttonSearchCity, 0, 5, 0, 5);
    currentCityWeather.textContent = searchArea.value;
    await getCurrentWeather(searchArea.value, state.language);
    await getCurrentMap(searchArea.value);
    await getCurrentTime(searchArea.value, state.language);
    await loadBackgroundImage();
  }
  if (key === 86 && keyStatus === 'true') {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    // eslint-disable-next-line no-undef
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = state.language;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.start();
    recognition.onresult = (e) => {
      searchArea.value = e.results[0][0].transcript;
      recognition.stop();
    };
  }
  if (key === 67 && keyStatus === 'true') {
    if (state.tempUnit === 'fahrenheit') {
      setTimeout(keyAnimation.keyDown, 250, buttonCelsius, 0, 50, 0, 50);
      setTimeout(keyAnimation.keyUp, 450, buttonCelsius, 0, 5, 0, 5);
      state.tempUnit = 'celsius';
      localStorage.setItem('myKey111', JSON.stringify(state));
      buttonCelsius.style.backgroundColor = '#aeb5b9';
      buttonCelsius.style.color = '#ffffff';
      buttonFahrenheit.style.backgroundColor = '#4c5255';
      buttonFahrenheit.style.color = '#ffffff66';
      currentTemperature.textContent = changeUnit.getCelsius(currentTemperature.textContent);
      feelsLike.textContent = `${(languageWords[state.language][1]).toUpperCase()}: ${changeUnit.getCelsius(feelsLike.textContent.split(': ').pop())}`;
      firstDayTemperature.textContent = changeUnit.getCelsius(firstDayTemperature.textContent);
      secondDayTemperature.textContent = changeUnit.getCelsius(secondDayTemperature.textContent);
      thirdDayTemperature.textContent = changeUnit.getCelsius(thirdDayTemperature.textContent);
    }
  }
  if (key === 88 && keyStatus === 'true') {
    if (state.tempUnit === 'celsius') {
      setTimeout(keyAnimation.keyDown, 150, buttonFahrenheit, 50, 0, 50, 0);
      setTimeout(keyAnimation.keyUp, 350, buttonFahrenheit, 5, 0, 5, 0);
      state.tempUnit = 'fahrenheit';
      localStorage.setItem('myKey111', JSON.stringify(state));
      buttonFahrenheit.style.backgroundColor = '#aeb5b9';
      buttonFahrenheit.style.color = '#ffffff';
      buttonCelsius.style.backgroundColor = '#4c5255';
      buttonCelsius.style.color = '#ffffff66';
      currentTemperature.textContent = changeUnit.getFahrenheit(currentTemperature.textContent);
      feelsLike.textContent = `${(languageWords[state.language][1]).toUpperCase()}: ${changeUnit.getFahrenheit(feelsLike.textContent.split(': ').pop())}`;
      firstDayTemperature.textContent = changeUnit.getFahrenheit(firstDayTemperature.textContent);
      secondDayTemperature.textContent = changeUnit.getFahrenheit(secondDayTemperature.textContent);
      thirdDayTemperature.textContent = changeUnit.getFahrenheit(thirdDayTemperature.textContent);
    }
  }
  if (key === 89 && keyStatus === 'true') {
    setTimeout(keyAnimation.keyDown, 150, blockChangeLanguage, 50, 50, 50, 50);
    setTimeout(keyAnimation.keyUp, 350, blockChangeLanguage, 5, 5, 5, 5);
    state.language = firstLangContent.textContent;
    localStorage.setItem('myKey', JSON.stringify(state));
    firstLangContent.textContent = currentLangContent.textContent;
    currentLangContent.textContent = state.language;
    langTranslation(state.language);
    getCurrentWeather(searchArea.value, state.language);
    getCurrentTime(searchArea.value, state.language);
  }
  if (key === 84 && keyStatus === 'true') {
    setTimeout(keyAnimation.keyDown, 150, blockChangeLanguage, 50, 50, 50, 50);
    setTimeout(keyAnimation.keyUp, 350, blockChangeLanguage, 5, 5, 5, 5);
    state.language = secondLangContent.textContent;
    localStorage.setItem('myKey111', JSON.stringify(state));
    secondLangContent.textContent = currentLangContent.textContent;
    currentLangContent.textContent = state.language;
    langTranslation(state.language);
  }
});
