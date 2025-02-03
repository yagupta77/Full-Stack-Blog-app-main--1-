import fs from 'fs';
import multer from 'multer';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'public/images';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true }); // Create directory if it doesn't exist
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
export const upload = multer({ storage: storage });
