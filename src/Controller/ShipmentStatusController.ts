// shipment status controller
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
      // 1. Get status history, sorted by timestamp (ascending order)
      const statusUpdates = await StatusUpdate.find({ shipmentId }).sort({ timestamp: -1 });
  
      if (statusUpdates.length === 0) {
        res.status(404).json({ message: 'No status history found for this shipment' });
        return;
      }
  
      // 2. Get static shipment info (no need to sort as we are fetching by ID)
      const shipment = await Shipment.findById(shipmentId);
  
      if (!shipment) {
        res.status(404).json({ message: 'Shipment not found' });
        return;
      }
  
      // 3. Return both static and dynamic data
      res.status(200).json({
        shipmentId: shipment._id,
        productName: shipment.productName,
        origin: shipment.origin,
        deliveryAddress: shipment.deliveryAddress,
        statusHistory: statusUpdates,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        // If error is an instance of the Error class, access its message
        console.error('Tracking error:', error.message);
        res.status(500).json({ message: 'Error fetching tracking data', error: error.message });
      } else {
        // If error is not an instance of Error, handle it generically
        console.error('Unexpected error:', error);
        res.status(500).json({ message: 'Unexpected error occurred', error: 'Unknown error' });
      }
    }
  };
  