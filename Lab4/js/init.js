// declare variables
let mapOptions = {'center': [38.534550,-121.752060],'zoom':7}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

// New Map
let CartoDB_VoyagerLabelsUnder = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
});

CartoDB_VoyagerLabelsUnder.addTo(map);

// Old Map
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

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
    newButton.addEventListener('click', function() { map.flyTo([lat,lng],7); })
    newButton.addEventListener('click', function() { marker.openPopup(); })
    const spaceForButtons = document.getElementById("buttons");
    spaceForButtons.appendChild(newButton); 

    // Button Styling
    if (32.64500655777006 < lat && lat < 42.03470992037843 &&
        -124.23540320418294 < lng && lng < -114.14680413455335)
    {
        newButton.style.backgroundColor = "#b1be9d";
        newButton.style.color = "#edede9";
    }
    else{
        newButton.style.backgroundColor = "#edede9";
        newButton.style.color = "#b1be9d";
    }

    newButton.style.fontSize = "12px";
    newButton.style.fontFamily = "";
    newButton.style.textAlign = "center";
    newButton.style.margin = "2px"
    newButton.style.paddingTop = "8px";
    newButton.style.paddingBottom = "8px";
    newButton.style.justifyContent = "center";
    newButton.style.width = "30%";
    newButton.style.cursor = "pointer";
}

//Data Stuff
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
            let adj = data['What\'s one adjective to describe your place?'];
            // adj = adj.charAt(0).toUpperCase() + adj.slice(1);
            let dataTitle = data['First Name'] + "'s " + adj + " Place"; 
            let dataMessage = "\"" + data['Why did you choose this location? '] + "\"";
            let dataLocation = data["What is a special location to you?"];
            addMarker(data.lat,data.lng,dataTitle,dataLocation,dataMessage);
        }
    })
}

loadData(dataUrl)

//Copied Code (https://www.w3schools.com/howto/howto_js_tabs.asp)

document.getElementById("defaultOpen").click();

function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}


