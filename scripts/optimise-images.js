import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../public/assets/images');
const SIZES = [320, 640, 960, 1280];

async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);
    console.log(`Converted ${inputPath} to WebP`);
  } catch (error) {
    console.error(`Error converting ${inputPath}:`, error);
  }
}

async function generateResponsiveSizes(inputPath, filename) {
  const baseName = path.basename(filename, path.extname(filename));
  
  for (const size of SIZES) {
    const outputPath = path.join(IMAGES_DIR, `${baseName}-${size}.webp`);
    try {
      await sharp(inputPath)
        .resize(size)
        .webp({ quality: 80 })
        .toFile(outputPath);
      console.log(`Generated ${size}px version of ${filename}`);
    } catch (error) {
      console.error(`Error generating ${size}px version of ${filename}:`, error);
    }
  }
}

async function processImages() {
  try {
    const files = await fs.readdir(IMAGES_DIR);
    
    for (const file of files) {
      if (file.match(/\.(png|jpg|jpeg)$/i)) {
        const inputPath = path.join(IMAGES_DIR, file);
        const webpPath = path.join(IMAGES_DIR, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
        
        // Convert to WebP
        await convertToWebP(inputPath, webpPath);
        
        // Generate responsive sizes
        await generateResponsiveSizes(inputPath, file);
      }
    }
    
    console.log('Image optimisation complete!');
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

processImages(); 