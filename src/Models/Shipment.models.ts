import mongoose, { Schema, Document } from 'mongoose';



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


const Shipment = mongoose.model('Shipment', ShipmentSchema);

export default Shipment;
