let currentArtworkIndex = 0;
let artworks = [];
let currentArtist = '';

// JavaScript code for retrieving artworks by various artists and storing them in an array
fetch('https://api.artic.edu/api/v1/artworks/search?limit=100&fields=id,title,image_id,artist_title')
  .then(response => response.json())
  .then(artworksData => {
    console.log(artworksData);

    artworks = artworksData.data;

    // Create a list of artist names
    const artistList = document.getElementById('artistList');
    const artists = {};
    artworks.forEach(artwork => {
      artists[artwork.artist_title] = true;
    });

    const sortedArtists = Object.keys(artists).sort();
    sortedArtists.forEach(artistName => {
      const artistNameElement = document.createElement('div');
      artistNameElement.textContent = artistName;
      artistNameElement.classList.add('artistName');
      artistNameElement.addEventListener('click', () => displayArtworkByArtist(artistName));
      artistList.appendChild(artistNameElement);
    });
  })
  .catch(error => console.error('Failed to retrieve artworks by various artists:', error));

// Function to display all artworks by the selected artist
function displayArtworkByArtist(artistName) {
    currentArtist = artistName;
    const artistArtworks = artworks.filter(artwork => artwork.artist_title === artistName);
    const artworkContainer = document.getElementById('artworkDisplay');
    artworkContainer.innerHTML = ''; // Clear previous artwork
  
    artistArtworks.forEach(artwork => {
      const baseIIIFUrl = "https://www.artic.edu/iiif/2";
      const iiifUrl = `${baseIIIFUrl}/${artwork.image_id}/full/843,/0/default.jpg`;
  
      const img = document.createElement('img');
      img.src = iiifUrl;
      img.alt = artwork.title;
      img.classList.add('artworkImage');
      artworkContainer.appendChild(img);
  
      const title = document.createElement('div');
      title.textContent = artwork.title;
      title.classList.add('artworkTitle');
      artworkContainer.appendChild(title);
    });
  }