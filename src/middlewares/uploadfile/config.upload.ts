import { diskStorage } from 'multer';
import { extname } from 'path';
import fs = require('fs');
type validFileExtension = 'png' | 'jpg' | 'jpeg';
type validMimeType = 'image/png' | 'image/jpg' | 'image/jpeg';

const validFileExtensions: validFileExtension[] = ['png', 'jpg', 'jpeg'];
const validMimeTypes: validMimeType[] = [
  'image/png',
  'image/jpg',
  'image/jpeg',
];

export const saveImageToStorage = {
    //? Middleware Upload Images
    storage: diskStorage({
        destination: './images/upload',
        filename: (req, file, cb) => {         
                    const dateObj = new Date();
                const month = dateObj.getUTCMonth() + 1; //months from 1-12
                const day = dateObj.getUTCDate();
                const year = dateObj.getUTCFullYear();
                const newdate = `${year}${month}${day}`
                //? กรณีเอาแค่นามสกุลไฟล์ที่ upload ${extname(file.originalname)}
                cb(null, `${newdate}-${file.originalname}`);                
        },
    }),
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes: validMimeType[] = validMimeTypes;
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
    }
}

export const removeFile = (fullFilePath: string): void => {
    try {
      fs.unlinkSync(fullFilePath);
    } catch (err) {
      console.error(err);
    }
  };