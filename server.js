import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import routers from './routes/routes.js'
import dbCon from "./utlis/db.js";
import path from 'path';

import { fileURLToPath } from "url";


//resolving es module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

dotenv.config()
const app=express()
dbCon()
app.use(cors())
app.use(express.json())
app.use('/api',routers)


// client
 app.use(express.static(path.join(__dirname,'client/dist')));

//render
app.get('*',(req,res)=> res.sendFile(path.join(__dirname,'client/dist/index.html')));



app.listen(process.env.PORT,()=>{
    console.log('server is running')
})