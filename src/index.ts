import 'dotenv/config';
import express from "express";
import connectDB from "./Db/dbConnection";

const app = express();
const PORT =  8000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Shipment Tracker API is running!");
});

app.listen(PORT, () => {
  connectDB()
  console.log(`Server listening on http://localhost:${PORT}`);
});
