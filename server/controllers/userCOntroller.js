import cartModel from "../model/cartModel.js";
import productModel from "../model/productModel.js";
import orderModel from "../model/orderModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import Razorpay from "razorpay";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import crypto from "crypto";
import categoryModel from "../model/categoryModel.js";
import brandModel from "../model/brandModel.js";
import userModel from "../model/userModel.js";
import coupenModel from "../model/coupenMode.js";
import addressModel from "../model/addressModel.js";
import latest5GModel from "../model/latest5GModel.js";
import wishlistModel from "../model/wishlistModel.js";
import nodemailer from "nodemailer";
import reviewAndRating from "../model/reviewAndRating.js";
dotenv.config();
export const getUserInfo = async (req, res) => {
  try {
    const { userId } = req.body;
    const userInfo = await userModel.findOne({ _id: new ObjectId(userId) });
    res.status(200).json({ success: true, userInfo });
  } catch (error) {
    console.log(error);
  }
};
export const getLatestProducts = async (req, res) => {
  try {
    const latest5GProducts = await latest5GModel.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $project: {
          product: { $arrayElemAt: ["$product", 0] },
          _id: 1,
        },
      },
    ]);
    return res.json({ success: true, latest5GProducts });
  } catch (error) {
    console.log(error);
  }
};
export const getBrands = async (req, res) => {
  try {
    const brands = await brandModel.find({});
    res.status(200).json({ success: true, brands });
  } catch (error) {
    console.log(error);
  }
};
export const getWishlist = async (req, res) => {
  try {
    const { userId } = req.body;
    const wishlist = await wishlistModel.aggregate([
      {
        $match: {
          user_id: new ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $project: {
          product: { $arrayElemAt: ["$product", 0] },
          _id: 1,
        },
      },
    ]);
    res.status(200).json({ success: true, wishlist });
  } catch (error) {
    console.log(error);
  }
};
export const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.query;
    const productData = await productModel.findOne({
      _id: new ObjectId(productId),
    });
    res.status(200).json({ success: true, productData });
  } catch (error) {
    console.log(error);
  }
};
export const getBrandedProductsByNewestFirst = async (req, res) => {
  try {
    const { brandName } = req.query;
    const products = await productModel
      .find({
        brand: brandName.toLowerCase(),
      })
      .sort({ date: -1 });
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
  }
};
export const getBrandedProductsByLowToHigh = async (req, res) => {
  try {
    const { brandName } = req.query;
    const products = await productModel
      .find({
        brand: brandName.toLowerCase(),
      })
      .sort({ offer_price: 1 });
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
  }
};
export const getBrandedProductsByHighToLow = async (req, res) => {
  try {
    const { brandName } = req.query;
    const products = await productModel
      .find({
        brand: brandName.toLowerCase(),
      })
      .sort({ offer_price: -1 });
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
  }
};
export const addProductToWishlist = async (req, res) => {
  try {
    const { productId, userId } = req.body;
    await wishlistModel.create({
      product_id: productId,
      user_id: userId,
    });
    res.status(201).json({ success: true, message: "Added to wishlist" });
  } catch (error) {
    console.log(error);
  }
};
export const removeProductFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    await wishlistModel.deleteOne({
      product_id: productId,
    });
    res.status(201).json({ success: true, message: "Removed from wishlist" });
  } catch (error) {
    console.log(error);
  }
};
export const addToCart = async (req, res) => {
  try {
    const { id } = req.query;
    const { userId } = req.body;
    // const available = await cartModel.findOne({
    //   user_id: new ObjectId(userId),
    //   product_id: new ObjectId(id),
    // });
    // if (available === null) {
    await cartModel.create({
      user_id: userId,
      product_id: id,
    });
    return res.json({ success: true, message: "Added to cart" });
    // } else {
    //   await cartModel.updateOne(
    //     {
    //       user_id: new ObjectId(userId),
    //       product_id: new ObjectId(id),
    //     },
    //     {
    //       $inc: { product_count: 1 },
    //     }
    //   );
    // }
  } catch (error) {
    console.log(error);
  }
};
export const updateFirstOrLastNameOrGender = async (req, res) => {
  try {
    const { userId, firstName, lastName, gender } = req.body;
    await userModel.updateOne(
      {
        _id: new ObjectId(userId),
      },
      {
        $set: {
          first_name: firstName,
          last_name: lastName,
          gender,
        },
      }
    );
    const user = await userModel.findOne({ _id: new ObjectId(userId) });
    res
      .status(201)
      .json({ success: true, user, message: "Updated successfully" });
  } catch (error) {
    console.log(error);
  }
};
let verifyEmailOtp;
export const updateEmailAddress = async (req, res) => {
  try {
    const { email, userId } = req.body;
    function generateOTP(length) {
      const characters = "0123456789";
      let result = "";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }
    let otp = generateOTP(6);
    verifyEmailOtp = otp;
    const sendEmail = async (email) => {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "vinudev2689@gmail.com",
          pass: "gqpe ihzw bxvv srhf",
        },
      });
      // async..await is not allowed in global scope, must use a wrapper
      async function main() {
        // send mail with defined transport object
        console.log(email);
        const info = await transporter.sendMail({
          from: "5G WORLD", // sender address
          to: email, // list of receivers
          subject: "Email verification", // Subject line
          text: "Hello world?", // plain text body
          html: `<b>ENTER OTP ${otp}</b>`, // html body
        });
      }
      // console.log("Message sent: %s", info.messageId);
      main().catch(console.error);
    };
    await sendEmail(email);
    res.status(200).json({ success: true, message: "OTP Sented successfully" });
  } catch (error) {
    console.log(error);
  }
};
export const verifyOtpForUpdateEmailAddress = async (req, res) => {
  try {
    const { userId, otp, email } = req.body;
    if (otp === verifyEmailOtp) {
      await userModel.updateOne(
        { _id: new ObjectId(userId) },
        {
          $set: {
            email,
          },
        }
      );
      const user = await userModel.findOne({ _id: new ObjectId(userId) });
      res.json({ success: true, user, message: "Email updated" });
    } else {
      res.json({ incorrectOtp: true, message: "Incorrect OTP" });
    }
  } catch (error) {
    console.log(error);
  }
};
export const getCartProductsData = async (req, res) => {
  try {
    const { userId } = req.body;
    const cartProducts = await cartModel.aggregate([
      {
        $match: {
          user_id: new ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $project: {
          product: { $arrayElemAt: ["$product", 0] },
          _id: 1,
          product_count: 1,
        },
      },
    ]);
    res.json({ success: true, cartProducts });
  } catch (error) {
    console.log(error);
  }
};
export const getCartSingleProductData = async (req, res) => {
  try {
    const { userId } = req.body;
    const { productId } = req.query;
    console.log(req.body);
    const productData = await cartModel.aggregate([
      {
        $match: {
          user_id: new ObjectId(userId),
          product_id: new ObjectId(productId),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $project: {
          product: { $arrayElemAt: ["$product", 0] },
          _id: 1,
          product_count: 1,
        },
      },
    ]);
    res.json({ success: true, productData });
  } catch (error) {
    console.log(error);
  }
};
export const getAddressData = async (req, res) => {
  try {
    const { userId } = req.body;
    const address = await addressModel.find({
      user_id: new ObjectId(userId),
    });
    if (address.length === 0) {
      res.json({ success: true, noAddress: true });
    } else {
      res.json({ success: true, address });
    }
  } catch (error) {
    console.log(error);
  }
};
export const decrementQuantity = async (req, res) => {
  try {
    let { productId, userId } = req.body;
    await cartModel.updateOne(
      {
        user_id: new ObjectId(userId),
        product_id: new ObjectId(productId),
      },
      {
        $inc: { product_count: -1 },
      }
    );
    res.json({ success: true, message: "Product decremented" });
  } catch (error) {
    console.log(error);
  }
};
export const incrementQuantity = async (req, res) => {
  try {
    let { productId, userId } = req.body;
    await cartModel.updateOne(
      {
        user_id: new ObjectId(userId),
        product_id: new ObjectId(productId),
      },
      {
        $inc: { product_count: 1 },
      }
    );
    res.json({ success: true, message: "Product incremented" });
  } catch (error) {
    console.log(error);
  }
  0;
};
export const removeFromCart = async (req, res) => {
  try {
    const { productId, userId } = req.body;
    await cartModel.deleteOne({
      user_id: userId,
      product_id: productId,
    });
    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.log(error);
  }
};
export const getAllProducts = async (req, res) => {
  try {
    const data = await productModel.find({});
    res.json({ success: true, products: data });
  } catch (error) {
    console.log(error);
  }
};
export const applyCoupon = async (req, res) => {
  try {
    let { couponCode, amount } = req.body;
    const data = await coupenModel.findOne({ code: couponCode.toUpperCase() });
    if (data === null) {
      return res.json({ invalidCoupon: true, message: "Invalid coupon" });
    }
    let date = data.expiry_date;
    let minimumPurchaseAmount = data.min_amount;
    if (minimumPurchaseAmount >= amount) {
      return res.json({
        success: false,
        message: `Minimum purchase amount ${minimumPurchaseAmount} rupees`,
      });
    }
    let discount = data.discount;
    let maximumDiscout = data.max_discount;
    discount = parseInt(discount);
    let expDate = new Date(date).getTime();
    let currentDate = new Date().getTime();
    if (currentDate <= expDate) {
      let totalAmount = ((amount / 100) * discount).toFixed(0);
      if (totalAmount > maximumDiscout) {
        totalAmount = maximumDiscout;
        res.json({
          success: true,
          discount: totalAmount,
          message: "Coupon applied",
        });
      } else {
        res.json({
          success: true,
          discount: totalAmount,
          message: "Coupon applied",
        });
      }
    } else {
      res.json({ couponExp: true, message: "Sorry Coupon Expired" });
    }
  } catch (error) {
    console.log(error);
  }
};
export const addAddress = async (req, res) => {
  let { addressData, userId } = req.body;
  let { name, mobileNumber, pincode, place, district, state, address } =
    addressData;
  await addressModel.create({
    user_id: userId,
    name: name,
    address: address,
    state: state,
    mobile_number: mobileNumber,
    pincode,
    place,
    district,
  });
  res.json({ success: true, message: "Address added successfully" });
};
export const updatePassword = async (req, res) => {
  try {
    console.log(req.body.userId);
    let { newPassword, oldPassword } = req.body.password;
    const userData = await userModel.findOne({
      _id: new ObjectId(req.body.userId),
    });
    if (userData.password === undefined) {
      console.log(req.body.password);
      newPassword = await bcrypt.hash(newPassword, 12);
      await userModel.updateOne(
        {
          _id: new ObjectId(req.body.userId),
        },
        {
          $set: {
            password: newPassword,
          },
        }
      );
      res.json({ success: true, message: "Password Updated Successfully" });
    } else {
      let correct = await bcrypt.compare(oldPassword, userData.password);
      console.log(correct);
      if (correct) {
        newPassword = await bcrypt.hash(newPassword, 12);
        await userModel.updateOne(
          {
            _id: new ObjectId(req.body.userId),
          },
          {
            $set: {
              password: newPassword,
            },
          }
        );
        res.json({ success: true, message: "Password Updated Successfully" });
      } else {
        res.json({
          success: false,
          passwordError: true,
          message: "Old Password Is Incorrect",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
export const updateAddress = async (req, res) => {
  try {
    const { addressId, addressData } = req.body;
    await addressModel.updateOne(
      { _id: new ObjectId(addressId) },
      {
        $set: {
          first_name: addressData.firstName,
          last_name: addressData.lastName,
          email: addressData.email,
          phone_number: addressData.phoneNumber,
          address: addressData.address,
          pincode: addressData.pincode,
          district: addressData.district,
          place: addressData.place,
          state: addressData.state,
        },
      }
    );
    res.json({ success: true, message: "Address updated successfully" });
  } catch (error) {
    console.log(error);
  }
};
export const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.body;
    await addressModel.deleteOne({ _id: new ObjectId(addressId) });
    res.json({ success: true, message: "Address deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
export const getReferralData = async (req, res) => {
  try {
    const referralData = await userModel
      .findOne({ _id: new ObjectId(req.body.userId) })
      .select("referral_code")
      .select("referrals");
    let length = referralData.referrals.length;
    res.json({ success: true, referralData, totalReferrals: length });
  } catch (error) {
    console.log(error);
  }
};
export const getOrderDetails = async (req, res) => {
  try {
    const orderdata = await orderModel.aggregate([
      {
        $match: {
          _id: new ObjectId(req.query.orderId),
        },
      },
      {
        $lookup: {
          from: "addresses",
          localField: "address_id",
          foreignField: "_id",
          as: "address",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          address: { $arrayElemAt: ["$address", 0] },
          user: { $arrayElemAt: ["$user", 0] },
          _id: 1,
          user_id: 1,
          date: 1,
          address_id: 1,
          payment_status: 1,
          payment_method: 1,
          order_status: 1,
          after_discount: 1,
          discount_price: 1,
          products: 1,
        },
      },
    ]);
    res.json({ success: true, orderdata });
  } catch (error) {
    console.log(error);
  }
};
export const getBookingList = async (req, res) => {
  try {
    const bookingList = await orderModel.aggregate([
      {
        $match: {
          user_id: new ObjectId(req.body.userId),
        },
      },
      {
        $lookup: {
          from: "addresses",
          localField: "address_id",
          foreignField: "_id",
          as: "address",
        },
      },
      {
        $project: {
          address: { $arrayElemAt: ["$address", 0] },
          _id: 1,
          after_discount_final_amount: 1,
          date: 1,
          products: 1,
          order_status: 1,
        },
      },
    ]);
    res.json({ success: true, bookingList });
  } catch (error) {
    console.log(error);
  }
};
export const getBookedDetail = async (req, res) => {
  try {
    console.log(req.query.orderId);
    const data = await orderModel.findOne({
      user_id: new ObjectId(req.body.userId),
    });

    res.json({ success: true, bookedProduct: data });
  } catch (error) {
    console.log(error);
  }
};
export const addReviewRating = async (req, res) => {
  try {
    const { review, rating, userId, productId } = req.body;
    await reviewAndRating.create({
      user_id: userId,
      product_id: productId,
      rating,
      review,
    });
    const allReviewRatings = await reviewAndRating.find({
      product_id: productId,
    });
    let average = allReviewRatings.reduce((acc, data) => {
      return acc + data.rating / allReviewRatings.length;
    }, 0);
    await productModel.updateOne(
      { _id: new ObjectId(productId) },
      {
        $set: {
          rating: average.toFixed(1),
          totalReviewRating: allReviewRatings.length,
        },
      }
    );
    res.status(201).json({
      success: true,
      message: "Thank you so much. Your review has been saved.",
    });
  } catch (error) {
    console.log(error);
  }
};
export const getReviewrating = async (req, res) => {
  try {
    const { productId } = req.query;
    const reviewRatings = await reviewAndRating.aggregate([
      {
        $match: {
          product_id: new ObjectId(productId),
        },
      },
    ]);
    res.status(200).json({ success: true, reviewRatings });
  } catch (error) {
    console.log(error);
  }
};
export const getCoupons = async (req, res) => {
  try {
    const coupons = await coupenModel.find({});
    res.json({ success: true, coupons });
  } catch (error) {
    console.log(error);
  }
};
