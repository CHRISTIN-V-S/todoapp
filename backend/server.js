
const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const todoRoutes = require("./routes/todoRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

const allowedOrigins = [
    "https://todoapp-frontend-ten.vercel.app",
    "http://localhost:5173"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());

app.use("/api/todoapp", todoRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
    res.send("Todo API is running");
});

connectDB();

const port = process.env.PORT || 5585;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
