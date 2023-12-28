import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
  name: {
    type: String,
  },
  user_id: {
    type: mongoose.Types.ObjectId
  },
  mobile_number: {
    type: String,
  },
  address: {
    type: String,
  },
  pincode: {
    type: String,
  },
  district: {
    type: String,
  },
  place: {
    type: String,
  },
  state:{
    type:String
  }
});

const addressModel = mongoose.model("address", addressSchema);
export default addressModel;
