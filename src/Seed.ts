import 'dotenv/config';
import mongoose from 'mongoose';

import Shipment from './Models/Shipment.models';

if (!process.env.URI) {
    throw new Error("URI not found in environment variables");
  }
if(!process.env.DB_NAME){
    throw new Error("Db Name not found in environment variables");
}
const DB_NAME : String = process.env.DB_NAME
const URI : String= process.env.URI ;

const seedData = async () => {
  try {
    await mongoose.connect(`${URI}/${DB_NAME}`)
    console.log('Connected to MongoDB');

    await Shipment.deleteMany();
    console.log('Cleared old shipment data');

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

    await Shipment.insertMany(shipments);
    console.log('Shipment data seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
