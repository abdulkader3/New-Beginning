import { configDotenv } from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
configDotenv()



// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const UploadOnCloudinary = async (LocalFileName) => {
    try {
        if(!LocalFileName) return null;

        const response = await cloudinary.uploader.upload(
            LocalFileName, 
            { resource_type: 'auto' }
        )

        fs.unlinkSync(LocalFileName)

        return response;
    } catch (error) {

        fs.unlinkSync(LocalFileName) // delete

        return null;
        
    }
};

export{UploadOnCloudinary};