var myMap = L.map("map", {
    center: [34.5199, -105.8701],
    zoom: 3
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

function makeRadius(magnitude) {
    if (magnitude < 4.9) {
        var rad = 2;
        return rad;
    }
    else if (magnitude > 5.0 && magnitude <= 5.4) {
        var rad = 3;
        return rad;
    }
    else if (magnitude > 5.4 && magnitude <=5.9) {
        var rad = 4;
        return rad;
    }
    else if (magnitude > 5.9 && magnitude <= 6.4) {
        var rad = 5;
        return rad;
    }
    else if (magnitude > 6.4 && magnitude <=6.9) {
        var rad = 6;
        return rad;
    }
    else {
        var rad = 7; 
        return rad;
    }   


};
function chooseColor(depth) {
    if (depth < 10) {
        var color = "#fef0d9";
        return color;
    }
    else if (depth >= 10 && depth < 50) {
        var color = "#fdd49e";
        return color;
    }
    else if (depth >= 50 && depth <100) {
        var color = "#fdbb84";
        return color;
    }
    else if (depth >=100 && depth < 300) {
        var color = "#fc8d59";
        return color;
    }
    else if (depth >=300 && depth < 500) {
        var color = "#e34a33";
        return color;
    }
    else {
        var color = "#b30000";
        return color;
    }
}
d3.json(url).then(function(data) {

   

    
    geojson = L.geoJson(data, {
        style: function(feature) {
            return {
                color: "white",
                fillColor: chooseColor(feature.geometry.coordinates[2]),
                fillOpacity: 0.9,
                weight: 1.2,
                radius: makeRadius(feature.properties.mag)
            };
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Mag" + feature.properties.mag + "Place: " + feature.properties.place);
        },
        pointToLayer: function(geoJsonPoint, latlng) {
            return L.circleMarker(latlng);
               
        }
    }).addTo(myMap);

    //legend setup
    var legend = L.control({position: "bottomright" });
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info-legend");
            var limits = [0, 10, 50, 100, 300, 500, 700];
            var colors = ["#fef0d9", "#fdd49e", "#fdbb84", "#fc8d59", "#e34a33", "#b30000"]
            var labels = [];

            var legendInfo = "<h1>Earthquake Depth</h1>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + limits[0] + "</div>" +
            "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +

            "</div>";
      
        div.innerHTML = legendInfo;
        limits.forEach(function(limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
          });
      
        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
          
        };
    legend.addTo(myMap);
    });    
    


