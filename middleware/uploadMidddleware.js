import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = 'uploads';

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      const uniqueSuffix=Date.now()+'-'+Math.round(Math.random()*1E9);
      const ext = path.extname(file.originalname);
      cb(null, `${uniqueSuffix}${ext}`);
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(!file.originalname.match(/\.(xlsx)$/)){
            return cb(new Error("Only .xlsx files are allowed"),false);
        }
        cb(null, true);
    }
})

export default upload;