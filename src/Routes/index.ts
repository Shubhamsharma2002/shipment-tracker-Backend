import { Router } from "express";
import { getAllshipment } from "../Controller/ShipmentController";

const Shipmentrouter = Router();

Shipmentrouter.route("/allShipment").get(getAllshipment)

export default Shipmentrouter