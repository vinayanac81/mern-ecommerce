import cartModel from "../model/cartModel.js";
import orderModel from "../model/orderModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import Razorpay from "razorpay";
import dotenv from "dotenv";
import productModel from "../model/productModel.js";
import crypto from "crypto";
export const order = async (req, res) => {
  try {
    const {
      product,
      userId,
      totalPrice,
      discount,
      address,
      paymentDetails,
      arr,
    } = req.body;
    let { cod, online, wallet } = paymentDetails;
    console.log(req.body);
    let currentDate = new Date(new Date(new Date()).setUTCHours(0, 0, 0, 0));
    if (cod === true) {
      if (arr === false) {
        await orderModel.create({
          user_id: userId,
          address_id: address,
          total_price: totalPrice,
          date: currentDate,
          discount_price: discount,
          after_discount_final_amount: totalPrice - discount,
          products: [product],
          order_status: "placed",
          payment_status: "pending",
          payment_method: "COD",
        });
        await cartModel.deleteOne({
          user_id: new ObjectId(userId),
          product_id: new ObjectId(product?.product?._id),
        });
        await productModel.updateOne(
          { _id: new ObjectId(product.product._id) },
          {
            $inc: { stock: -product.product_count },
          }
        );
        const cart = await cartModel.find({ user_id: new ObjectId(userId) });

        res.json({ success: true, cart: cart.length });
      } else {
        await orderModel.create({
          user_id: userId,
          address_id: address,
          total_price: totalPrice,
          date: currentDate,
          discount_price: discount,
          after_discount_final_amount: totalPrice - discount,
          products: product,
          order_status: "placed",
          payment_status: "pending",
          payment_method: "COD",
        });
        await cartModel.deleteMany({
          user_id: userId,
        });
        product.forEach(async (item) => {
          await productModel.updateOne(
            { _id: new ObjectId(item.product._id) },
            {
              $inc: { stock: -item.product_count },
            }
          );
        });
        res.json({ success: true, cart: 0 });
      }
    } else {
      let instance = new Razorpay({
        key_id: process.env.KEY_ID,
        key_secret: process.env.KEY_SECRET,
      });
      let options = {
        amount: (totalPrice - discount) * 100,
        currency: "INR",
      };
      instance.orders.create(options, (err, order) => {
        if (err) {
          console.log(err);
          return res.send({ code: 500, message: "Server Error" });
        }
        return res.send({
          code: 200,
          message: "order created",
          data: order,
          success: true,
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const createOrder = async (req, res) => {
  try {
    let { userId, product, orderId, arr, totalPrice, discount, address } =
      req.body;
    console.log(req.body);
    let currentDate = new Date(new Date(new Date()).setUTCHours(0, 0, 0, 0));
    if (arr === false) {
      await orderModel.create({
        order_id: orderId,
        user_id: userId,
        total_price: totalPrice,
        date: currentDate,
        products: [product],
        discount_price: discount,
        after_discount_final_amount: totalPrice - discount,
        address_id: address,
        order_status: "payment pending",
        payment_status: " pending",
        payment_method: "ONLINE",
      });
      res.status(200).json({ success: true, message: "success" });
    } else {
      await orderModel.create({
        order_id: orderId,
        user_id: userId,
        total_price: totalPrice,
        date: currentDate,
        products: product,
        discount_price: discount,
        after_discount_final_amount: totalPrice - discount,
        address_id: address,
        order_status: "payment pending",
        payment_status: "pending",
        payment_method: "ONLINE",
      });
      res.status(200).json({ success: true, message: "success" });
    }
  } catch (error) {
    console.log(error);
  }
};
export const verify = async (req, res) => {
  try {
    let {
      userId,
      product,
      response,
      orderId,
      arr,
      totalPrice,
      discount,
      address,
    } = req.body;
    const body =
      response.razorpay_order_id + "|" + response.razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(body.toString())
      .digest("hex");
    if (expectedSignature === req.body.response.razorpay_signature) {
      if (arr === false) {
        await orderModel.updateOne(
          { order_id: response.razorpay_order_id },
          {
            $set: {
              order_status: "placed",
              payment_status: "success",
            },
          }
        );
        await cartModel.deleteOne({
          user_id: new ObjectId(userId),
          product_id: new ObjectId(product?.product?._id),
        });
        await productModel.updateOne(
          { _id: new ObjectId(product.product._id) },
          {
            $inc: { stock: -product.product_count },
          }
        );
        const cart = await cartModel.find({ user_id: req.body.userId });
        res.json({
          success: true,
          cart: cart.length,
          message: "Payment successfull",
        });
      } else {
        await cartModel.deleteMany({
          user_id: userId,
        });
        await orderModel.updateOne(
          { order_id: response.razorpay_order_id },
          {
            $set: {
              order_status: "placed",
              payment_status: "success",
            },
          }
        );

        product.forEach(async (item) => {
          await productModel.updateOne(
            { _id: new ObjectId(item.product._id) },
            {
              $inc: { stock: -item.product_count },
            }
          );
        });
        res.json({ success: true, cart: 0 });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
