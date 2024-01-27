import React, { useEffect, useState } from "react";
import AxiosUserInstance from "./AxiosUserInstance";
import Card from "../../Components/User/Card";
import ImageSlider from "../../Components/User/ImageSlider";
import { useMediaQuery } from "../../Hooks/MediaQuery";
import { Footer } from "../../Components/User/Footer";
import { BrandSelect } from "../../Components/User/BrandSelect";
import { Options } from "../../Components/User/Options";
import { TbTruckDelivery } from "react-icons/tb";
import { RiLoopRightLine } from "react-icons/ri";
import { FaDatabase } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaChevronCircleRight } from "react-icons/fa";
import { Header } from "../../Components/User/Header";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../Components/Common/Loading";
import { FcCustomerSupport } from "react-icons/fc";
import { MdCancel } from "react-icons/md";
import { IoSend } from "react-icons/io5";
const Home = () => {
  const navigate = useNavigate();
  const slideImages = [
    {
      url: "https://cdn.grabon.in/gograbon/images/web-images/uploads/1618571140235/mobile-offers.jpg",
    },
    {
      url: "https://cdn.grabon.in/gograbon/images/web-images/uploads/1618548389296/laptop-coupons.jpg",
    },
    {
      url: "https://www.theledtv.com/wp-content/uploads/2018/04/amazon-tv-offer.jpeg",
    },
  ];
  const rightSlideImages = [
    {
      url: <TbTruckDelivery />,
      main: "Free Delivery",
      sub: " Free Shipping on all order",
    },
    {
      url: <RiLoopRightLine />,
      main: "Return Policy",
      sub: " Return within 7 days",
    },
    {
      url: <RiCustomerService2Fill />,
      main: "24/7 Support",
      sub: " Call anytime,anywere",
    },
    {
      url: <FaDatabase />,
      main: "Secure Payment",
      sub: " No payment issue",
    },
  ];
  const styles = {
    container: (isRowBased) => ({
      width: isRowBased ? "50%" : "90%",
      backgroundSize: "center",
      height: isRowBased ? "300px" : "200px",
      margin: isRowBased ? "16px auto" : "20px auto",
      backgroundPosition: "contain",
    }),
  };
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [chatBox, setchatBox] = useState(false);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    try {
      setloading(true);
      const { data } = await AxiosUserInstance.get("/getLatestProducts", {});
      setloading(false);
      if (data.success) {
        setLatestProducts(data?.latest5GProducts);
      }
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
  const isRowBased = useMediaQuery("(min-width: 768px)");
  return (
    <div className="relative">
      {/* header */}
      <Header />
      <div className="w-full  px-4 relative lg:hidden">
        <div className="w-full   px-">
          <input
            type="text"
            placeholder="Search for Products , Brands and More"
            className="py-2 px-8 text-gray-400 outline-none bg-blue-100 shadow-sm drop-shadow-sm rounded-lg w-[100%]"
            name=""
            id=""
          />
          <span className="absolute z-10 top-3 text-lg px-2 text-gray-400 left-4">
            <FaSearch />
          </span>
        </div>
      </div>
      {loading === false ? (
        <>
         
          <div className="">
            {" "}
            <BrandSelect />
          </div>

          <div
            style={{
              height: isRowBased ? "50vh" : "26vh",
              display: "flex",
            }}
          >
            <div style={styles.container(isRowBased)}>
              <ImageSlider slides={slideImages} />
            </div>
            {isRowBased && (
              <>
                <div
                  style={{
                    width: isRowBased ? "30%" : "90%",
                    height: isRowBased ? "300px" : "200px",
                    margin: isRowBased ? "16px auto" : "20px auto",
                  }}
                >
                  <Options slides={rightSlideImages} />
                </div>
              </>
            )}
          </div>
          <div
            style={{ width: isRowBased ? "90%" : "90%", margin: "4px auto" }}
            className="flex flex-col  bg-blac pb-4"
          >
            <div className="md:px- md:mt-0  px- flex  justify-between w-full mb-4  text-center  mt-16 font-bold">
              <div className="uppercase text-blue-600 hover:text-blue-800 text-lg font-extrabold">
                <h2> Latest 5g mobiles</h2>
              </div>
              <div className="text-sm  text-blue-600 cursor-pointer hover:text-blue-800">
                <span
                  onClick={() => navigate("/latest-5g-mobiles")}
                  className="text-3xl"
                >
                  <FaChevronCircleRight />
                </span>
              </div>
            </div>

            <div
              style={{
                width: isRowBased ? "" : "90%",
                // margin: "0px auto",
                // padding: "8px 10px",
              }}
              className="flex gap- pb-2 justify-center md:justify-center"
            >
              <Card products={latestProducts} isRowBased={isRowBased} />
            </div>
          </div>

          {/* footer */}
          <div className="md:block hidden">
            <Footer />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Home;
