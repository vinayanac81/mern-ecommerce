import mongoose from "mongoose";

const wishlistSchema = mongoose.Schema({
  product_id: {
    type: mongoose.Types.ObjectId,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
  },
});

const wishlistModel = mongoose.model("wishlist", wishlistSchema);

export default wishlistModel;
