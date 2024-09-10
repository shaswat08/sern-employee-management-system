import express from "express";
import dotenv from "dotenv";

dotenv.config(); // load .env file

const app = express(); // create express app

app.use(express.json()); // parse json request bodies
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies

app.use("/api/auth", authRouter); // use auth router

const PORT = process.env.PORT; // get port from .env file

// listen for requests

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
