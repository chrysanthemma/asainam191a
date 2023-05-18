// declare variables
let mapOptions = {'center': [38.534550,-121.752060],'zoom':7}

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
    newButton.addEventListener('click', function() { map.flyTo([lat,lng],7); })
    newButton.addEventListener('click', function() { marker.openPopup(); })
    const spaceForButtons = document.getElementById("buttons");
    spaceForButtons.appendChild(newButton); 

    // CSS Styling
    // newButton.style.color = "#797d62";
    newButton.style.color = "#6c584c";
    newButton.style.fontSize = "12px";
    newButton.style.backgroundColor = "#edede9";
    newButton.style.fontFamily = "";
    newButton.style.textAlign = "center";

    // newButton.style.borderColor = "#9b9b7a";
    // // newButton.style.borderRadius = "4px";
    // newButton.style.borderStyle = "solid"
    // newButton.style.borderWidth = "medium";
    newButton.style.margin = "2px"
    // newButton.style.outline = "5px";
    newButton.style.paddingTop = "8px";
    newButton.style.paddingBottom = "8px";
    // 16px

    // newButton.style.lineHeight = "26px";
    // newButton.style.display = "flex";
    // newButton.style.flexDirection = "column"
    newButton.style.justifyContent = "center";
    // newButton.style.flex = "auto";
    newButton.style.width = "30%";
    newButton.style.cursor = "pointer";
    // newButton.style.float = "right";

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

// Copied Code (https://www.w3schools.com/howto/howto_js_tabs.asp)

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


