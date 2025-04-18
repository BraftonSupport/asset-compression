# Asset Compression Documentation

## Overview
Asset compression is a JavaScript utility designed to compress images efficiently. It reduces file size while maintaining acceptable image quality, making it ideal for web applications.

## Features
- Image compression with adjustable quality.
- Supports multiple image formats (e.g., JPEG, PNG).  
    NOTE: GIF is not supported.
- Resize Images by width maintaining aspect ratio.
- Lightweight and easy to integrate.

## Installation
clone this repo `git clone https://github.com/braftonsupport/asset-compression`

## Usage
Basic usage passes no options and uses all the defaults.
`npm run compress`  
Advanced usage passes options into the script by adding -- along with each image option prepended with -- as detailed in the following command.  
`npm run compress -- --imagePath=assets/images/specificclient`
### Option
- `impagePath`:  
    default: ./assets/images  
        By default the compress cript will optimize all images in the assets/images folder recursivly and add a compressed copy into the asset/compressed folder. You can specify a specific folder path instead.
- `quality`:   
    default: 80  
        Adjust the quality of the compressed image
- `resizeWidth`:  
    default: original File width  
        Adjust the width of the optmized file. Aspect ratio will be maintained.


## Notes
- Ensure the input file is an image.
- Compression may vary depending on the original image size and quality.

