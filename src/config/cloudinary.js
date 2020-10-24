import { config } from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

config();

cloudinary.config(process.env.CLOUDINARY_URL);

export default cloudinary.uploader;
