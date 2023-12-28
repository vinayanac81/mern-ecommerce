import express from "express";
import multer from "multer";
import {
  addAddress,
  addProductToWishlist,
  addReviewRating,
  addToCart,
  applyCoupon,
  decrementQuantity,
  deleteAddress,
  getAddressData,
  getAllProducts,
  getBookedDetail,
  getBookingList,
  getBrandedProductsByHighToLow,
  getBrandedProductsByLowToHigh,
  getBrandedProductsByNewestFirst,
  getBrands,
  getCartProductsData,
  getCartSingleProductData,
  getCoupons,
  getLatestProducts,
  getOrderDetails,
  getProductDetails,
  getReferralData,
  getReviewrating,
  getUserInfo,
  getWishlist,
  incrementQuantity,
  removeFromCart,
  removeProductFromWishlist,
  updateAddress,
  updateEmailAddress,
  updateFirstOrLastNameOrGender,
  updatePassword,
  verifyOtpForUpdateEmailAddress,
} from "../controllers/userCOntroller.js";
import { userAuth } from "../middleware/auth.js";

const router = express.Router();
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: fileStorage });
router.get("/getUserInfo", userAuth, getUserInfo);
router.post(
  "/updateFirstOrLastNameOrGender",
  userAuth,
  updateFirstOrLastNameOrGender
);
router.post("/updateEmailAddress", userAuth, updateEmailAddress);
router.post(
  "/verifyOtpForUpdateEmailAddress",
  userAuth,
  verifyOtpForUpdateEmailAddress
);
router.get("/getLatestProducts", getLatestProducts);
router.get("/getBrands", getBrands);
router.get("/getProductDetails", getProductDetails);
router.get("/brandedProductsByNewestFirst", getBrandedProductsByNewestFirst);
router.get("/brandedProductsByLowToHigh", getBrandedProductsByLowToHigh);
router.get("/brandedProductsByHighToLow", getBrandedProductsByHighToLow);
router.post("/addProductToWishlist", userAuth, addProductToWishlist);
router.get("/getWishlist", userAuth, getWishlist);
router.get("/getCartSingleProductData", userAuth, getCartSingleProductData);
router.get("/getAddressData", userAuth, getAddressData);
router.get("/getCartProductsData", userAuth, getCartProductsData);
router.post("/removeProductFromWishlist", userAuth, removeProductFromWishlist);
router.post("/add-to-cart", userAuth, addToCart);
router.post("/decrementQuantity", userAuth, decrementQuantity);
router.post("/incrementQuantity", userAuth, incrementQuantity);
router.post("/removeFromCart", userAuth, removeFromCart);
router.post("/addAddress", userAuth, addAddress);
router.post("/applyCoupon", userAuth, applyCoupon);
router.get("/getCoupons",getCoupons)
router.post("/addReviewAndRating",userAuth,addReviewRating)
router.get("/getReviewrating",userAuth,getReviewrating)
router.get("/getOrders", userAuth, getBookingList);
router.get("/get-booked-detail", userAuth, getBookedDetail);
router.get("/get-all-products", getAllProducts);
router.post("/update-password", userAuth, updatePassword);
router.post("/update-address", userAuth, updateAddress);
router.post("/delete-address", userAuth, deleteAddress);
router.get("/get-referral-data", userAuth, getReferralData);
router.get("/get-order-details", userAuth, getOrderDetails);
export default router;
