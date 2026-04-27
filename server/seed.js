import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import { allProducts } from '../src/data/products.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Clear existing data
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    await Product.insertMany(allProducts);
    console.log(`Seeded ${allProducts.length} products`);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
