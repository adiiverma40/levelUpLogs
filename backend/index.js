import e from "express"
import { configDotenv } from "dotenv"
import connectDB from "./Database/Connectdb.js"
import cors from "cors"
import { createUser } from "./Database/Controller/User.Controller.js"
configDotenv()

const app = e()
const port = process.env.port

//middlewares
app.use(cors())
app.use(e.json())


//router
app.get('/', (req , res)=>{
    res.send("hello world")
});

app.post('/api/signup', async (req, res)=>{
    console.log(req.body );
    await createUser(req , res)
    
    

    
})











app.listen(port , ()=>{
    console.log(`Server running at port : ${port}` );
    connectDB()
})