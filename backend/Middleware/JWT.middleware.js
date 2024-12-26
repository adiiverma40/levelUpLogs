import jwt from "jsonwebtoken"
import { configDotenv } from "dotenv"
configDotenv()
async function checkUserAuth(req, res, next) {
    console.log("in checkUserAuth");
    const refreshToken = req.cookies.refreshToken
    console.log("refresh token in checkUserAuth",refreshToken);
    
    if(!refreshToken){
        return res.status(401).send({error: 'Access denied. No token'})
    }
    try {
        const decoded = jwt.verify(refreshToken ,process.env.REFRESHTOKEN )
        console.log("decoded data from jwt" , decoded);
        
        req.user = decoded
        res.status(200).json({message: 'Token verified' , userData : decoded})
        next()
    } catch (error) {
        res.status(400).send({error: 'Invalid token'})
        
    }
    
}


async function clearRefreshCookie(req, res, next) {
    console.log("in clearRefreshCookie");
    res.clearCookie('refreshToken')
    res.status(200).send({message: 'Refresh token cleared'})
    next()
    
}




export  {checkUserAuth , clearRefreshCookie}
