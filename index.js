import dotenv from "dotenv"
dotenv.config();
import express from "express";
import connectdb from "./DB/database.js";
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express();
const port = process.env.PORT;

app.use(cors())
app.use(express.json())
app.use(cookieParser())

// Import routes
import routes from "./Routes/routes.js"

app.use("/api/controls" , routes)
connectdb()

app.listen(port, () => {
  console.log(`Server is running at port ${port}`)
})