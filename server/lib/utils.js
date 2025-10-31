import jwt from "jsonwebtoken"

export const createToken  = (userId)=>{
    const token = jwt.sign({userId},process.env.SECRET_KEY);
    return token;   
}