const fs = require('fs');

// Read the movies.json file
const moviesData = JSON.parse(fs.readFileSync('movies.json', 'utf8'));

// Select a random movie
const randomIndex = Math.floor(Math.random() * moviesData.movies.length);
const randomMovie = moviesData.movies[randomIndex];

// Write the selected movie to movie.json
fs.writeFileSync('movie.json', JSON.stringify(randomMovie, null, 2));

console.log('Random movie selected and written to movie.json');
