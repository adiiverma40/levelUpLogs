import bycrypt from "bcryptjs"

async function hashPassword(password) {
    try {
        const salt = await bycrypt.genSalt(10)
        const hash = await bycrypt.hash(password , salt)
        console.log(`password : ${password} , hashed : ${hash}`);
        return hash
    } catch (error) {
        console.log(error);
        
    }
}

async function checkPassword(dbPassword , userPassword) {
    try {
        const check = await bycrypt.compare(userPassword , dbPassword)
        console.log(check);
        return check
        
    } catch (error) {
        console.log(error);
        
    }
}

export {hashPassword , checkPassword}