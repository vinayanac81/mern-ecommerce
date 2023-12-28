import { useEffect, useState } from "react";
import { AccountLeftBar } from "../../Components/User/AccountLeftBar";
import { Header } from "../../Components/User/Header";
import AxiosUserInstance from "./AxiosUserInstance";
import { BaseUrl } from "../../Constants";
import { MdDelete } from "react-icons/md";

export const Wishlist = () => {
  const [wishlistData, setwishlistData] = useState([]);
  useEffect(() => {
    getInitialData();
  }, []);
  const getInitialData = async () => {
    try {
      const wishlist = await AxiosUserInstance.get("/getWishlist");
      if (wishlist?.data?.success) {
        setwishlistData(wishlist?.data?.wishlist);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Header />
      <div className="bg-gray-300 pt-4 h-screen px-40">
        <div className="gap-3 h-screen flex">
          <AccountLeftBar leftActiveTab={"wishlist"} />
          <div
            style={{
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
            className="w-[70%] h-[89%] bg-white"
          >
            <div className="">
              <h2 className="px-8 py-5 border-b-2 text-black font-bold">
                My Wishlist (<span>{wishlistData.length}</span>)
              </h2>
              <div
                style={{
                  height: wishlistData.length === 1 ? "14rem" : "34rem",
                  overflowY: wishlistData.length < 3 && "hidden",
                  overflowX: "hidden",
                }}
                className={`${wishlistData.length < 3 && "overflow-y-scroll"} `}
              >
                {wishlistData.length > 0 ? (
                  <>
                    {wishlistData.map((item) => {
                      return (
                        <>
                          <div className="w-full px-12 border-b-2 py-6 flex">
                            <div className="w-[30%]">
                              <div className="w-32 h-32">
                                <img
                                  src={`${BaseUrl}/images/${item?.product?.image}`}
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="w-[70%]">
                              <div className="flex justify-between ">
                                <h2 className="font-bold">
                                  {item?.product?.product_name}
                                </h2>
                                <span className="text-xl">
                                  <MdDelete />
                                </span>
                              </div>
                              <div className="flex mt-4 gap-2">
                                <h2 className="font-semibold">
                                  <span></span>
                                  {item?.product?.offer_price}
                                </h2>
                                <h2
                                  style={{ textDecoration: "line-through" }}
                                  className="text-sm font-semibold text-gray-600"
                                >
                                  <span></span>
                                  {item?.product?.original_price}
                                </h2>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <div className="flex justify-center items-center h-full text-black font-bold">
                      No items in wishlist
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
