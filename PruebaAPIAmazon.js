const url = "https://api.musicapi.com/api/123e4567-e89b-12d3-a456-426614174000/artists/987654321";

fetch(url, requestOptions)
    .then((response) => response.json()) // Cambia .text() a .json() si el resultado es JSON
    .then((result) => console.log('Información del artista:', result))
    .catch((error) => console.error('Error:', error));


