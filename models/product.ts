import mongoose, { Schema, model, Model } from 'mongoose'
import { ProductType } from '../types/products';

const productSchema = new Schema({
  description: { type: String, required: true, default:''},
  images: [{ type: String }],
  inStock: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true, default: 0 },
  slug: { type: String, required: true, unique: true },
  tags: [{ type: String }],
  title: { type: String, required: true, default:'' },
  variant: [{
    type: String,
    enum: {
      values: ['original', 'picosito', 'fuego', 'mango', 'piña'],
      message: '{VALUE} is not a valid variant'
    },
    default:['original']
  }],
  category: [{
    type: String,
    enum: {
      values: ['bites', 'pulpa', 'piquin', 'deshidratados'],
      message: '{VALUE} is not a valid category'
    },
    default:['bites']
  }],
  netWt: { type: Number },
}, {
  timestamps: true
});

productSchema.index({ title: 'text', tags: 'text'})

export const Product: Model<ProductType> = mongoose.models.Product || model('Product', productSchema)
