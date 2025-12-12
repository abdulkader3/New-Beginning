import mongoose from "mongoose";
import { DB_Name } from "../constance.js";


const ConnectDB = async ()=>{
    try {
        
        const connectionInstance = await mongoose.connect(`${process.env.MONGOdbURI}/${DB_Name}`);

        console.log(`Server Connected 😊❤️👍 the host : ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log(" Error From src> db > index.js ", error);
        process.exit(1);
    }
}


export {ConnectDB}