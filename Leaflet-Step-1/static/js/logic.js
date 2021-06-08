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
        var color = "#edf8fb";
        return color;
    }
    else if (depth >= 10 && depth < 50) {
        var color = "#bfd3e6";
        return color;
    }
    else if (depth >= 50 && depth <100) {
        var color = "#9ebcda";
        return color;
    }
    else if (depth >=100 && depth < 300) {
        var color = "#8c96c6";
        return color;
    }
    else if (depth >=300 && depth < 500) {
        var color = "#8856a7";
        return color;
    }
    else {
        var color = "#810f7c";
        return color;
    }
}
d3.json(url).then(function(data) {

   

    
    geojson = L.geoJson(data, {
        style: function(feature) {
            return {
                color: "black",
                fillColor: chooseColor(feature.geometry.coordinates[2]),
                fillOpacity: 0.9,
                weight: 1.2,
                radius: makeRadius(feature.properties.mag)
            };
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<strong>Magnitude: </strong>" + feature.properties.mag + "<br><strong>Place:</strong> " + feature.properties.place);
        },
        pointToLayer: function(geoJsonPoint, latlng) {
            return L.circleMarker(latlng);
               
        }
    }).addTo(myMap);

    //legend setup
    var legend = L.control({position: "bottomright" });
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info-legend");
            var limits = [ 10, 50, 100, 300, 500, 700];
            var colors = ["#edf8fb", "#bfd3e6","#9ebcda","#8c96c6","#8856a7","#810f7c"]
            var labels = [];

            var legendInfo = "<h1>Earthquake Depth</h1>";
            
      
        div.innerHTML = legendInfo;
        limits.forEach(function(limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\">" + limits[index] + "</li>");
          });
      
        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
          
        };
    legend.addTo(myMap);
    });    
    


