import mongoose, { Schema, model, Model } from "mongoose";
import { UserType } from "@types";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: {
      values: ['admin', 'client'],
      message: '{VALUE} is not a valid role',
      default: 'client',
      required: true,
    }
  },
}, {
  timestamps: true,
})

export const User:Model<UserType> = mongoose.models.User || model('User', userSchema)
