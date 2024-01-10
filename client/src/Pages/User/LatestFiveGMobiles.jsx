import { Fragment, useEffect, useState } from "react";
import { Header } from "../../Components/User/Header";
import { Footer } from "../../Components/User/Footer";
import AxiosUserInstance from "./AxiosUserInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BaseUrl } from "../../Constants";
import { Loader } from "../../Components/Common/Loading";

export const LatestFiveGMobiles = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [latestProducts, setLatestProducts] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    getInitialData();
  }, []);
  const getInitialData = async () => {
    try {
      setLoading(true);
      const { data } = await AxiosUserInstance.get("/getLatestProducts");
      if (data?.success) {
        setLatestProducts(data?.latest5GProducts);
        console.log(data?.latest5GProducts);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message === "unauthorized user") {
        localStorage.removeItem("admin");
        localStorage.removeItem("admin-token");
        navigate("/admin");
        toast.error("Please login");
      }
    }
  };
  return (
    <Fragment>
      <div style={{ backgroundColor: "#f0f0f0" }} className="h-screen">
        <div className="">
          <Header />
        </div>
        <div className="bg-white w-full mx-2 my-2">
          <div className="text-center border-b-2 py-5">
            <h2
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                fontFamily: "sans-serif",
              }}
              className="pt-2"
            >
              Latest 5G Mobiles
            </h2>
            <h2
              style={{
                fontFamily: "sans-serif",
                color: "gray",
                fontSize: "15px",
              }}
            >
              21 Items
            </h2>
          </div>
          {loading ? (
            <>
              <Loader value={"Latest5gMobiles"} />
            </>
          ) : (
            <>
              {" "}
              <div className="py-6 flex flex-wrap justify-center gap-8 px-14">
                {latestProducts.map((item, index) => {
                  return (
                    <div
                      onClick={() =>
                        navigate(
                          `/mobile/${item?.product?.product_name}/${item?.product?._id}`
                        )
                      }
                      className="cursor-pointer"
                      key={index}
                    >
                      <div className="border-2 w-[16rem]">
                        <div className="h-[12rem] p-4">
                          <div className="w-40 h-40 mx-auto  bg-black">
                            <img
                              className="w-full h-full"
                              src={`${BaseUrl}/images/${item?.product?.image}`}
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="text-center pb-3">{item?.product?.product_name}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
        <div className="">
          <Footer />
        </div>
      </div>
    </Fragment>
  );
};
