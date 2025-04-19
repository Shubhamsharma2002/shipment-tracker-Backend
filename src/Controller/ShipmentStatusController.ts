import { Request, Response } from 'express';
import Shipment from '../Models/Shipment.models';
import { StatusUpdate } from '../Models/ShipmentStatus.model';
export const addStatusUpdate = async (req: Request, res: Response): Promise<void> => {
    const { shipmentId } = req.params;
    const { status, location, timestamp } = req.body;
  
    try {
      const shipment = await Shipment.findById(shipmentId);
      if (!shipment) {
        res.status(404).json({ message: 'Shipment not found' });
        return;
      }
      if (!['PICKUP', 'IN_TRANSIT', 'DELIVERED'].includes(status)) {
        res.status(400).json({ message: 'Invalid Status' });
        return;
      }
      const existingStatus = await StatusUpdate.findOne({
        shipmentId,
        status
      });
  
      if (existingStatus) {
        res.status(409).json({ message: `Status "${status}" already exists for this shipment` });
        return;
      }
      const newStatus = await StatusUpdate.create({
        shipmentId,
        status,
        location,
        timestamp,
      });
  
      res.status(201).json(newStatus);
    } catch (error) {
      res.status(500).json({ message: 'Error adding status update', error });
    }
  };
export const trackShipment = async (req: Request, res: Response): Promise<void> => {
    const { shipmentId } = req.params;
  
    try {
      const shipment = await Shipment.findById(shipmentId);

      if (!shipment) {
        res.status(404).json({ message: 'Shipment not found' });
        return;
      }
  
      const statusUpdates = await StatusUpdate.find({ shipmentId })

        .sort({ timestamp: 1 }); // Ascending order
  
      res.status(200).json({
        shipment,
        statusHistory: statusUpdates,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tracking data', error });
    }
  };