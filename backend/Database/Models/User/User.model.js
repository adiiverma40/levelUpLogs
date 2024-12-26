import mongoose, { trusted } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        email : {
            type : String , 
            required : true
        },
        password : {
            type : String,
            required : true

        },
        DOB : {
            type : Date,
            required : true
        },
        currentWeight : {
            type : Number,
            required : true
        },
        profileImage : {
            type : String,
            default : "https://placehold.co/600x400"
        },
    }
)

export const user = mongoose.model("User" , userSchema)