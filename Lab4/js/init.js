// declare variables
let mapOptions = {'center': [38.534550,-121.752060],'zoom':8}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// create a function to add markers
function addMarker(lat,lng,title,location,message){
    console.log(message);
    const m = L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${location}</h3> <p>${message}</p>`);
    createButtons(lat,lng,title,m); 
    return message;
}

function createButtons(lat,lng,title,marker){
    const newButton = document.createElement("button"); 
    newButton.id = "button"+title; 
    newButton.innerHTML = title; 
    newButton.setAttribute("lat",lat); 
    newButton.setAttribute("lng",lng); 
    newButton.addEventListener('click', function() { map.flyTo([lat,lng],8); })
    newButton.addEventListener('click', function() { marker.openPopup(); })
    document.getElementById("buttons").appendChild(newButton); 
}

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQgj_yTgLJpDOWXNJ8Cy5aBVE_kJCg582pauA0JJvi0sBJEVV-gDUR-Dn7Z-IzmDk048smwjlQBGMiu/pub?output=csv"

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
}

function processData(results){
    console.log(results)
    results.data.forEach(data => {
        console.log(data);
        if (data['First Name'] && data["What is a special location to you?"] !== "")
        {
            let dataTitle = data['First Name'] + "'s " + data['What\'s one adjective to describe your place?']+ " Place"; 
            let dataMessage = "\"" + data['Why did you choose this location? '] + "\"";
            let dataLocation = data["What is a special location to you?"];
            addMarker(data.lat,data.lng,dataTitle,dataLocation,dataMessage);
        }
    })
}

loadData(dataUrl)
