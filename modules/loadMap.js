const map = {
  load: function loadMap(long, lat) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW50b255YXNrbyIsImEiOiJjazNoNzM3bnowNzV2M2NtcjZ6dDNseDRkIn0.0RKNUNtxZA920Nw342Rezw';
    const map = new mapboxgl.Map({
      container: 'id_current_location',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [long, lat],
      zoom: 9,
    });
  },
};

module.exports = map;
