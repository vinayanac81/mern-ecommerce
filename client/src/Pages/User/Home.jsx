import React, { useEffect, useState } from "react";
import NavBar from "../../Components/User/NavBar";
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
const Home = () => {
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
 const [latestProducts, setLatestProducts] = useState([])
  const [loading, setloading] = useState(true);
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
    <div className=" bg-white">
      {/* <NavBar name="home" /> */}
      <Header />

      <div className="w-full relative lg:hidden">
        <div className="w-full  px-2">
          <input
            type="text"
            placeholder="Search for Products , Brands and More"
            className="py-2 px-12 text-gray-400 outline-none bg-blue-100 shadow-sm drop-shadow-sm rounded-lg w-[100%]"
            name=""
            id=""
          />
          <span className="absolute z-10 top-3 text-lg px-4 text-gray-400 left-0">
            <FaSearch />
          </span>
        </div>
      </div>

      {loading === false && (
        <>
          <div className="">
            {" "}
            <BrandSelect />
          </div>

          <div
            style={{
              height: isRowBased ? "50vh" : "35vh",
              display: "flex",
              padding: "0px 36px",
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
            style={{ width: isRowBased ? "85%" : "90%", margin: "10px auto" }}
            className="flex flex-col bg-white"
          >
            <div className="md:px-5 px-8 flex  justify-between w-full mb-4  text-center pt-8 font-bold">
              <div className="uppercase text-blue-600 hover:text-blue-800 text-lg font-extrabold">
                <h2> Latest 5g mobiles</h2>
              </div>
              <div className="text-sm  text-blue-600 cursor-pointer hover:text-blue-800">
                <span className="text-3xl">
                  <FaChevronCircleRight />
                </span>
              </div>
            </div>

            <div
              style={{
                width: isRowBased ? "" : "90%",
                margin: "0px auto",
                padding: "0px 10px",
              }}
              className="  flex gap- justify-center md:justify-between "
            >
              <Card products={latestProducts} isRowBased={isRowBased} />
            </div>
          </div>
          <div className="py-20  dark:bg-black">
            <Footer />
          </div>
        </>
      )}

      {loading && (
        <>
          <div className="w-full  h-screen flex justify-center items-center">
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
      )}
    </div>
  );
};

export default Home;
