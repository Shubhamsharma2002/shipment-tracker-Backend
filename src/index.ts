import 'dotenv/config';
import express from "express";
import connectDB from "./Db/dbConnection";
import Shipmentrouter from './Routes';
import Statusrouter from './Routes/Status';

const app = express();
const PORT =  8000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Shipment Tracker API is running!");
});

app.use("/api/v1",Shipmentrouter);
app.use('/api/v1', Statusrouter);

app.listen(PORT, () => {
  connectDB()
  console.log(`Server listening on http://localhost:${PORT}`);
});
