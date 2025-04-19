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
