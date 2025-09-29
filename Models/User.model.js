import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: Number,
    required: true,
    unique: true
  },
  password: {
    type: String,
    require: [true, "Password is required"],
  },
  refreshToken: {
    type: String
  },

},

  {
    timestamps: true
  })

// Encrypting the password
userSchema.pre("save" , async function(next) {
  if(!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password , 10)
  next()
})

// Code to compare a presaved password 
userSchema.methods.isPasswordCorrect = async function (plainPassword) {
  return await bcrypt.compare(plainPassword , this.password)
}


// JWT--> Creating access token and refresh token 
userSchema.methods.generateAccessToken =  function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    }, 
    process.env.ACCESS_SECRET_TOKEN,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIERY
    }
  )
  
}

userSchema.methods.generateRefreshTokens = function () {
  return jwt.sign(
    {
      _id: this._id,

    },
    process.env.REFRESH_SECRET_TOKEN,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIERY
    }
  )
}

export const User = mongoose.model("User", userSchema)