// Replace 'YOUR_API_KEY' with your actual API key
const api_key = 'YOUR_API_KEY';
const apiUrl = 'https://api.artic.edu/api/v1/artists';

// Function to fetch the list of artists from the API
async function fetchArtists() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': 'Bearer ' + api_key
            }
        });
        if (!response.ok) {
            throw new Error('Failed to retrieve artist information: ' + response.status);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error);
    }
}

// Function to fetch the artwork of a specific artist
async function fetchArtwork(artistId) {
    const artworkUrl = `https://api.artic.edu/api/v1/artworks?artist_id=${artistId}`;
    try {
        const response = await fetch(artworkUrl, {
            headers: {
                'Authorization': 'Bearer ' + api_key
            }
        });
        if (!response.ok) {
            throw new Error('Failed to retrieve artwork information: ' + response.status);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error);
    }
}

// Function to display the artwork in the center of the screen
function displayArtworkInCenter(artwork) {
    console.log('Artwork data:', artwork); // Log the artwork data to the console
    // Create and display the artwork in the center of the screen
    // You can use any method to display the artwork, such as a modal or a dedicated section in the HTML
}

// Function to display the artists in the 1x12 grid
async function displayArtists() {
    const artists = await fetchArtists();
    const artistGrid = document.getElementById('artist-grid');
    artists.forEach(artist => {
        const artistCard = document.createElement('div');
        artistCard.classList.add('artist-card');
        artistCard.innerHTML = `
            <h2 class="artist-name" data-artist-id="${artist.id}">${artist.title}</h2>
        `;
        artistGrid.appendChild(artistCard);
    });

    // Add event listeners to the artist names after they have been appended to the artist grid
    const artistNames = document.querySelectorAll('.artist-name');
    console.log('Artist names:', artistNames); // Log the artist names to the console
    artistNames.forEach(artistName => {
        artistName.addEventListener('click', async () => {
            const artistId = artistName.getAttribute('data-artist-id');
            console.log('Clicked artist ID:', artistId); // Log the clicked artist ID to the console
            const artwork = await fetchArtwork(artistId);
            console.log('Fetched artwork:', artwork); // Log the fetched artwork to the console
            displayArtworkInCenter(artwork);
        });
    });
}

// Call the displayArtists function when the page loads
displayArtists();