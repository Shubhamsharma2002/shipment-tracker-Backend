import 'dotenv/config';
import mongoose from 'mongoose';

import Shipment from './Models/Shipment.models';
import { StatusUpdate } from './Models/ShipmentStatus.model';


if (!process.env.URI) {
  throw new Error("URI not found in environment variables");
}
if (!process.env.DB_NAME) {
  throw new Error("Db Name not found in environment variables");
}
const DB_NAME: string = process.env.DB_NAME;
const URI: string = process.env.URI;

const seedData = async () => {
  try {
    await mongoose.connect(`${URI}/${DB_NAME}`);
    console.log('Connected to MongoDB');

    await Shipment.deleteMany();
    await StatusUpdate.deleteMany(); 
    console.log('Cleared old shipment & status data');

    const shipments = [
      { _id: 'SH1001', productName: 'Laptop', deliveryAddress: '123 Main St, City, Country', origin: 'Warehouse A' },
      { _id: 'SH1002', productName: 'Smartphone', deliveryAddress: '456 Elm St, City, Country', origin: 'Warehouse B' },
      { _id: 'SH1003', productName: 'Tablet', deliveryAddress: '789 Oak St, City, Country', origin: 'Warehouse C' },
      { _id: 'SH1004', productName: 'Headphones', deliveryAddress: '101 Pine St, City, Country', origin: 'Warehouse D' },
      { _id: 'SH1005', productName: 'Smartwatch', deliveryAddress: '202 Birch St, City, Country', origin: 'Warehouse E' },
      { _id: 'SH1006', productName: 'Camera', deliveryAddress: '303 Cedar St, City, Country', origin: 'Warehouse F' },
      { _id: 'SH1007', productName: 'Printer', deliveryAddress: '404 Maple St, City, Country', origin: 'Warehouse G' },
      { _id: 'SH1008', productName: 'Monitor', deliveryAddress: '505 Willow St, City, Country', origin: 'Warehouse H' },
      { _id: 'SH1009', productName: 'Keyboard', deliveryAddress: '606 Pine St, City, Country', origin: 'Warehouse I' },
      { _id: 'SH1010', productName: 'Mouse', deliveryAddress: '707 Oak St, City, Country', origin: 'Warehouse J' }
    ];

    const insertedShipments = await Shipment.insertMany(shipments);
    console.log('Shipment data seeded!');

    const statusUpdates = insertedShipments.map((shipment) => ({
      shipmentId: shipment._id,
      status: 'PICKUP',
      location: shipment.origin,
      timestamp: new Date(),
    }));

    await StatusUpdate.insertMany(statusUpdates);
    console.log('Status updates created for all shipments');

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
