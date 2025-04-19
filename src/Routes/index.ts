import { Router } from "express";
import { createShipment, getAllshipment, getShipmentbyID } from "../Controller/ShipmentController";

const Shipmentrouter = Router();

Shipmentrouter.route("/allShipment").get(getAllshipment)
Shipmentrouter.route("/shipments").post(createShipment);
Shipmentrouter.route("/shipments/:shipmentId").get(getShipmentbyID);

export default Shipmentrouter