import mongoose from "mongoose";
const latestMobiles = mongoose.Schema({
  product_id: {
    type: mongoose.Types.ObjectId,
  },
});
export default mongoose.model("latestMobiles", latestMobiles);
