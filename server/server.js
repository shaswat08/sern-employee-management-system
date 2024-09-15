import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import adminRouter from "./routes/admin.route.js";

dotenv.config(); // load .env file

const app = express(); // create express app

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json()); // parse json request bodies
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("uploads"));

app.use("/api/admin", adminRouter); // use auth router

const PORT = process.env.PORT; // get port from .env file

// listen for requests

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
