import mongoose from "mongoose";

const reviewAndRatingSchema = mongoose.Schema({
  review: {
    type: String,
  },
  rating: {
    type: Number,
  },
  product_id: {
    type: mongoose.Types.ObjectId,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
  },
});

const reviewAndRating = mongoose.model(
  "reviewAndRating",
  reviewAndRatingSchema
);

export default reviewAndRating;
