import jwt from "jsonwebtoken";
import { User } from "../Models/User.model.js";

export const authenticateUser = async (req, res, next) => {
 try {
   const token = req.header("Authorization")?.replace("Bearer " , "")
   console.log(token)
 
   if (!token) {
     return res.status(401).json({error : "Missing Token"})
   }
 
   const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN)
   const user = await User.findById(decodedToken._id).select("-password -refreshToken")
 
   if (!user) {
     return res.status(401).json({ message: "Cannot get user Details...please Sign Up" });
 
   }
 
   req.user = user; // ✅ Yehi tumhara user set karega
   next();
 } catch (error) {
   console.error("JWT Auth Error:", err);
   res.status(401).json({ message: "Invalid or expired token" });
 }
}