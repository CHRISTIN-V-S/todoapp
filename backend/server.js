const connectDB=require("./config/db")
const express = require("express")
// const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const todoRoutes=require("./routes/todoRoutes")
const userRoutes=require("./routes/userRoutes")

const app = express()

app.use(cors({
    origin:process.env.FRONTEND_URL
}))
app.use(express.json())

connectDB()


const port = 5585

app.use("/api/todoapp", todoRoutes);
app.use("/api/user",userRoutes)


app.listen(port, () => {
    console.log(`server listening at port, ${port}`)
})

