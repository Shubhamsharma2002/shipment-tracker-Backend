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
      {
        productName: "iPhone 15 Pro Max",
        deliveryAddress: "145 morna Sector 34, noida, Up",
      },
      {
        productName: "Sony WH-1000XM5 Headphones",
        deliveryAddress: "155 morna Sector 35, noida, Up",
      },
      {
        productName: "Dell XPS 15 Laptop",
        deliveryAddress: "185 morna Sector 34, noida, Up",
      },
      {
        productName: "PlayStation 5 Console",
        deliveryAddress: "145 morna Sector 62, noida, Up",
      },
      {
        productName: "Apple Watch Series 9",
        deliveryAddress: "145 morna Sector 3, noida, Up",
      },
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
