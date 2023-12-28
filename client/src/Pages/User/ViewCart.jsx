import { useEffect, useState } from "react";
import { Header } from "../../Components/User/Header";
import AxiosUserInstance from "./AxiosUserInstance";
import { BaseUrl } from "../../Constants";
import { FaPlus } from "react-icons/fa6";
import g from "../../assets/5G.png";
import { FaRupeeSign } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
export const ViewCart = () => {
  const [cartProductsData, setcartProductsData] = useState([]);
  const [noAddressFound, setNoAddressFound] = useState(false);
  const [addressData, setAddressData] = useState([]);
  const [cartPageData, setCartPageData] = useState({
    totalPrice: 0,
    totalProducts: 0,
    discountPrice: 0,
    afterDiscount: 0,
  });
  useEffect(() => {
    getInitialData();
  }, []);
  const getInitialData = async () => {
    try {
      const cartProducts = await AxiosUserInstance.get("/getCartProductsData");
      const address = await AxiosUserInstance.get("/getAddressData");
      console.log(cartProducts);
      if (address?.data?.success) {
        if (address?.data?.noAddress) {
          setNoAddressFound(true);
        } else {
          setNoAddressFound(false);
          setAddressData(address?.data?.address);
        }
      }
      if (cartProducts.data.success) {
        setcartProductsData(cartProducts.data.cartProducts);
        const totalOriginalPrice = cartProducts.data.cartProducts.reduce(
          (acc, curr) =>
            acc + curr.product?.original_price * curr.product_count,
          0
        );
        const totalDiscountPrice = cartProducts.data.cartProducts.reduce(
          (acc, curr) =>
            acc +
            (curr.product?.original_price - curr.product?.offer_price) *
              curr.product_count,
          0
        );
        const totalAfterDiscount = cartProducts.data.cartProducts.reduce(
          (acc, curr) => acc + curr.product?.offer_price * curr.product_count,
          0
        );
        setCartPageData({
          ...cartPageData,
          totalProducts: cartProducts?.data?.cartProducts.length,
          totalPrice: totalOriginalPrice,
          discountPrice: totalDiscountPrice,
          afterDiscount: totalAfterDiscount,
        });
      }
    } catch (error) {
      console.log(error);
      if (
        error?.response?.data?.message === "unauthorized user" ||
        error?.response?.data?.message === "Unauthorized"
      ) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("cart");
        location.reload();
        toast.error("Please login");
      }
    }
  };
  const decrementCount = async (productId) => {
    try {
      const { data } = await AxiosUserInstance.post("/decrementQuantity", {
        productId,
      });
      console.log(data);
      if (data.success) {
        getInitialData();
        toast.success(data?.message);
      }
    } catch (error) {
      console.log(error);
      if (
        error?.response?.data?.message === "unauthorized user" ||
        error?.response?.data?.message === "Unauthorized"
      ) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("cart");
        location.reload();
        toast.error("Please login");
      }
    }
  };
  const incrementCount = async (productId, count, stock, productName) => {
    try {
      console.log(productId, count, stock, productName);
      if (count >= stock) {
        toast.error(`${productName}... - Only ${stock} Piece left`);
      } else {
        const { data } = await AxiosUserInstance.post("/incrementQuantity", {
          productId,
        });
        if (data.success) {
          getInitialData();
          toast.success(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      if (
        error?.response?.data?.message === "unauthorized user" ||
        error?.response?.data?.message === "Unauthorized"
      ) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("cart");
        location.reload();
        toast.error("Please login");
      }
    }
  };
  const removeFromCart = async (productId) => {
    try {
      const { data } = await AxiosUserInstance.post("/removeFromCart", {
        productId,
      });
      if (data.success) {
        getInitialData();
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Header />
      <div className="bg-gray-300 pt-6 h-screen px-40">
        <div className="gap-3 flex">
          {cartProductsData.length > 0 && (
            <>
              <div className="w-[70%]">
                {noAddressFound ? (
                  <div className="bg-blue-600 flex mb-2 justify-center items-center gap-2  uppercase font-bold text-center text-white py-6 px-10">
                    <span className="text-lg font-bold">
                      <FaPlus />
                    </span>{" "}
                    add address
                  </div>
                ) : (
                  ""
                )}
                <div
                  style={{
                    height: cartProductsData.length === 1 ? "14rem" : "28rem",
                    overflowY: cartProductsData.length < 3 && "hidden",
                    overflowX: "hidden",
                  }}
                  className={`${
                    cartProductsData.length < 3 && "overflow-y-scroll"
                  } `}
                >
                  {cartProductsData.map((item, index) => {
                    return (
                      <div key={index} className="">
                        <div className="bg-white mt- flex py-6 border-2 border-b shadow-md px-10">
                          <div className="w-[20%]">
                            <div className="w-28 h-28">
                              <img
                                src={`${BaseUrl}/images/${item?.product?.image}`}
                                alt=""
                              />
                            </div>
                            <div className="flex justify-between pr-8 mt-6 mb-4">
                              <div
                                onClick={() => {
                                  item?.product_count === 1
                                    ? ""
                                    : decrementCount(item?.product?._id);
                                }}
                                className={` flex justify-center items-center text-blue-600 text-sm w-6 rounded-full outline ${
                                  item?.product_count === 1
                                    ? "outline-gray-200"
                                    : "cursor-pointer outline-gray-400"
                                }  shadow-2xl`}
                              >
                                <FaMinus />
                              </div>
                              <div className=" w-12 outline font-semibold text-blue-600 outline-2 text-center outline-gray-400">
                                {item?.product_count}
                              </div>
                              <div
                                onClick={() => {
                                  incrementCount(
                                    item?.product?._id,
                                    item?.product_count,
                                    item?.product?.stock,
                                    item?.product?.product_name
                                  );
                                }}
                                className="cursor-pointer flex justify-center items-center text-blue-600 text-sm w-6 rounded-full outline outline-gray-400 shadow-2xl"
                              >
                                <FaPlus />
                              </div>
                            </div>
                          </div>
                          <div className="w-[80%]">
                            <div className=" flex justify-between">
                              <h2 className="font-extrabold">
                                {item?.product?.product_name}
                              </h2>
                              <img src={g} className="w-5" alt="" />
                            </div>

                            <h2 className="text-gray-500 pt-1 font-semibold">
                              {item?.product?.ram} | {item?.product?.rom}
                            </h2>
                            <div className="flex gap-5">
                              <span
                                style={{ textDecoration: "line-through" }}
                                className="flex items-center text-gray-700 font-semibold"
                              >
                                <span className="text-sm">
                                  <FaRupeeSign />
                                </span>
                                {item?.product?.original_price}{" "}
                              </span>
                              <span className="flex items-center text-black font-extrabold ">
                                <span className="text-sm">
                                  <FaRupeeSign />
                                </span>
                                {item?.product?.offer_price}{" "}
                              </span>
                              <span className="text-emerald-600 font-bold">
                                {100 -
                                  Math.round(
                                    (item?.product?.offer_price /
                                      item?.product?.original_price) *
                                      100
                                  )}
                                % Off
                              </span>
                            </div>
                            <div className="pt-1">
                              {item?.product?.stock > 0 ? (
                                <div className="w-24 uppercase text-sm font-semibold  bg-blue-600 text-center py-1 rounded text-white">
                                  In Stock
                                </div>
                              ) : (
                                <div className="w-24 uppercase text-sm font-semibold  bg-red-600 text-center py-1 rounded text-white">
                                  Out of stock
                                </div>
                              )}
                            </div>
                            <div className="mt-4 flex gap-4">
                              <button
                                onClick={() =>
                                  removeFromCart(item?.product?._id)
                                }
                                className="border-2  font-semibold hover:border-blue-600 text-blue-600 px-4 py-2"
                              >
                                Remove
                              </button>
                              <Link to={`/checkout/${item?.product?._id}`}>
                                <button className="border-2  font-semibold hover:border-orange-500 text-orange-500 px-4 py-2">
                                  Buy Now
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="bg-white flex items-center justify-end pr-10 border-t-4 h-20">
                  <div className=" ">
                    <Link to={"/checkout"}>
                      <button className="uppercase bg-orange-600 font-semibold px-12 py-3 text-white ">
                        Place order
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="w-[30%] bg-white h-64  ">
                <h2 className="uppercase py-4 px-6 text-gray-500 border-b font-extrabold">
                  Price details
                </h2>
                <div className="flex justify-between">
                  <h2 className="px-6 py-4 text-gray-500 font-semibold">
                    Price ({cartPageData.totalProducts} items)
                  </h2>
                  <h2 className="py-4 flex items-center px-6 text-gray-500 font-semibold">
                    <span className="text-sm">
                      {" "}
                      <FaRupeeSign />{" "}
                    </span>{" "}
                    {cartPageData.totalPrice}
                  </h2>
                </div>
                <div className="flex justify-between">
                  <h2 className="px-6 pb-2 text-gray-500 font-semibold">
                    Discount
                  </h2>
                  <h2 className="py- flex items-center  px-6 text-emerald-600 font-semibold">
                    -{" "}
                    <span className="text-sm">
                      <FaRupeeSign />{" "}
                    </span>
                    {cartPageData.discountPrice}
                  </h2>
                </div>
                <div className="flex justify-between pb-2 border-b-2 mx-6 ">
                  <h2 className="px- py-2 text-gray-500 font-semibold">
                    Delivery Charges
                  </h2>
                  <h2 className="py-2 flex items-center   px- text-gray-600 font-semibold">
                    <span className="text-sm">
                      <FaRupeeSign />
                    </span>
                    <span style={{ textDecoration: "line-through" }}>100</span>

                    <span className="pl-2  text-emerald-600">Free</span>
                  </h2>
                </div>
                <div className="pt-4 px-6">
                  <div className="flex justify-between items-center pb-4 ">
                    <h2 className="font-extrabold">Total Amount </h2>
                    <div className="flex items-center">
                      {" "}
                      <span className="text-sm">
                        <FaRupeeSign />
                      </span>
                      <span className="font-extrabold">
                        {cartPageData.afterDiscount}
                      </span>
                    </div>{" "}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
