// declare variables
let mapOptions = {'center': [48.0196, 66.9237],'zoom':3}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


//Buttons
function createButtons(lat,lng,title, zoom = 3){
    const newButton = document.createElement("button"); 
    newButton.id = "button-"+title; 
    newButton.innerHTML = title; 
    newButton.setAttribute("lat",lat); 
    newButton.setAttribute("lng",lng); 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng], zoom); 
    })
    document.getElementById("contents").appendChild(newButton); 
}

let UScenter = [39.011902, -98.484245]
createButtons(UScenter[0], UScenter[1], "Where I Watched These Shows!", 5)
createButtons(mapOptions.center[0], mapOptions.center[1], "Actual Show Locations")

//GeoJSON
fetch("hw-map.geojson").then(response => {return response.json()}) // json file
    .then(data =>{
        // Basic Leaflet method to add GeoJSON data
        L.geoJSON(data).bindPopup(layer => {
                let name = layer.feature.properties.place;
                let text = `<h3>${name}</h3>`;
                text += `<em>Watched: </em>`;
                text += layer.feature.properties['Shows I Watched Here'];
                return text;
            })              
    .addTo(map);
    })

// Markers
function addMarker(lat,lng,title,message,image){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(
        `<h2>${title}</h2> 
        <h3><i>${message}</i></h3> 
        <img src=${image} width="200">`)
    return message
}

addMarker(31.94657,35.302723,'Judea','The Chosen',
'https://7hillschurch.tv/wp-content/uploads/2022/02/ChosenFull.jpg')
addMarker(32.8244,35.5880,'Galilee','The Chosen',
'https://7hillschurch.tv/wp-content/uploads/2022/02/ChosenFull.jpg')
addMarker(48.8566,2.3522,'Paris, France','Miraculous',
'https://upload.wikimedia.org/wikipedia/en/5/5f/Miraculous-original-title-card.png')
addMarker(35.9078,127.7669,'South Korea','Extraordinary Attorney Woo',
'https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/33be3a6e7b119c640c37c6e513cdeafd.jpg')
addMarker(36.2048,138.2529,'Japan','Demon Slayer, Love is War, MHA',
'https://animemojo.com/images/articles/banners/12086.jpg')
addMarker(35.5308,139.7029,'Kawasaki City, Japan','Jujutsu Kaisen',
'https://i0.wp.com/jpbound.com/wp-content/uploads/2020/10/jujutsu-kaisen-anime-poster-key-visual-1236862-1280x0-1.jpeg?fit=1280%2C670&ssl=1')
addMarker(52.5200,13.4050,'Berlin, Germany','SPY X FAMILY',
'https://dw9to29mmj727.cloudfront.net/social/2376-SocialShareAssets_SpyFamily_600x314.jpg')

