import mongoose from "mongoose";
import { DB_Name } from "../constant.js"

const connectdb = async() => {
  try {
   const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_Name}`)
   console.log(`MongoDb connected !! DB host: ${connectionInstance.connection.host}`)
 } catch (error) {
   console.error("Error in database connection :", error)
   process.exit(1)
 }
}

export default connectdb;