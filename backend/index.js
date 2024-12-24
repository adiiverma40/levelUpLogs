import e from "express"
import { configDotenv } from "dotenv"
import connectDB from "./Database/Connectdb.js"
import cors from "cors"
import { checkUser, createUser } from "./Database/Controller/User.Controller.js"
import cookieParser from "cookie-parser"

import {checkUserAuth} from "./Middleware/JWT.middleware.js"


configDotenv()

const app = e()
const port = process.env.port
const corsOptions = {
    origin: 'http://localhost:5173', // Make sure this is the correct frontend URL
    credentials: true, // Allow cookies to be sent
  };
//middlewares
app.use(cors(corsOptions))
app.use(e.json())
app.use(cookieParser())




//router
app.get('/', (req , res)=>{
    res.send("hello world")
  
    console.log(req.cookies);
});

app.post('/api/signup', async (req, res)=>{
    console.log(req.body );
    await createUser(req , res)
})

app.get('/protected' ,  (req , res , next)=>{
   console.log("in protected route");
   checkUserAuth(req, res, next)
   
    
})


app.post('/api/login', async (req, res)=>{
    console.log(req.body);
    await checkUser(req, res)
    
    
})











app.listen(port , ()=>{
    console.log(`Server running at port : ${port}` );
    connectDB()
})