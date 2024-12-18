import { checkPassword, hashPassword } from "../../Utils/EncrpytDycrpt.js";
import {user} from "../Models/User/User.model.js"

async function createUser(req, res) {
    try {
        console.log("in Sign Up");
        
        const {name , email , password , DOB , currentWeight} = req.body
        console.log(name , email , password , DOB , currentWeight);
        
          // Check if all required fields are provided
          if (!name || !email || !password || !DOB || !currentWeight) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await user.findOne({email})
        console.log(existingUser);
        if(existingUser){
            return res.status(400).json({ message: "User Already Exist" });
        }
        const hashedPassword = await hashPassword(password)
        const newUser = await user.create(
            {
                name , 
                email ,
                password : hashedPassword,
                DOB ,
                currentWeight
            }
        )
        console.log("sending res");
        
        res.status(201).json({ message: "User created successfully", newUser });
        
    } catch (error) {
         res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function checkUser(req, res) {
    try {
        console.log("In Login");
        
        const {email , password} = req.body

        console.log("finding user......!");
        
        const userData = await user.findOne({email})
        console.log("user Found!");
        
        // console.log(userData);
        
        const isPassword = await checkPassword(userData.password , password)
        console.log(isPassword);
        
        if(isPassword){

            res.status(201).json({message : "User Found!" , userData})
        }



    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}



export {createUser , checkUser}