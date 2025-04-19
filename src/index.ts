import express from "express";

const app = express();
const PORT =  8000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Shipment Tracker API is running!");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
