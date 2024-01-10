import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  category: {
    type: String,
    enum: ['atari', 'playstation', 'wii', 'gameboy', 'others'],
    required: [true, "Category is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [1000, "Price must be 1000 a least"]
  },
  region: {
    type: String,
    required: [true, "Region is required"],
  },
  comuna: {
    type: String,
    required: [true, "Comuna is required"],
  },
  image: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minlength: [5, "Description must be at least 5 characters"],
    maxlength: [300, "Description must have a maximum of 300 characters"]
  },
  contact: {
    type: String,
    required: [true, "Contact is required"],
  },
  image: {
    type: String,
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

export const ProductModel = mongoose.model("Products", productSchema);
