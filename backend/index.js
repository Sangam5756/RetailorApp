import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import dbcon from "./dbconfig/db.js";
import router from "./routes/receipts.js";
import path, { dirname } from "path";



const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
dotenv.config();
app.use(express.json());


app.use("/api/receipts",router);




// deployement
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});



app.listen(PORT, () => {
  console.log(`click on this -  http://localhost:5000`);
  dbcon();
});
