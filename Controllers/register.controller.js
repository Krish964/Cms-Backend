import { User } from "../Models/User.model.js"

export const registerUser = async (req, res) => {
 try {
   const { username, email, number, password } = req.body
   console.log(username, email, number, password)

   if (
     [username, email, password].some((field) => !field?.trim()) ||
     !number || number.toString().trim() === ""
   ) {
     return res.status(400).json({error : "All fields are requires"})
   }
 
   //  check if any of the fields already exist or not
   
   const existingUsername = await User.findOne({ username });
   if (existingUsername) {
     return res.status(400).json({ error: "Username already exists. Please use another." });
   }

   const existingEmail = await User.findOne({ email })
   if (existingEmail) {
     return res.status(400).json({ error: "Email already exists. Please use another." });
   }

   const existingNumber = await User.findOne({ number });
   if (existingNumber) {
     return res.status(400).json({ error: "Number already exists. Please use another." });
   }


   //  create new user in database
   const user = await User.create({
     username,
     email,
     number,
     password, 
   })

   //  return created user excluding password and refresh token
   const createdUser = await User.findById(user._id).select("-password -refreshToken")

   if (!createdUser) {
     return res.status(500).json({ error: "User not created. Server issue." });
   }

   return res.status(201).json({
     message: "User registered successfully",
     user: createdUser
   });

 } catch (error) {
   console.error("Register Error:", error);
   return res.status(500).json({ error: "Internal server error" });
 }
  
}