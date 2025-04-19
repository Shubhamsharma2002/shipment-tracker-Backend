import { Request, Response } from "express";
import Shipment from "../Models/Shipment.models";

export const getAllshipment = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await Shipment.find();

    if (!data || data.length === 0) {
       res.status(404).json({ message: "No shipments found" });
    }

     res.status(200).json(data);
  } catch (error: any) {
     res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const createShipment = async (req: Request, res: Response): Promise<void> => {
    const { _id, productName, deliveryAddress, origin } = req.body;
  
    try {
      // Create a new shipment
      const newShipment = new Shipment({
        _id,
        productName,
        deliveryAddress,
        origin,
      });
  
      // Save to the database
      await newShipment.save();
      res.status(201).json(newShipment);
    } catch (error) {
      res.status(500).json({ message: 'Error creating shipment', error });
    }
  };


  export const getShipmentbyID = async (req: Request, res: Response): Promise<void> => {
    const { shipmentId } = req.params;
  
    try {
      // Find the shipment by ID
      const shipment = await Shipment.findById(shipmentId);
  
      if (!shipment) {
         res.status(404).json({ message: 'Shipment not found' }); 
         return //  here to stop further execution
      }
  
       res.status(200).json(shipment); // Only send the success response if shipment is found
    } catch (error) {
       res.status(500).json({ message: 'Error fetching shipment', error });
    }
  };
  