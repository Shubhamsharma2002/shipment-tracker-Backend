// statusUpdate.model.ts
import mongoose from 'mongoose';

const StatusUpdateSchema = new mongoose.Schema({
  shipmentId: {
    type: String,
    ref: 'Shipment',
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: 'Received',
  },
  timestamp: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

export const StatusUpdate = mongoose.model('StatusUpdate', StatusUpdateSchema);
