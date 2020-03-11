const elements = {
  add: function addElements() {
    const wrapperBackground = document.createElement('div');
    wrapperBackground.className = 'wrapper';
    document.body.append(wrapperBackground);

    const warningMessage = document.createElement('div');
    warningMessage.className = 'warning_message';
    wrapperBackground.appendChild(warningMessage);

    const header = document.createElement('header');
    header.className = 'header';
    wrapperBackground.appendChild(header);

    const divNavBar = document.createElement('div');
    divNavBar.className = 'nav_bar';
    header.appendChild(divNavBar);

    const buttonChangeBackground = document.createElement('button');
    buttonChangeBackground.className = 'change_background';
    divNavBar.appendChild(buttonChangeBackground);

    const blockChangeLanguage = document.createElement('details');
    blockChangeLanguage.className = 'change_language_block';
    divNavBar.appendChild(blockChangeLanguage);

    const buttonCurrentLang = document.createElement('summary');
    buttonCurrentLang.className = 'current_language';
    blockChangeLanguage.appendChild(buttonCurrentLang);

    const currentLangContent = document.createElement('p');
    currentLangContent.className = 'current_language_content';
    currentLangContent.textContent = 'en';
    buttonCurrentLang.appendChild(currentLangContent);

    const buttonChangeLanguage = document.createElement('div');
    buttonChangeLanguage.className = 'change_language';
    blockChangeLanguage.appendChild(buttonChangeLanguage);

    const listChangeLanguage = document.createElement('ul');
    listChangeLanguage.className = 'list_language';
    buttonChangeLanguage.appendChild(listChangeLanguage);

    const buttonFirstLang = document.createElement('li');
    buttonFirstLang.className = 'first_language';
    listChangeLanguage.appendChild(buttonFirstLang);

    const firstLangContent = document.createElement('p');
    firstLangContent.className = 'first_language_content';
    firstLangContent.textContent = 'ru';
    buttonFirstLang.appendChild(firstLangContent);

    const buttonSecondLang = document.createElement('li');
    buttonSecondLang.className = 'second_language';
    listChangeLanguage.appendChild(buttonSecondLang);

    const secondLangContent = document.createElement('p');
    secondLangContent.className = 'second_language_content';
    secondLangContent.textContent = 'by';
    buttonSecondLang.appendChild(secondLangContent);

    const buttonChangeTemperatureUnit = document.createElement('div');
    buttonChangeTemperatureUnit.className = 'change_temperature_unit';
    divNavBar.appendChild(buttonChangeTemperatureUnit);

    const buttonFahrenheit = document.createElement('button');
    buttonFahrenheit.className = 'fahrenheit';
    buttonFahrenheit.textContent = '°F';
    buttonChangeTemperatureUnit.appendChild(buttonFahrenheit);

    const buttonCelsius = document.createElement('button');
    buttonCelsius.className = 'celsius';
    buttonCelsius.textContent = '°С';
    buttonChangeTemperatureUnit.appendChild(buttonCelsius);

    const searchBlock = document.createElement('div');
    searchBlock.className = 'search_block';
    header.appendChild(searchBlock);

    const searchArea = document.createElement('input');
    searchArea.className = 'search_area';
    searchArea.type = 'text';
    searchBlock.appendChild(searchArea);

    const buttonVoiceSearch = document.createElement('button');
    buttonVoiceSearch.className = 'voice_search';
    searchBlock.appendChild(buttonVoiceSearch);

    const buttonSearchCity = document.createElement('button');
    buttonSearchCity.className = 'search_city';
    buttonSearchCity.textContent = 'Search';
    searchBlock.appendChild(buttonSearchCity);

    const main = document.createElement('main');
    main.className = 'main';
    wrapperBackground.appendChild(main);

    const cityInfo = document.createElement('div');
    cityInfo.className = 'city_info';
    main.appendChild(cityInfo);

    const currentCity = document.createElement('div');
    currentCity.className = 'current_city';
    cityInfo.appendChild(currentCity);

    const currentTime = document.createElement('div');
    currentTime.className = 'current_time';
    cityInfo.appendChild(currentTime);

    const currentWeather = document.createElement('div');
    currentWeather.className = 'current_weather';
    cityInfo.appendChild(currentWeather);

    const currentTemperature = document.createElement('div');
    currentTemperature.className = 'current_temperature';
    currentWeather.appendChild(currentTemperature);

    const otherParameters = document.createElement('div');
    otherParameters.className = 'other_parameters';
    currentWeather.appendChild(otherParameters);

    const iconWeatherBlock = document.createElement('div');
    iconWeatherBlock.className = 'icon_weather_block';
    otherParameters.appendChild(iconWeatherBlock);

    const iconWeather = document.createElement('img');
    iconWeather.className = 'icon_weather';
    iconWeather.alt = 'icon_weather';
    iconWeatherBlock.appendChild(iconWeather);

    const parameters = document.createElement('div');
    parameters.className = 'parameters';
    otherParameters.appendChild(parameters);

    const weatherList = document.createElement('ul');
    parameters.appendChild(weatherList);

    const weatherStatus = document.createElement('li');
    weatherStatus.className = 'weather_status';
    weatherList.appendChild(weatherStatus);

    const feelsLike = document.createElement('li');
    feelsLike.className = 'feels_like';
    weatherList.appendChild(feelsLike);

    const currentWind = document.createElement('li');
    currentWind.className = 'current_wind';
    weatherList.appendChild(currentWind);

    const currentHumidity = document.createElement('li');
    currentHumidity.className = 'current_humidity';
    weatherList.appendChild(currentHumidity);

    const futureWeather = document.createElement('div');
    futureWeather.className = 'future_weather';
    cityInfo.appendChild(futureWeather);

    const firstDayBlock = document.createElement('div');
    firstDayBlock.className = 'first_day_block';
    futureWeather.appendChild(firstDayBlock);

    const firstDay = document.createElement('div');
    firstDay.className = 'first_day';
    firstDayBlock.appendChild(firstDay);

    const firstDayWeather = document.createElement('div');
    firstDayWeather.className = 'first_day_weather';
    firstDayBlock.appendChild(firstDayWeather);

    const firstDayTemperature = document.createElement('div');
    firstDayTemperature.className = 'first_day_temperature';
    firstDayWeather.appendChild(firstDayTemperature);

    const firstDayIconBlock = document.createElement('div');
    firstDayIconBlock.className = 'first_day_icon_block';
    firstDayWeather.appendChild(firstDayIconBlock);

    const firstDayIcon = document.createElement('img');
    firstDayIcon.className = 'first_day_icon';
    firstDayIcon.alt = 'first_day_icon';
    firstDayIconBlock.appendChild(firstDayIcon);

    const secondDayBlock = document.createElement('div');
    secondDayBlock.className = 'second_day_block';
    futureWeather.appendChild(secondDayBlock);

    const secondDay = document.createElement('div');
    secondDay.className = 'second_day';
    secondDayBlock.appendChild(secondDay);

    const secondDayWeather = document.createElement('div');
    secondDayWeather.className = 'second_day_weather';
    secondDayBlock.appendChild(secondDayWeather);

    const secondDayTemperature = document.createElement('div');
    secondDayTemperature.className = 'second_day_temperature';
    secondDayWeather.appendChild(secondDayTemperature);

    const secondDayIconBlock = document.createElement('div');
    secondDayIconBlock.className = 'second_day_icon_block';
    secondDayWeather.appendChild(secondDayIconBlock);

    const secondDayIcon = document.createElement('img');
    secondDayIcon.className = 'second_day_icon';
    secondDayIcon.alt = 'second_day_icon';
    secondDayIconBlock.appendChild(secondDayIcon);

    const thirdDayBlock = document.createElement('div');
    thirdDayBlock.className = 'third_day_block';
    futureWeather.appendChild(thirdDayBlock);

    const thirdDay = document.createElement('div');
    thirdDay.className = 'third_day';
    thirdDayBlock.appendChild(thirdDay);

    const thirdDayWeather = document.createElement('div');
    thirdDayWeather.className = 'third_day_weather';
    thirdDayBlock.appendChild(thirdDayWeather);

    const thirdDayTemperature = document.createElement('div');
    thirdDayTemperature.className = 'third_day_temperature';
    thirdDayWeather.appendChild(thirdDayTemperature);

    const thirdDayIconBlock = document.createElement('div');
    thirdDayIconBlock.className = 'third_day_icon_block';
    thirdDayWeather.appendChild(thirdDayIconBlock);

    const thirdDayIcon = document.createElement('img');
    thirdDayIcon.className = 'third_day_icon';
    thirdDayIcon.alt = 'third_day_icon';
    thirdDayIconBlock.appendChild(thirdDayIcon);

    const locationArea = document.createElement('div');
    locationArea.className = 'location_area';
    main.appendChild(locationArea);

    const currentLocation = document.createElement('div');
    currentLocation.className = 'current_location';
    currentLocation.id = 'id_current_location';
    locationArea.appendChild(currentLocation);

    const currentCoordinates = document.createElement('div');
    currentCoordinates.className = 'current_coordinates';
    locationArea.appendChild(currentCoordinates);
  },
};

module.exports = elements;
