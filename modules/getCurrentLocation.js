const location = {
  getCurrent: function getCurrentLocation() {
    const urlCurrentLocation = 'https://ipinfo.io/json?token=c3e2765857dc1a';
    return fetch(urlCurrentLocation)
      .then((response) => response.json())
      .then((data) => `${data.city}, ${data.country}`);
  },
};

module.exports = location;
