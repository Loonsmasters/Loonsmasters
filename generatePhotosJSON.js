const fs = require('fs');
const path = require('path');

const photosDir = path.join(__dirname, 'photos');
const outputFile = path.join(__dirname, 'photos.json');

// Function to read all files in a directory
function readDirectory(dirPath) {
  return fs.readdirSync(dirPath).filter(file => fs.statSync(path.join(dirPath, file)).isFile());
}

// Function to generate a JSON object based on folder structure
function generatePhotosJSON() {
  const years = fs.readdirSync(photosDir).filter(file => fs.statSync(path.join(photosDir, file)).isDirectory());

  const photosByYear = {};

  years.forEach(year => {
    const yearPath = path.join(photosDir, year);
    const files = readDirectory(yearPath).filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
    photosByYear[year] = files;
  });

  // Write the JSON output to a file
  fs.writeFileSync(outputFile, JSON.stringify(photosByYear, null, 2), 'utf-8');
  console.log('Photos JSON generated:', outputFile);
}

generatePhotosJSON();
