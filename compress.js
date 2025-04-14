const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const args = process.argv || null;

const options = {
    imagePath: path.join(__dirname,'assets', 'images'),
    quality: 80
};
console.log(options);
args.forEach(arg => {
    if (arg.startsWith('--')) {
        const [key, value] = arg.slice(2).split('=');
        options[key] = value;
    }
});

const imagesFolder = options.imagePath || path.join(__dirname,'assets', 'images');


fs.readdir(imagesFolder, (err, files) => {
    if (err) {
        console.error('Error reading the images folder:', err);
        return;
    }
    const fileArray = files.map(file => path.join(imagesFolder, file));
    fileArray.forEach(currentImage => {
        processFile(currentImage);
       
    });
});
async function processFile(currentImage){
    fs.stat(currentImage, (err, stats) => {
        if (err) {
            console.error(`Error checking file/folder ${currentImage}:`, err);
            return;
        }
        if (stats.isFile()) {
            compressImage(currentImage);
        } else if (stats.isDirectory()) {
            processFilesInDirectory(currentImage);
        }
    });
}
async function processFilesInDirectory(currentImage) {
    fs.readdir(currentImage, (err, innerFiles) => {
        if (err) {
            console.error(`Error reading folder ${currentImage}:`, err);
            return;
        }
        innerFiles.forEach(innerFile => {
            const innerFilePath = path.join(currentImage, innerFile);
            fs.stat(innerFilePath, (err, innerStats) => {
                if (err) {
                    console.error(`Error checking file ${innerFilePath}:`, err);
                    return;
                }
                if (innerStats.isFile()) {
                    compressImage(innerFilePath);
                }else if (innerStats.isDirectory()) {
                    processFilesInDirectory(innerFilePath);
                }
            });
        });
    });
}
async function compressImage(file) {
    const fileExtension = path.extname(file).replace('.', '');
    const fileName = path.basename(file, path.extname(file));
    const filePath = path.dirname(file).replace(imagesFolder, '');
    
    const outputFolder = path.join(__dirname, 'assets', 'compressed', filePath);
    
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true });
    }
    sharp(file)
        // .resize(600) // Example: Resize the image to a width of 800px, maintaining aspect ratio
        .toFormat(fileExtension, { quality: parseInt(options.quality, 10) }) // Convert to WebP format with 80% quality
        .toFile(`${outputFolder}/${fileName}.${fileExtension}`, (err, info) => {
            if (err) {
                console.error(`Error processing file ${file}:`, err);
            } else {
                console.log(`Successfully processed ${file}:`, info);
            }
        });
}