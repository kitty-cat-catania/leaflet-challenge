var myMap = L.map("map", {
    center: [34.5199, -105.8701],
    zoom: 5
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";

d3.json(url).then(function(data) {

   

    
    L.geoJson(data, {
        style: function(feature) {
            return {
                color: "white",
                fillColor: "pink",
                fillOpacity: 0.3,
                weight: 1.2
            };
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Mag" + feature.properties.mag + "Place: " + feature.properties.place);
        },
        pointToLayer: function(geoJsonPoint, latlng) {
            return L.circleMarker(latlng);
        }
    }).addTo(myMap);

});