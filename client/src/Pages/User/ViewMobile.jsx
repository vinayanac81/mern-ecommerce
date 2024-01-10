import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../Components/User/Header";
import { useEffect, useState } from "react";
import AxiosUserInstance from "./AxiosUserInstance";
import { BaseUrl } from "../../Constants";
import { FaHeart } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";
import { setUserCart } from "../../Toolkit/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { Root } from "../../Components/User/Root";
import { FaStar } from "react-icons/fa";
import g from "../../assets/5G.png";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
export const ViewMobile = () => {
  const { id, name } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const root = [
    {
      name: "Home",
    },
    {
      name: "Mobiles",
    },
    {
      name: name,
    },
  ];
  const { userDetails } = useSelector((state) => state.user);
  const [productDetail, setproductDetail] = useState({});
  const [wishListed, setwishListed] = useState(false);
  const [productInCart, setproductInCart] = useState(false);
  const [reviewsAndRatings, setreviewsAndRatings] = useState([]);
  const [coupons, setcoupons] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    getInitialData();
  }, []);
  const getInitialData = async () => {
    try {
      setloading(true);
      const productdata = await AxiosUserInstance.get("/getProductDetails", {
        params: { productId: id },
      });
      const getReviewRating = await AxiosUserInstance.get("/getReviewrating", {
        params: { productId: id },
      });
      const getCoupons = await AxiosUserInstance.get("/getCoupons");
      console.log(getCoupons);
      if (getCoupons?.data?.success) {
        setcoupons(getCoupons?.data?.coupons);
      }
      if (getReviewRating?.data?.success) {
        setreviewsAndRatings(getReviewRating?.data?.reviewRatings);
      }
      if (userDetails.email) {
        const wishlist = await AxiosUserInstance.get("/getWishlist");
        const cartProducts = await AxiosUserInstance.get(
          "/getCartProductsData"
        );
        const index = wishlist.data.wishlist.findIndex(
          (item) => item?.product?._id === id
        );
        if (index === -1) {
          setwishListed(false);
        } else {
          setwishListed(true);
        }
        let cartProductIndex;
        let totalCartProducts;
        if (cartProducts.data.cartProducts.length > 0) {
          cartProductIndex = cartProducts.data.cartProducts.findIndex(
            (item) => item?.product._id === id
          );
          totalCartProducts = cartProducts.data.cartProducts.length;
        } else {
          cartProductIndex = -1;
          totalCartProducts = 0;
        }
        dispatch(setUserCart(totalCartProducts));
        localStorage.setItem("cart", totalCartProducts);
        if (cartProductIndex === -1) {
          setproductInCart(false);
        } else {
          setproductInCart(true);
        }
      }
      if (productdata?.data?.success) {
        setproductDetail(productdata?.data?.productData);
      }
      setloading(false);
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
  const addToCart = async (id) => {
    try {
      const { data } = await AxiosUserInstance.post(
        "/add-to-cart",
        {},
        { params: { id } }
      );
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("cart", data.cart_count);
        dispatch(setUserCart(data.cart_count));
        getInitialData();
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
  const handleAddtoCart = (id, stock, status) => {
    console.log(id, stock, status);
    if (stock === 0) {
      toast.error("Not stock");
    } else if (status === true) {
      navigate("/viewcart");
    } else {
      addToCart(id);
    }
  };
  return (
    <div style={{ backgroundColor: "#f1f1f1" }} className="h-screen">
      <Header />
      {loading ? (
        <>
          <div className="w-full  h-[34rem] flex justify-center items-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className=" pt-2 px-24">
            <div className="bg-white flex">
              <div className="w-[40%] py-6 px-10">
                <div className="w-full relative py-10 h-[28rem] border">
                  <div className="w-68   mx-auto h-96">
                    <img
                      className="w-full h-full"
                      src={`${BaseUrl}/images/${productDetail.image}`}
                      alt=""
                    />
                  </div>
                  <div className="absolute flex justify-center items-center top-3 right-6 w-10 h-10 rounded-full outline outline-gray-300 shadow-md drop-shadow-sm bg-slate-200">
                    <span
                      className={`${
                        wishListed
                          ? "text-red-600 hover:text-red-700"
                          : "text-gray-300 hover:text-gray-500"
                      }`}
                    >
                      <FaHeart />
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-1/2 mt-2">
                    <button
                      onClick={() =>
                        handleAddtoCart(
                          productDetail?._id,
                          productDetail?.stock,
                          productInCart
                        )
                      }
                      className="bg-orange-500 hover:bg-orange-600 flex justify-center items-center gap-2 py-2 text-white font-bold w-full"
                    >
                      <span>
                        <FaShoppingCart />
                      </span>{" "}
                      <span className="uppercase">
                        {productInCart ? "go to cart" : "add to cart"}{" "}
                      </span>
                    </button>
                  </div>
                  <div className="w-1/2 mt-2">
                    <button className="bg-orange-500 hover:bg-orange-600 flex justify-center items-center gap-2 py-2 text-white font-bold w-full">
                      <span>
                        <AiFillThunderbolt />
                      </span>{" "}
                      <span className="uppercase">buy now</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-[60%]">
                <div className=" text-gray-400">
                  <Root root={root} />
                </div>
                <div className="flex gap-4">
                  <h2 className="pl-6">{productDetail?.product_name} </h2>
                  <h2>({productDetail?.rom})</h2>
                  <h2>({productDetail?.ram})</h2>
                </div>
                <div className="flex px-6 items-center py-2 gap-4">
                  <h2 className="bg-emerald-800 justify-center px-2 py- flex items-center gap-1 text-white">
                    {productDetail?.rating}{" "}
                    <span style={{ fontSize: "12px" }}>
                      <FaStar />
                    </span>{" "}
                  </h2>
                  <h2 style={{ fontSize: "13px" }}>
                    {" "}
                    {productDetail?.totalReviewRating} Ratings & Rewews
                  </h2>
                  <h2>
                    <img src={g} className="w-5" alt="" />
                  </h2>
                </div>
                <h2
                  style={{ fontSize: "13px" }}
                  className="px-6 py-2 flex items-center text-emerald-600 font-semibold gap-2"
                >
                  <span> Extra </span>
                  <span className="flex items-center">
                    {" "}
                    <span style={{ fontSize: "11px" }}>
                      <FaIndianRupeeSign />
                    </span>{" "}
                    {productDetail?.original_price - productDetail?.offer_price}
                  </span>
                  <span>off</span>
                </h2>
                <div className="flex px-6 gap-4 items-center">
                  <h2
                    style={{ fontSize: "20px" }}
                    className="flex font-semibold items-center"
                  >
                    <FaIndianRupeeSign />
                    {productDetail?.offer_price}
                  </h2>
                  <h2
                    style={{ fontSize: "14px", textDecoration: "line-through" }}
                    className="flex font-semibold items-center"
                  >
                    <FaIndianRupeeSign />
                    {productDetail?.original_price}
                  </h2>
                  <span
                    style={{ fontSize: "16px" }}
                    className="text-emerald-600 font-bold"
                  >
                    {100 -
                      Math.round(
                        (productDetail?.offer_price /
                          productDetail?.original_price) *
                          100
                      )}
                    % Off
                  </span>
                </div>
                <div className="px-6 pt-2 ">
                  <h2 className="text-gray-400 uppercase font-semibold">
                    Highlights
                  </h2>
                  <div className="px-6">
                    <div className="md:mt-2  flex items-center gap-2">
                      <span className="text-sm text-gray-400">
                        <GoDotFill />
                      </span>
                      <span className="text-sm text-gray-400">
                        {" "}
                        {productDetail?.ram} | {productDetail?.rom}{" "}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm text-gray-400">
                        <GoDotFill />
                      </span>
                      <span className=" text-gray-400">
                        {" "}
                        {productDetail?.display}{" "}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm text-gray-400">
                        <GoDotFill />
                      </span>
                      <span className=" text-gray-400">
                        {" "}
                        {productDetail?.back_camera} |{" "}
                        {productDetail?.front_camera}{" "}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm text-gray-400">
                        <GoDotFill />
                      </span>
                      <span className=" text-gray-400">
                        {" "}
                        {productDetail?.battery}{" "}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm text-gray-400">
                        <GoDotFill />
                      </span>
                      <span className=" text-gray-400">
                        {" "}
                        {productDetail?.processor}{" "}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-2">
                  <h2 className="uppercase text-blue-600 font-semibold">
                    Available offers
                  </h2>
                  <div className="px-6">
                    {coupons.map((item) => {
                      return (
                        <div className="md:mt-2  flex items-center gap-2">
                          <span className="text-sm text-gray-400">
                            <GoDotFill />
                          </span>
                          <span className="text-sm text-emerald-600">
                            Apply Coupon code "{item?.code}". You will get{" "}
                            {item.discount}% off.
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
