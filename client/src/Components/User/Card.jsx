import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { BaseUrl } from "../../Constants";
import AxiosUserInstance from "../../Pages/User/AxiosUserInstance";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserCart } from "../../Toolkit/UserSlice";
const Card = ({ products, isRowBased }) => {
  console.log(products);
  const [currentIndex, setcurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      } else {
        toast.error("Unauthorized user,Please Login");
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
  const handleAddtoCart = (id, stock) => {
    if (stock === 0) {
      toast.error("Not stock");
    } else {
      addToCart(id);
    }
  };
  const goToPrevious = () => {
    const newIndex =
      currentIndex === 0 ? products.length - 1 : currentIndex - 1;
    setcurrentIndex(newIndex);
  };
  const gotToNext = () => {
    const newIndex =
      currentIndex === products.length - 1 ? 0 : currentIndex + 1;
    setcurrentIndex(newIndex);
  };
  return (
    <div className="flex   gap-10">
      {isRowBased ? (
        <>
          {products.map((product, index) => {
            if (index < 4) {
              return (
                <div key={index}>
                  <div
                    style={{
                      boxShadow:
                        " rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                    }}
                    onClick={() =>
                      navigate(
                        `/mobile/${product?.product?.product_name}/${product?.product?._id}`
                      )
                    }
                    className="max-w-md cursor-pointer  py-4  w-[17rem]  bg-white  rounded-lg "
                  >
                    <div className="w-full h-[12rem]">
                      {" "}
                      <a href="">
                        <img
                          className="rounded-t-lg h-full px-4 py-1   w-full"
                          src={`${BaseUrl}/images/${product?.product?.image}`}
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="px-5">
                      <h5
                        style={{ fontSize: "16px", fontWeight: "bold" }}
                        className=" uppercase pt-2 font- tracking-tight text-center text-gray-900 "
                      >
                        {product?.product?.product_name}
                      </h5>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </>
      ) : (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <div
            onClick={goToPrevious}
            style={{
              position: "absolute",
              top: "50%",
              transform: "translate(0,-50%)",
              left: "-50px",
              zIndex: 1,
              cursor: "pointer",
            }}
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              data-slot="icon"
              class="w-10 h-10 text-blue-600"
            >
              <path
                fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div
            onClick={gotToNext}
            style={{
              position: "absolute",
              top: "50%",
              transform: "translate(0,-50%)",
              right: "-50px",
              zIndex: 1,
              cursor: "pointer",
            }}
            className=""
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              data-slot="icon"
              class="w-10 h-10 text-blue-600"
            >
              <path
                fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div className="max-w-md  cursor-pointer w-[17rem] h-[16rem]  bg-white border border-gray-200 rounded-lg shadow  dark:border-gray-700">
            <div className="w-full h-[10rem]">
              {" "}
              <a href="">
                <img
                  className="rounded-t-lg h-full p-4 w-full"
                  src={`${BaseUrl}/images/${products[currentIndex].product?.image}`}
                  alt=""
                />
              </a>
            </div>
            <div className="px-5 py-1">
              <a href="">
                <h5 className="mb-1  uppercase font-bold tracking-tight text-gray-900 ">
                  {products[currentIndex]?.product?.product_name}
                </h5>
              </a>
              <p className="mb-1 text-sm font-normal uppercase text-gray-700 dark:text-gray-400">
                Price : {products[currentIndex]?.product?.offer_price}{" "}
              </p>
              <p className="mb-1 text-sm font-normal uppercase text-gray-700 dark:text-gray-400">
                Stock: {products[currentIndex]?.product?.stock}{" "}
                <span className="lowercase">Pieces</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
