import dotenv from 'dotenv';
import { ConnectDB } from './db/index.js';
import { app } from './app.js';
dotenv.config('./.env')
ConnectDB()


.then(()=>{

    const Port = process.env.PORT || 9000;

    app.listen(Port, ()=>{ console.log(`server is running on port : http://localhost:${Port}`) })
})

.catch((error)=>{
    console.log('MongoDB connection Error from src > index.js ' , error )
})