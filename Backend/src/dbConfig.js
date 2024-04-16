const db=require('mongoose');
require('dotenv').config();
const url=process.env.MONGO_URL;

DbConnect = async ()=>{
    try{
        await db.connect(url);
        console.log('conectado a la base de datos');
    }catch(error){
        console.log(" Error Database connection", error);
    }
}

module.exports= DbConnect;

