// shipment models
import mongoose, { Schema, Document } from 'mongoose';
import { StatusUpdate } from './ShipmentStatus.model';



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

ShipmentSchema.post('save', async function (doc) {
  try {
    await StatusUpdate.create({

      shipmentId: doc._id,
      status: 'PICKUP',
      location: doc.origin,
      timestamp: new Date(),
    });
    console.log(`StatusUpdate created for Shipment ID: ${doc._id}`);
  } catch (err) {
    console.error('Failed to create status update:', err);
  }
});


const Shipment = mongoose.model('Shipment', ShipmentSchema);

export default Shipment;
