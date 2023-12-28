import { useDispatch, useSelector } from "react-redux";
import { IoMdCheckmark } from "react-icons/io";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import AxiosUserInstance from "./AxiosUserInstance";
import { Header } from "../../Components/User/Header";
import { BaseUrl } from "../../Constants";
import { setUserCart } from "../../Toolkit/UserSlice";
const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.user);
  const [address, setaddress] = useState([]);
  const [addressSelected, setaddressSelected] = useState(0);
  const [totalPrice, settotalPrice] = useState(0);
  const [discount, setdiscount] = useState(0);
  const [changeAddress, setchangeAddress] = useState(false);
  const [radioButtonSelected, setradioButtonSelected] =
    useState(addressSelected);
  const [showOrderSummery, setshowOrderSummery] = useState(true);
  const [product, setproduct] = useState({});
  const [paymentOptions, setpaymentOptions] = useState(false);
  const [paymentDetails, setpaymentDetails] = useState({
    cod: false,
    online: false,
    wallet: false,
  });
  const [couponCode, setcouponCode] = useState("");
  const [discountAvailable, setdiscountAvailable] = useState(false);
  console.log(product);
  useEffect(() => {
    getInitialData();
  }, []);
  const getInitialData = async () => {
    try {
      const addressData = await AxiosUserInstance.get("/getAddressData");
      const productData = await AxiosUserInstance.get(
        "/getCartSingleProductData",
        {
          params: { productId: id },
        }
      );
      console.log(productData);
      if (addressData?.data?.success) {
        setaddress(addressData?.data?.address);
      }
      if (productData?.data?.success) {
        setproduct(productData?.data?.productData[0]);
        settotalPrice(
          productData?.data?.productData[0]?.product?.offer_price *
            productData?.data?.productData[0]?.product_count
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const decrementCount = async (productId) => {
    try {
      const { data } = await AxiosUserInstance.post("/decrementQuantity", {
        productId,
      });
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
  const handleCoupon = async () => {
    try {
      const { data } = await AxiosUserInstance.post("/applyCoupon", {
        couponCode,
        amount: totalPrice,
      });
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        setdiscountAvailable(true);
        setdiscount(data.discount);
      } else if (data.invalidCoupon) {
        toast.error(data?.message);
      } else if (data.couponExp) {
        toast.error(data?.message);
      } else if (data.success === false) {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOpenRazorpay = async (data) => {
    let token;
    const options = {
      key: "rzp_test_mn6BBcws8w4dnR",
      amount: Number(data.amount),
      currency: data.currency,
      name: "5G WORLD",
      description: "Nothing",
      order_id: data.id,
      handler: async (response) => {
        token = localStorage.getItem("token");
        await AxiosUserInstance.post("/payment/createOrder", {
          product,
          totalPrice,
          discount,
          paymentDetails,
          arr: false,
          address: address[addressSelected]._id,
          orderId: response.razorpay_order_id,
        }).then(async (res) => {
          if (res.data.success) {
            console.log(res.data);
            token = localStorage.getItem("token");
            await AxiosUserInstance.post("/payment/verify", {
              response,
              product,
              totalPrice,
              discount,
              paymentDetails,
              arr: false,
              address: address[addressSelected]._id,
            }).then((result) => {
              if (result.data.success) {
                if (result.data.cart === null) {
                  toast.success("Payment successfully");
                  localStorage.setItem("cart", 0);
                  dispatch(setUserCart(0));
                  navigate("/order-success", { state: { method: "ONLINE" } });
                } else {
                  toast.success("Payment successfully");
                  localStorage.setItem("cart", data?.cart?.cart_count);
                  dispatch(setUserCart(data?.cart?.cart_count));
                  navigate("/order-success", { state: { method: "ONLINE" } });
                }
              } else {
                toast.error(result.data.message);
              }
            });
          } else {
            toast.error("something error");
          }
        });
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  const handleOrder = async (e) => {
    try {
      e.preventDefault();
      window.scrollTo(0, 0);
      if (paymentDetails.cod) {
        const { data } = await AxiosUserInstance.post("/payment/order", {
          product,
          totalPrice,
          discount,
          paymentDetails,
          arr: false,
          address: address[addressSelected]._id,
        });
        console.log(data);
        if (data.success) {
          if (data.cart === 0) {
            toast.success("Order successfully");
            localStorage.setItem("cart", 0);
            dispatch(setUserCart(0));
            navigate("/order-success", { state: { method: "COD" } });
          } else {
            toast.success("Order successfully");
            localStorage.setItem("cart", data?.cart);
            dispatch(setUserCart(data?.cart));
            navigate("/order-success", { state: { method: "COD" } });
          }
        }
      } else if (paymentDetails.online) {
        const { data } = await AxiosUserInstance.post("/payment/order", {
          product,
          totalPrice,
          discount,
          paymentDetails,
          arr: false,
          address: address[addressSelected]._id,
        });
        if (data.success) {
          handleOpenRazorpay(data.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Header />
      <div
        style={{ backgroundColor: "#f0f0f0" }}
        className=" pt-6 px-5 pb-10  md:px-40"
      >
        <div className="gap-5 flex">
          <div className="w-[70%] flex flex-col gap-5">
            {/* Login */}
            <div
              style={{
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
              className="w-full px-10 py-4 bg-white h-20"
            >
              <div className="">
                <div className="flex items-center gap-3">
                  <h2 className="bg-gray-300 w-5 rounded-sm text-blue-600 text-center">
                    1
                  </h2>
                  <h2 className="uppercase text-gray-400 font-semibold ">
                    Login
                  </h2>
                  <span className="text-blue-600 ">
                    <IoMdCheckmark />
                  </span>
                </div>
                <div className="flex px-8 gap-5 items-center mt-1 font-semibol text-slate-600">
                  <h2>
                    {userDetails.first_name.charAt(0).toUpperCase() +
                      userDetails.first_name.slice(1)}{" "}
                    {userDetails.last_name}
                  </h2>
                  <h2>{userDetails.email}</h2>
                </div>
              </div>
            </div>
            {/* Address */}
            <div
              style={{
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
              className="w-full  bg-white "
            >
              {changeAddress ? (
                <div>
                  <div className="flex px-10 py-4 bg-blue-600 justify-between gap-3">
                    <div className="flex  items-center gap-3">
                      <h2 className="bg-white w-5 rounded-sm text-blue-600 text-center">
                        2
                      </h2>
                      <h2 className="uppercase text-white font-semibold ">
                        Delivery Address
                      </h2>
                    </div>
                  </div>
                  <div className="">
                    {address.map((data, index) => {
                      console.log(index, radioButtonSelected);
                      return (
                        <div key={index} className="py-4 flex px-10">
                          <div className="  w-[70%]">
                            <div className="flex items-center gap-3">
                              <input
                                onChange={() => setradioButtonSelected(index)}
                                type="radio"
                                className="w-4"
                                name=""
                                checked={
                                  index === radioButtonSelected ? true : false
                                }
                                id=""
                                value={radioButtonSelected}
                              />

                              <h2 className="text-slate-500 font-semibold">
                                {data?.name}
                              </h2>
                              <div className="bg-gray-300 px-2 text-sm py-1 rounded-sm text-gray-500">
                                Home
                              </div>
                              <h2 className="text-slate-500 font-semibold">
                                {data?.mobile_number}
                              </h2>
                            </div>
                            <div className="mt-2 flex flex-wrap px-7 gap-1 text-slate-500 text-sm font-semibold">
                              <span>{data?.address}, </span>
                              <span>
                                {data?.place} {data?.district}
                              </span>{" "}
                              District,
                              <span>{data?.state} - </span>
                              <span className="text-slate-700 font-semibold">
                                {data?.pincode}{" "}
                              </span>
                            </div>
                            {index === radioButtonSelected && (
                              <>
                                {" "}
                                <div className="px-7 mt-3 font-semibold">
                                  <button className="bg-orange-500 uppercase text-white px-10 py-2 rounded-sm">
                                    Deliver here
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                          <div className="flex w-[30%] justify-end">
                            {index === radioButtonSelected && (
                              <button className="uppercase text-blue-600 font-semibold ">
                                Edit
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="pb-4">
                  <div className="flex px-10 pt-4 justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <h2 className="bg-gray-300 w-5 rounded-sm text-blue-600 text-center">
                        2
                      </h2>
                      <h2 className="uppercase  text-gray-400 font-semibold ">
                        Delivery Address
                      </h2>
                      <span className="text-blue-600 ">
                        <IoMdCheckmark />
                      </span>
                    </div>
                    <div className="">
                      <button
                        onClick={() => {
                          setchangeAddress(true);
                          setshowOrderSummery(false);
                        }}
                        className="uppercase bg-white border-2 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white hover:border-2 hover:border-blue-600 py-2 px-6 rounded-sm"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                  <div
                    style={{ paddingLeft: "74px" }}
                    className="  w-[80%]  gap- items-center mt-1  text-gray-400"
                  >
                    <span className="text-gray-600">
                      {" "}
                      {address[addressSelected]?.name}
                    </span>
                    <h2 className="flex">
                      {" "}
                      {address[addressSelected]?.address},{" "}
                      {address[addressSelected]?.place}{" "}
                      {address[addressSelected]?.district} District,
                      {address[addressSelected]?.state} -{" "}
                      <span className="text-gray-600 pl-1">
                        {" "}
                        {address[addressSelected]?.pincode}
                      </span>
                    </h2>
                  </div>
                </div>
              )}
            </div>
            {/* ORDER SUMMERY */}
            <div
              style={{
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
            >
              <div
                className={`${
                  showOrderSummery ? "bg-blue-600 " : "bg-white"
                } py-4 px-10`}
              >
                <div className="flex   justify-between">
                  <div className="flex gap-3">
                    <h2
                      className={`${
                        showOrderSummery ? "bg-white" : "bg-gray-300"
                      } w-5 h-6 rounded-sm text-blue-600 text-center`}
                    >
                      3
                    </h2>
                    <h2
                      className={`uppercase ${
                        showOrderSummery ? "text-white" : "text-gray-400"
                      }  font-semibold `}
                    >
                      order summery
                    </h2>
                  </div>
                  {showOrderSummery === false && (
                    <div className="">
                      <button
                        onClick={() => {
                          setpaymentOptions(false);
                          setshowOrderSummery(true);
                        }}
                        className="uppercase text-blue-600 font-semibold border-2 px-6 py-2"
                      >
                        Change
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {showOrderSummery && (
                <>
                  {" "}
                  <div className="  bg-white ">
                    <div className="flex px-10 py-4 border-b-2 pb-8">
                      <div className="w-[20%] flex-wrap">
                        <div className="w-28 h-28  mx-auto">
                          <img
                            src={`${BaseUrl}/images/${product?.product?.image}`}
                            alt=""
                          />
                        </div>
                        <div className="flex mx-auto justify-between mt-3 ">
                          <div
                            onClick={() => {
                              product?.product_count === 1
                                ? ""
                                : decrementCount(product?.product?._id);
                            }}
                            className={` flex justify-center items-center text-blue-600 text-sm w-6 rounded-full outline ${
                              product?.product_count === 1
                                ? "outline-gray-200"
                                : "cursor-pointer outline-gray-400"
                            }  shadow-2xl`}
                          >
                            <FaMinus />
                          </div>
                          <div className=" w-12 outline font-semibold text-blue-600 outline-2 text-center outline-gray-400">
                            {product?.product_count}
                          </div>
                          <div
                            onClick={() => {
                              incrementCount(
                                product?.product?._id,
                                product?.product_count,
                                product?.product?.stock,
                                product?.product?.product_name
                              );
                            }}
                            className="cursor-pointer flex justify-center items-center text-blue-600 text-sm w-6 rounded-full outline outline-gray-400 shadow-2xl"
                          >
                            <FaPlus />
                          </div>
                        </div>
                      </div>
                      <div className="w-[60%] px-5">
                        <h2 className="font-extrabold">
                          {product?.product?.product_name}
                        </h2>
                        <div className="flex mt-2 gap-5 text-slate-600">
                          <h2>{product?.product?.ram}</h2>
                          <h2>{product?.product?.rom}</h2>
                        </div>
                        <div className="flex gap-4 mt-2">
                          <span
                            style={{ textDecoration: "line-through" }}
                            className="flex items-center text-gray-700 "
                          >
                            <span className="text-sm">
                              <FaRupeeSign />
                            </span>
                            {product?.product?.original_price}{" "}
                          </span>
                          <span className="flex items-center text-black font-bold ">
                            <span className="text-sm">
                              <FaRupeeSign />
                            </span>
                            {product?.product?.offer_price}{" "}
                          </span>
                          <span className="text-emerald-600 ">
                            {100 -
                              Math.round(
                                (product?.product?.offer_price /
                                  product?.product?.original_price) *
                                  100
                              )}
                            % Off
                          </span>
                        </div>
                        <div className="flex   bg-blac">
                          <button
                            onClick={() =>
                              removeFromCart(product?.product?._id)
                            }
                            className="uppercase font-bold pt-9"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="w-[20%] flex-wrap">
                        <h2 className="text-sm text-slate-500">
                          Delivery by Tommorrow
                        </h2>
                        <span className="text-emerald-600 text-sm font-semibold">
                          Free delivery
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end px-8 py-4">
                    <button
                      onClick={() => {
                        setshowOrderSummery(false);
                        setpaymentOptions(true);
                      }}
                      className="uppercase  bg-orange-500 px-14 py-2 text-white"
                    >
                      CONTInue
                    </button>
                  </div>
                </>
              )}
            </div>
            {/* PAYMENT OPTIONS */}
            <div
              style={{
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
            >
              <div
                className={`${
                  paymentOptions ? "bg-blue-600 " : "bg-white"
                } py-4 px-10`}
              >
                <div className="flex   gap-3">
                  <h2
                    className={`${
                      paymentOptions ? "bg-white" : "bg-gray-300"
                    } w-5 rounded-sm text-blue-600 text-center`}
                  >
                    4
                  </h2>
                  <h2
                    className={`uppercase ${
                      paymentOptions ? "text-white" : "text-gray-400"
                    }  font-semibold `}
                  >
                    Payment options
                  </h2>
                </div>
              </div>
              {paymentOptions && (
                <div className="py-4 px-10">
                  <div className="flex pb-2 items-center gap-4">
                    <input
                      type="radio"
                      checked={paymentDetails.online}
                      className="w-4 "
                      onChange={() =>
                        setpaymentDetails({
                          ...paymentDetails,
                          online: true,
                          wallet: false,
                          cod: false,
                        })
                      }
                      name=""
                      id=""
                    />
                    <span className="font-semibold text-slate-600">
                      ONLINE{" "}
                    </span>
                  </div>
                  <div className="flex items-center pb-2 gap-4">
                    <input
                      onChange={() =>
                        setpaymentDetails({
                          ...paymentDetails,
                          online: false,
                          wallet: false,
                          cod: true,
                        })
                      }
                      checked={paymentDetails.cod}
                      type="radio"
                    />
                    <span className="font-semibold text-slate-600">
                      CASH ON DELIVERY{" "}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      onChange={() =>
                        setpaymentDetails({
                          ...paymentDetails,
                          online: false,
                          wallet: true,
                          cod: false,
                        })
                      }
                      type="radio"
                      checked={paymentDetails.wallet}
                    />
                    <span className="font-semibold text-slate-600">
                      WALLET{" "}
                    </span>
                  </div>
                  <div className="mt-3">
                    <button
                      onClick={handleOrder}
                      className="uppercase rounded-sm bg-orange-500 px-10 py-2 text-white font-bold"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-[30%] h-80 bg-whit flex flex-col gap-5">
            <div
              style={{
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
              className=" bg-white h-64  "
            >
              <h2 className="uppercase py-4 px-6 text-gray-500 border-b font-extrabold">
                Price details
              </h2>
              <div className="flex justify-between">
                <h2 className="px-6 py-4 text-gray-500 font-semibold">Price</h2>
                <h2 className="py-4 flex items-center px-6 text-gray-500 font-semibold">
                  <span className="text-sm">
                    {" "}
                    <FaRupeeSign />{" "}
                  </span>{" "}
                  {totalPrice}
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
                  {discount}
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
                      {totalPrice - discount}
                    </span>
                  </div>{" "}
                </div>
              </div>
            </div>

            <div
              style={{
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
              className="mt-   bg-white"
            >
              <div className="mt- px-4 py-4  items-center flex justify-between gap-4 ">
                <input
                  placeholder="Enter coupon code"
                  className="bg-gray-200 outline-none border-none py-2 rounded text-slate-800 px-4"
                  type="text"
                  name=""
                  onChange={(e) => setcouponCode(e.target.value)}
                  value={couponCode}
                  id=""
                />
                <button
                  onClick={handleCoupon}
                  className="px-4 py-2 text-white  bg-blue-500 rounded"
                >
                  Apply
                </button>
              </div>
              {discountAvailable && (
                <>
                  <p className="text-sm mt- font-medium px-6 mb-4  text-emerald-600">
                    Coupon applied
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
