import mongoose from 'mongoose';

const sweatshirtSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  mrp: {
    type: Number,
    required: true,
    min: 0,
  },
  discountPercent: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    enum: ['Sweatshirt', 'sweatshirt', 'SWEATSHIRT'],
    default: 'Sweatshirt',
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.Mixed, // Can be ObjectId or String
    required: true,
  },
  product_info: {
    brand: {
      type: String,
      trim: true,
    },
    manufacturer: {
      type: String,
      trim: true,
    },
    tshirtSize: {
      type: String,
      trim: true,
    },
    tshirtMaterial: {
      type: String,
      trim: true,
    },
    tshirtFit: {
      type: String,
      trim: true,
    },
    tshirtSleeve: {
      type: String,
      trim: true,
    },
    tshirtNeck: {
      type: String,
      trim: true,
    },
    tshirtColor: {
      type: String,
      trim: true,
    },
    IncludedComponents: {
      type: String,
      trim: true,
    },
  },
  images: {
    'T-Shirt': {
      type: String,
    },
    'Full Sleeve T-Shirt': {
      type: String,
    },
    'Polo': {
      type: String,
    },
    'Oversized': {
      type: String,
    },
    'Cargo Shirt': {
      type: String,
    },
    'Sweatshirt': {
      type: String,
    },
    'Hoodies': {
      type: String,
    },
    'Zipper Hoodies': {
      type: String,
    },
    'Jacket': {
      type: String,
    },
  },
  // Optional fields for backward compatibility and additional features
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  ratingsCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  reviewsCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  stock: {
    type: Number,
    default: 0,
    min: 0,
  },
  sizes: [{
    type: String,
  }],
  isNewArrival: {
    type: Boolean,
    default: false,
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: false, // We're handling timestamps manually
});

// Calculate final price (mrp - discount)
sweatshirtSchema.virtual('finalPrice').get(function() {
  if (this.discountPercent > 0) {
    return this.mrp - (this.mrp * this.discountPercent / 100);
  }
  return this.mrp;
});

// Ensure virtuals are included in JSON output
sweatshirtSchema.set('toJSON', { virtuals: true });
sweatshirtSchema.set('toObject', { virtuals: true });

// Update timestamp before saving
sweatshirtSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Indexes
sweatshirtSchema.index({ category: 1 });
sweatshirtSchema.index({ categoryId: 1 });
sweatshirtSchema.index({ title: 'text', description: 'text' });
sweatshirtSchema.index({ 'product_info.brand': 1 });

// Use 'Sweatshirt' as the collection name
const Sweatshirt = mongoose.model('Sweatshirt', sweatshirtSchema, 'Sweatshirt');

export default Sweatshirt;
