function displayArtworks(artistName, artistQuery) {
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    prevButton.removeEventListener('click', scrollLeftHandler);
    nextButton.removeEventListener('click', scrollRightHandler);
    const artworksContainer = document.getElementById('artworksContainer');
    artworksContainer.innerHTML = '';
    fetch(`https://api.artic.edu/api/v1/artworks/search?q=${artistQuery}&limit=20&fields=id,title,image_id,artist_title,description`)
      .then(response => response.json())
      .then(data => {
        const artworks = data.data;
        const baseIiifUrl = 'https://www.artic.edu/iiif/2';
        artworks
          .filter(artwork => artwork.artist_title !== 'Leigh Ledare')
          .forEach(artwork => {
            const imageId = artwork.image_id;
            const iiifUrl = `${baseIiifUrl}/${imageId}/full/843,/0/default.jpg`;
  
            const artworkItem = document.createElement('div');
            artworkItem.classList.add('artworkItem');
  
            const titleImageContainer = document.createElement('div');
            titleImageContainer.classList.add('titleImageContainer');
  
            const titleElement = document.createElement('h3');
            titleElement.textContent = artwork.title;
            titleElement.classList.add('artworkTitle');
            titleImageContainer.appendChild(titleElement);
  
            const imgElement = document.createElement('img');
            imgElement.classList.add('artworkImage');
            imgElement.onload = function() {
              titleImageContainer.appendChild(imgElement);
            };
            imgElement.onerror = function() {
              console.error('Error loading image for artwork:', artwork.title);
              artworksContainer.removeChild(artworkItem);
            };
            imgElement.src = iiifUrl;
  
            artworkItem.appendChild(titleImageContainer);
  
            artworksContainer.appendChild(artworkItem);
  
            titleElement.addEventListener('click', function() {
              const artworkDescription = artwork.description ? stripHtmlTags(artwork.description) : "Description not available";
              document.getElementById('artworkTitle').textContent = artwork.title;
              document.getElementById('artworkDescription').textContent = artworkDescription;
              const modal = document.getElementById('artworkModal');
              modal.style.display = "block";
              document.getElementsByClassName('close')[0].addEventListener('click', function() {
                modal.style.display = "none";
              });
            });
  
            titleElement.addEventListener('mouseover', function() {
              titleElement.style.cursor = "pointer";
              titleElement.style.textDecoration = "underline";
            });
  
            titleElement.addEventListener('mouseout', function() {
              titleElement.style.cursor = "default";
              titleElement.style.textDecoration = "none";
            });
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
  
  document.getElementById('exitButton').addEventListener('click', function() {
    document.getElementById('artworksContainer').innerHTML = '';
  
  });
  
  function stripHtmlTags(html) {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  }
  
  fetch('https://api.artic.edu/api/v1/artists')
    .then(response => response.json())
    .then(data => {
      const artists = data.data.filter(artist => artist.title !== 'Leigh Ledare');
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