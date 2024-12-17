import e from "express"
import { configDotenv } from "dotenv"
import connectDB from "./Database/Connectdb.js"

configDotenv()

const app = e()
const port = process.env.port

app.get('/', (req , res)=>{
    res.send("hello world")
});

app.listen(port , ()=>{
    console.log(`Server running at port : ${port}` );
    connectDB()
})