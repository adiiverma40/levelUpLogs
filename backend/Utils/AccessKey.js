import jwt from "jsonwebtoken"
import { configDotenv } from "dotenv"   
configDotenv()


function generateAccessToken(user) {
    return  jwt.sign(user , process.env.ACCESSTOKEN , {expiresIn : '15m'})

}

function generateRefreshToken(user) {
    return  jwt.sign(user , process.env.REFRESHTOKEN , {expiresIn :"7d"})
    
}

export {generateAccessToken , generateRefreshToken}