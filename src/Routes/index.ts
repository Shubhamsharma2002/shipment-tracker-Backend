import { Router } from "express";
import { createShipment, deleteShipment, getAllshipment, getShipmentbyID, updateShipment } from "../Controller/ShipmentController";

const Shipmentrouter = Router();

Shipmentrouter.route("/allShipment").get(getAllshipment)
Shipmentrouter.route("/shipments").post(createShipment);
Shipmentrouter.route("/shipments/:shipmentId").get(getShipmentbyID);
Shipmentrouter.route('/shipments/:shipmentId').put(updateShipment);

// DELETE: Delete shipment by shipmentId
Shipmentrouter.route('/shipments/:shipmentId').delete(deleteShipment);

export default Shipmentrouter