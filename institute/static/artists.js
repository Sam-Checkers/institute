function displayArtworks(artistName, artistQuery) {
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    prevButton.removeEventListener('click', scrollLeftHandler);
    nextButton.removeEventListener('click', scrollRightHandler);
    const artworksContainer = document.getElementById('artworksContainer');
    artworksContainer.innerHTML = '';
    fetch(`https://api.artic.edu/api/v1/artworks/search?q=${artistQuery}&limit=20&fields=id,title,image_id,artist_title`)
      .then(response => response.json())
      .then(data => {
        const artworks = data.data;
        const baseIiifUrl = 'https://www.artic.edu/iiif/2';
        artworks
          .filter(artwork => artwork.artist_title !== 'Leigh Ledare') // Exclude artworks by Leigh Ledare
          .forEach(artwork => {
            const imageId = artwork.image_id;
            const iiifUrl = `${baseIiifUrl}/${imageId}/full/843,/0/default.jpg`;
  
            // Create a container for the artwork item
            const artworkItem = document.createElement('div');
            artworkItem.classList.add('artworkItem');
  
            // Create a container for the title and image
            const titleImageContainer = document.createElement('div');
            titleImageContainer.classList.add('titleImageContainer');
  
            // Create and append the title element
            const titleElement = document.createElement('h3');
            titleElement.textContent = artwork.title;
            titleImageContainer.appendChild(titleElement);
  
            // Create and append the image element if it can be loaded
            const imgElement = document.createElement('img');
            imgElement.classList.add('artworkImage');
            imgElement.onload = function() {
              // Handle image load
              titleImageContainer.appendChild(imgElement);
            };
            imgElement.onerror = function() {
              console.error('Error loading image for artwork:', artwork.title);
              // Skip over both the title and the image if the image cannot be obtained
              artworksContainer.removeChild(artworkItem);
            };
            imgElement.src = iiifUrl;
  
            // Append the title and image container to the artwork item
            artworkItem.appendChild(titleImageContainer);
  
            // Append the artwork item to the artworks container
            artworksContainer.appendChild(artworkItem);
          });
        artworksContainer.scrollLeft = 0;
        prevButton.addEventListener('click', scrollLeftHandler);
        nextButton.addEventListener('click', scrollRightHandler);
      })
      .catch(error => {
        console.error('Error retrieving artwork data:', error);
      });
  }
  
  function scrollLeftHandler() {
    const artworksContainer = document.getElementById('artworksContainer');
    artworksContainer.scrollBy(-window.innerWidth, 0);
  }
  
  function scrollRightHandler() {
    const artworksContainer = document.getElementById('artworksContainer');
    artworksContainer.scrollBy(window.innerWidth, 0);
  }
  
  fetch('https://api.artic.edu/api/v1/artists')
    .then(response => response.json())
    .then(data => {
      const artists = data.data.filter(artist => artist.title !== 'Leigh Ledare'); // Exclude Leigh Ledare from the list of artists
      const artistLinks = document.getElementById('artistLinks');
      artists.forEach(artist => {
        const artistLink = document.createElement('a');
        artistLink.href = '#';
        artistLink.classList.add('artistLink');
        artistLink.textContent = artist.title;
        artistLink.addEventListener('click', function(event) {
          event.preventDefault();
          displayArtworks(artist.title, artist.title);
        });
        artistLinks.appendChild(artistLink);
      });
    })
    .catch(error => {
      console.error('Error retrieving artist data:', error);
    });