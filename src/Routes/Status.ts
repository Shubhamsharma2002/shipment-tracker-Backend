import { Router } from "express";
import { addStatusUpdate, trackShipment } from "../Controller/ShipmentStatusController";

const Statusrouter = Router();
Statusrouter.post('/shipments/:shipmentId/status', addStatusUpdate);
Statusrouter.get('/shipments/:shipmentId/track', trackShipment);

export default Statusrouter;