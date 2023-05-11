// declare the map
let mapCenter = [34.0709, -118.444];
let zoomLevel = 5;

let viewObject =
{
    'center' : mapCenter,
    'zoom' : zoomLevel
};

const map = L.map('the_map').setView(viewObject.center, viewObject.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

addMarker(37,-122,'home','home land!');
addMarker(32,-118,'work','where i work land!');
addMarker(39,-119,'location 1','random location');
addMarker(36,-120,'location 2','another random location');

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); 
    newButton.id = "button"+title; 
    newButton.innerHTML = title; 
    newButton.setAttribute("lat",lat); 
    newButton.setAttribute("lng",lng); 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); 
    })
    document.getElementById("contents").appendChild(newButton); 
}

// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    createButtons(lat,lng,title)
    return message
}

fetch("map.geojson") 
    .then(function (data){
        return data.json()
    })
    .then(function (data){ 
        // Basic Leaflet method to add GeoJSON data
        L.geoJSON(data).addTo(map)
    });
