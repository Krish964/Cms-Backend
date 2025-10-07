import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    lowercase: true
  },

  subtitle: {
    type: String,
    required: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true,
    lowercase: true
  }, 
 author : {
   type: String,
   required: true,
   lowercase: true
  }, 
  location: {
    type: String,
    required: true,
    lowercase: true
 },
  image : {
    type: String,
    required: true,
 }
}, { timestamps: true })

export const Article = mongoose.model("Article" , articleSchema)