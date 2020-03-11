const month = {
  getCurrent: function getCurrentMonth() {
    const urlCurrentLocation = 'https://ipinfo.io/json?token=c3e2765857dc1a';
    return fetch(urlCurrentLocation)
      .then((response) => response.json())
      .then((data) => {
        const monthOptions = {
          month: 'long',
          timeZone: `${data.timezone}`,
        };
        const dateCopy = new Date();
        dateCopy.getMonth();
        return (dateCopy.toLocaleString('en', monthOptions));
      });
  },
};

module.exports = month;
