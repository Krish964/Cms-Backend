import { User } from "../Models/User.model.js"

export const loginUser = async (req, res) => {
 try {
   const { email, password } = req.body
 
   // Function to generate accesstoken and refresh token
    const generateAccessandRefreshToken = async(userId) => {
      const user = User.findById(userId)
      const accessToken = user.generateAccessToken()
      const refreshToken = user.generateRefreshTokens()
 
      user.refreshToken = refreshToken
      await user.save({ validavalidateBeforeSave: false })
 
      return {accessToken , refreshToken}
   }
   
   // validation for email and password
   if (!email.trim() || !password.trim()) {
     return res.status(400).json({ error: "Email and password are required" });
   }
 
   //Check user details in database
   const user = User.findOne({ email })
   
   if (!user) {
     console.log(`User not found for email : ${email}`)
     return res.status(401).json({ error: "User not found...Please SignUp" });
   }
 
   // check password entered by the user
   const isPasswordValid = user.isPasswordCorrect(password)
   if (!isPasswordValid) {
     return res.status(401).json({error : "Wrong password. Please enter correct passowrd"})
   }
 
   // Generate token via usermodel methods
   const { accessToken, refreshToken } = generateAccessandRefreshToken(user._Id)
   
   // create options for sending Tokens in cookie
   const options = {
     httpOnly: true,
     secure : true,
   }
 
   return res.status(200)
     .cookie("access_token", accessToken)
     .cookie("refresh_token", refreshToken 
   )
     .json({
       message: "Login Successfull",
       user: {
         _id: user._id,
         username: user.username,
         email: user.email,
       }
       ,
       accessToken,
       refreshToken
   })
 } catch (error) {
   console.error("Error during login:", error);
   return res.status(500).json({ error: "An internal server error occurred" });
 }
}

export const logoutUser = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined
      }
    },

    {
      new: true
    }
  )

  const options = {
    httpOnly: true,
    secure: true
  }

  res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
      success: true,
      message: "SuccessFully loggedOut"
    })
}
