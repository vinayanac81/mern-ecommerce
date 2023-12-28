import { Fragment, useEffect, useState } from "react";
import AxiosUserInstance from "../../../Pages/User/AxiosUserInstance";
import { BaseUrl } from "../../../Constants";
import { FaRupeeSign } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
export const AllOrder = ({ status }) => {
  const [orders, setorders] = useState([]);
  useEffect(() => {
    getInitialData();
  }, [status]);
  const getInitialData = async () => {
    try {
      const orderList = await AxiosUserInstance.get("/getOrders");
      console.log(orderList);
      if (orderList?.data?.success) {
        setorders(orderList?.data?.bookingList);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      {orders.length === 0 ? (
        <div className="h-[30rem] bg-white">
          <div className="flex h-full justify-center items-center">
            <h2 className="font-semibold ">No orders found!</h2>
          </div>
        </div>
      ) : (
        <div className="">
          {orders.map((item, index) => {
            return (
              <div key={index} className="bg-white h-26  flex gap-5  px-4 py-3">
                <div className="w-[15%]">
                  <div className="h-20 mx-auto w-20">
                    <img
                      className="w-full h-full"
                      src={`${BaseUrl}/images/${item?.products[0]?.product?.image}`}
                      alt=""
                    />
                  </div>
                </div>
                <div className="w-[40%] ">
                  <div className="flex flex-wrap w-full">
                    <h2 className="font-semibold">
                      {item?.products[0]?.product?.product_name}
                    </h2>
                  </div>
                </div>
                <div className="w-[10%]">
                  <div className="flex flex-wrap w-full">
                    <h2 className="flex items-center font-semibold text-sm">
                      <span>
                        <FaRupeeSign />
                      </span>{" "}
                      {item?.after_discount_final_amount}
                    </h2>
                  </div>
                </div>
                <div className="w-[30%]">
                  <div className="flex flex-wrap  px-4 w-full">
                    {item?.order_status === "placed" ? (
                      <div className="flex items-center gap-3">
                        <div
                          style={{ fontSize: "28px" }}
                          className="text-yellow-400   rounded-full"
                        >
                          <GoDotFill />
                        </div>
                        <div className="font-semibold text-sm">
                          {item?.order_status.charAt(0).toUpperCase() +
                            item?.order_status.slice(1)}{" "}
                          on {new Date(item?.date).getDate()}/
                          {new Date(item?.date).getMonth()}/
                          {new Date(item?.date).getFullYear()}
                        </div>
                      </div>
                    ) : item?.order_status === "shipped" ? (
                      <div className="flex items-center gap-3">
                        <div
                          style={{ fontSize: "28px" }}
                          className="text-blue-400   rounded-full"
                        >
                          <GoDotFill />
                        </div>
                        <div className="font-semibold text-sm">
                          {item?.order_status.charAt(0).toUpperCase() +
                            item?.order_status.slice(1)}{" "}
                          on {new Date(item?.date).getDate()}/
                          {new Date(item?.date).getMonth()}/
                          {new Date(item?.date).getFullYear()}
                        </div>
                      </div>
                    ) : item?.order_status === "delivered" ? (
                      <div className="">
                        <div className="flex items-center gap-3">
                          <div
                            style={{ fontSize: "28px" }}
                            className="text-green-400   rounded-full"
                          >
                            <GoDotFill />
                          </div>
                          <div className="font-semibold text-sm">
                            {item?.order_status.charAt(0).toUpperCase() +
                              item?.order_status.slice(1)}{" "}
                            on {new Date(item?.date).getDate()}/
                            {new Date(item?.date).getMonth()}/
                            {new Date(item?.date).getFullYear()}
                          </div>
                        </div>
                        <div className="px-10 ">
                          <h2 style={{ fontSize: "12px" }}>
                            Your item has been Delivered
                          </h2>
                        </div>
                        <div className="px-10">
                          <Link
                            to={`/account/order/${item?._id}`}
                            style={{ fontSize: "14px" }}
                            className="text-blue-600 flex gap-2 items-center cursor-pointer"
                          >
                            <FaStar /> Review & Rating
                          </Link>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div className="mt-4 flex justify-center  mb-6">
            <h2 className="text-blue-600 py-2  px-8 outline-gray-200 rounded-sm outline bg-white">
              No More Orders To Display
            </h2>{" "}
          </div>{" "}
        </div>
      )}
    </Fragment>
  );
};
