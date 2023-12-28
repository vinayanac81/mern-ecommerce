import { Fragment, useEffect, useState } from "react";
import { Footer } from "../../Components/User/Footer";
import { Header } from "../../Components/User/Header";
import { FaStar } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import AxiosUserInstance from "./AxiosUserInstance";
import { useNavigate, useParams } from "react-router-dom";
import { BaseUrl } from "../../Constants";
import toast from "react-hot-toast";
export const OrderView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const Rating = [
    {
      star: <FaStar />,
      id: 1,
      name: "Very Bad",
    },
    {
      star: <FaStar />,
      id: 2,
      name: "Bad",
    },
    {
      star: <FaStar />,
      id: 3,
      name: "Good",
    },
    {
      star: <FaStar />,
      id: 4,
      name: "Very Good",
    },
    {
      star: <FaStar />,
      id: 5,
      name: "Excellent",
    },
  ];
  const [starRatingCount, setstarRatingCount] = useState(5);
  const [hoverRating, sethoverRating] = useState("");
  const [product, setproduct] = useState([]);
  const [loading, setloading] = useState(true);
  const [review, setreview] = useState("");
  useEffect(() => {
    getInitialData();
  }, []);
  const getInitialData = async () => {
    try {
      setloading(true);
      const orderData = await AxiosUserInstance.get("/get-order-details", {
        params: { orderId: id },
      });
      setproduct(orderData?.data.orderdata[0]?.products[0]?.product);
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
        navigate("/");
        toast.error("Please login");
      }
    }
  };
  const handleReviewRating = async () => {
    try {
      if (review === "") {
        return toast.error("Please add review.");
      }
      const { data } = await AxiosUserInstance.post("/addReviewAndRating", {
        rating: starRatingCount,
        review,
        productId: product?._id,
      });
      if (data?.success) {
        setstarRatingCount(5);
        setreview("");
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
        navigate("/");
        toast.error("Please login");
      }
    }
  };
  return (
    <div className="">
      <Header />
      {loading ? (
        ""
      ) : (
        <div
          style={{ backgroundColor: "#f0f0f0" }}
          className="py-2 px-2 flex flex-col gap-3"
        >
          <div className="bg-white px-7 py-4 flex items-center justify-between w-full">
            <div className="">
              <h2 className="font-semibold" style={{ fontSize: "20px" }}>
                Reviews & Ratings
              </h2>
            </div>
            <div className="flex">
              <div className="text-sm">
                {product?.product_name.slice(0, 24)}....
              </div>
              <div className="w-10">
                <img
                  className="w-full"
                  src={`${BaseUrl}/images/${product?.image}`}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="">
            <div className="bg-white px-7 border-b-2  p  py-4  w-full">
              <div className="pb-2">
                <h2 className="" style={{ fontSize: "16px" }}>
                  Rate this product
                </h2>
              </div>
              <div className="pt-2   flex gap-4 items-center p">
                <div className="flex gap-4">
                  {Rating.map((item, index) => {
                    return (
                      <Fragment key={index}>
                        <div className="relative">
                          <span
                            style={{ fontSize: "28px" }}
                            className={`${
                              starRatingCount >= index + 1
                                ? "text-yellow-400"
                                : "text-gray-400"
                            } hover:text-yellow-400 cursor-pointer`}
                            onMouseEnter={() => {
                              sethoverRating(index + 1);
                            }}
                            onMouseLeave={() => sethoverRating(false)}
                            onClick={() => setstarRatingCount(index + 1)}
                          >
                            {item?.star}
                          </span>

                          {hoverRating === index + 1 && (
                            <div className="">
                              <div
                                style={{
                                  top: "-46px",
                                  fontSize: "10px",
                                  left: "-13px",
                                }}
                                className="absolute flex justify-center items-center text-white  w-14 h-8 bg-black"
                              >
                                {item.name}
                              </div>
                              <span
                                style={{
                                  top: "-26px",
                                  fontSize: "30px",
                                  left: "-1px",
                                }}
                                className="absolute"
                              >
                                <IoMdArrowDropdown />
                              </span>
                            </div>
                          )}
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
                <div className="">
                  <h2 className="text-blue-600 font-semibold">
                    {Rating[starRatingCount - 1].name}
                  </h2>
                </div>
              </div>
            </div>
            <div className="flex py-4 px-7 mb-2 bg-white flex-col gap-4">
              <div className="  ">Review this product</div>
              <div className=" ">
                <textarea
                  name=""
                  onChange={(e) => setreview(e.target.value)}
                  className="w-full border-gray-400 rounded-sm border-2"
                  placeholder="Description...."
                  id=""
                  cols="30"
                  value={review}
                  rows="10"
                ></textarea>
              </div>
              <div
                onClick={handleReviewRating}
                className="w-full py-2 text-center cursor-pointer text-white font-extrabold bg-orange-500"
              >
                SUBMIT
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="py-20  dark:bg-black">
        <Footer />
      </div>
    </div>
  );
};
