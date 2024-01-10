import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  product_name: {
    type: String,
  },
  display: {
    type: String,
  },
  original_price: {
    type: Number,
  },
  rating: {
    type: Number,
    default: 5,
  },
  totalReviewRating: {
    type: Number,
  },
  offer_price: {
    type: Number,
  },
  brand: {
    type: String,
  },
  stock: {
    type: Number,
  },
  image: {
    type: String,
  },
  disable: {
    type: Boolean,
  },
  latestFiveGMobiles: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
  },
  ram: {
    type: String,
  },
  rom: {
    type: String,
  },
  battery: {
    type: String,
  },
  processor: {
    type: String,
  },
  front_camera: {
    type: String,
  },
  back_camera: {
    type: String,
  },
});

const productModel = mongoose.model("products", productSchema);

export default productModel;
