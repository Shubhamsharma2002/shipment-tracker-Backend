import 'dotenv/config';
import cors from "cors"
import express from "express";
import connectDB from "./Db/dbConnection";
import Shipmentrouter from './Routes';
import Statusrouter from './Routes/Status';


const app = express();
const PORT =  process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Shipment Tracker API is running!");
});
// shipment routes
app.use("/api/v1",Shipmentrouter);
// shipment status routes
app.use('/api/v1', Statusrouter);

app.listen(PORT, () => {
  connectDB()
  console.log(`Server listening on http://localhost:${PORT}`);
});
