// declare variables
let zoomLevel = 3;
const mapCenter = [48.0196, 66.9237];

// use the variables
const map = L.map('the_map').setView(mapCenter, zoomLevel);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// create a function to add markers
function addMarker(lat,lng,title,message,image){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(
        `<h2>${title}</h2> 
        <h3><i>${message}</i></h3> 
        <img src=${image} width="200">`)
    return message
}

// use our marker functions
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