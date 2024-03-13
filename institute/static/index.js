javascript
    let currentArtworkIndex = 0;
    let artworks = [];
    let currentArtist = '';

    // Function to display the artwork by the selected artist
    function displayArtworkByArtist(artistName) {
      currentArtist = artistName;
      const artistArtworks = artworks.filter(artwork => artwork.artist_title === artistName);
      currentArtworkIndex = 0;
      displayArtwork(currentArtworkIndex, artistArtworks);
      updateArrowVisibility(true);
    }

    // Function to display the artwork at the given index
    function displayArtwork(index, artistArtworks) {
      const baseIIIFUrl = "https://www.artic.edu/iiif/2";
      const imageId = artistArtworks[index].image_id;
      const iiifUrl = `${baseIIIFUrl}/${imageId}/full/843,/0/default.jpg`;

      const artworkContainer = document.getElementById('artworkDisplay');
      artworkContainer.innerHTML = ''; // Clear previous artwork
      const img = document.createElement('img');
      img.src = iiifUrl;
      img.alt = artistArtworks[index].title;
      img.classList.add('artworkImage');
      artworkContainer.appendChild(img);

      const title = document.createElement('div');
      title.textContent = artistArtworks[index].title;
      title.classList.add('artworkTitle');
      artworkContainer.appendChild(title);
    }

    // Function to navigate to the next or previous artwork
    function navigateArtwork(direction) {
      const artistArtworks = artworks.filter(artwork => artwork.artist_title === currentArtist);
      currentArtworkIndex = (currentArtworkIndex + direction + artistArtworks.length) % artistArtworks.length;
      displayArtwork(currentArtworkIndex, artistArtworks);
    }

    // Function to update arrow visibility based on current artist
    function updateArrowVisibility(hasArtist) {
      const leftArrow = document.getElementById('leftArrow');
      const rightArrow = document.getElementById('rightArrow');
      if (hasArtist) {
        leftArrow.style.display = 'block';
        rightArrow.style.display = 'block';
      } else {
        leftArrow.style.display = 'none';
        rightArrow.style.display = 'none';
      }
    }
   