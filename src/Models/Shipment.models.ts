import mongoose, { Schema, Document } from 'mongoose';

// TypeScript interface for better IntelliSense
export interface IShipment extends Document {
  productName: string;
  deliveryAddress: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ShipmentSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      required: true,  // Origin is now mandatory
    },
  },
  {
    timestamps: true,
  }
);


const Shipment = mongoose.model<IShipment>('Shipment', ShipmentSchema);

export default Shipment;
