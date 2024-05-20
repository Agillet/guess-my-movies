import fetch from 'node-fetch';
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// Replace with your API URL
const apiUrl = 'https://api.example.com/data?page=';


const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&release_date.gte=1970-01-01&sort_by=popularity.desc&vote_average.gte=6&vote_count.gte=1000&page=';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjhlY2RmZDdkNWJmODFmMjUwOTBiZTQxOGQ3MTU5NSIsInN1YiI6IjVhZDcwYzBkOTI1MTQxM2IyYjAwYjVkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qizaYyuPCQCUGUJq5DU_ULA4IE49xcu3azxDgABie24'
  }
};


const fetchPage = async (page) => {
    try {
        const response = await fetch(`${apiUrl}${page}`, options);
        if (!response.ok) {
            throw new Error(`Error fetching page ${page}: ${response.statusText}`);
        }
        const data = await response.json();
        return data; // Adjust this based on the structure of your API response
    } catch (error) {
        console.error(error);
        return [];
    }
};

const fetchAllPages = async () => {
    const allResults = [];
    const totalPages = 20;

    for (let i = 1; i <= totalPages; i++) {
        console.log(`Fetching page ${i}...`);
        const pageData = await fetchPage(i);
        allResults.push(...pageData);
    }

    return allResults;
};

const writeToFile = (data, filePath) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log(`Data successfully written to ${filePath}`);
        }
    });
};

const main = async () => {
    const data = await fetchAllPages();
    const outputFilePath = path.join(__dirname, 'list.json');
    writeToFile(data, outputFilePath);
};

main();
