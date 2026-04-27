import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  badge: String,
  badgeColor: String,
  emi: Number,
  image: String,
  category: {
    type: String,
    enum: ['men', 'women', 'unisex'],
    required: true
  },
  description: String,
  sizes: [String],
  colors: [String],
  inStock: {
    type: Boolean,
    default: true
  },
  sku: {
    type: String,
    unique: true,
    required: true
  },
  rating: {
    type: Number,
    default: 4.5,
    min: [0, 'Rating cannot be negative'],
    max: [5, 'Rating cannot exceed 5']
  },
  reviews: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    default: 100
  }
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);
