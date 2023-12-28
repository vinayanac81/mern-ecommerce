import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
  },
  product_id: {
    type: mongoose.Types.ObjectId,
  },
  product_count: {
    type: Number,
    default: 1,
  },
});

const cartModel = mongoose.model("cart", cartSchema);

export default cartModel;
