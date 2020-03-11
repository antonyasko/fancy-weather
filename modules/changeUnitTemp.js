const changeUnit = {
  getCelsius: function getCelsius(str) {
    const tempFahrenheit = Number(str.slice(0, str.length - 1));
    const tempCelsius = ((tempFahrenheit - 32) * (5 / 9)).toFixed(0);
    return String(`${tempCelsius}°`);
  },

  toFahrenheit: function toFahrenheit(value) {
    return Number(((value * (9 / 5)) + 32).toFixed(2));
  },

  getFahrenheit: function getFahrenheit(str) {
    const tempCelsius = Number(str.slice(0, str.length - 1));
    const tempFahrenheit = ((tempCelsius * (9 / 5)) + 32).toFixed(0);
    return String(`${tempFahrenheit}°`);
  },
};

module.exports = changeUnit;
