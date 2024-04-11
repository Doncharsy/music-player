let songTitile = document.querySelector(".song-title");
const textContainer = document.querySelector(".text-container")
const coverPage = document.querySelector(".cover-page");
const albums = document.querySelectorAll(".cover-art");
let player = document.querySelector('audio');
let access_token = '';



document.addEventListener('DOMContentLoaded',()=>{
 albumImg.style.animationPlayState = 'paused'
})

const audioElement = document.querySelector('audio');

function updateStatus(){
 if(!audioElement.paused){
  albumImg.style.animationPlayState = 'running'
 }
 else{
  albumImg.style.animationPlayState = 'paused'
 }
}

audioElement.addEventListener('play', updateStatus);
audioElement.addEventListener('pause', updateStatus);


const btn = document.querySelector(".btn");
btn.addEventListener('click', ()=>{
 coverPage.classList.add("move-up");
 textContainer.innerHTML= "&#128536"
})

const albumImg = document.querySelector(".album-img")

document.addEventListener("DOMContentLoaded", ()=>{
 albums.forEach(function(album){
  album.addEventListener("click", ()=>{
    albumImg.style.animationPlayState = 'paused'
   
   // api

 const clientId = "556cd023d74e41ba91c3d53438a71af1";
 const clientSecret = "8520b0a17dde4e6b958f565381b15472"


 const getToken = async () => {

  const result = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
          'Content-Type' : 'application/x-www-form-urlencoded', 
          'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
      },
      body: 'grant_type=client_credentials'
  });

  const data = await result.json();
  // return data.access_token;
  access_token = data.access_token
  
  setTimeout(() => {
    audioElement.classList.add('show')
    
    const playlistId = '3kksNa7iaoiMHK0B2QtAOE?si=929e87acbf834784'

fetch(`https://api.spotify.com/v1/playlists/${playlistId}/albums`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${access_token}`
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error('Failed to fetch track data');
    }
    return response.json();
})
.then(trackData => {
    let randomNumber = Math.floor(Math.random()*110)
    if(trackData.tracks.items[randomNumber].track.preview_url){
    albumImg.src = `${trackData.tracks.items[randomNumber].track.album.images[1].url}`
    songTitile.textContent = `${trackData.tracks.items[randomNumber].track.name}`
    player.src = `${trackData.tracks.items[randomNumber].track.preview_url}`}
    else{
        if(randomNumber < 0){randomNumber++}
        else{randomNumber--}
    }
})
.catch(error => {
    console.error('Error fetching track data:', error);
});
  }, 100);

  }

  getToken()
   
  })
 })
})


let quotes = ["If you could see my thoughts, you'd see your face -Frank Ocean","I love you like Kanye loves Kanye -Kanye West", "I love to love you, and I hate to hate you -Lana Del Rey", "Can I get a kiss? And can you make it last forever? -Tyler, The Creator", "Thanking God that he drew you like that -J.Cole" ]


let index = 0; // Index to keep track of the current sentence

function displayNextQuote() {
    const quoteElement = document.querySelector('.quotes');
    quoteElement.textContent = `${quotes[index]}`;
    quoteElement.style.opacity = 1;

    setTimeout(() => {
        quoteElement.style.opacity = 0;
        index = (index + 1) % quotes.length; // Move to the next quote
        setTimeout(displayNextQuote, 1000); // Call the function again after 1 second for fade-out effect
    }, 5000); // Show each quote for 5 seconds
}

// Start displaying quotes
displayNextQuote();


  




