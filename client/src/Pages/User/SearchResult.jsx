import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Header } from "../../Components/User/Header";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { HiSortDescending } from "react-icons/hi";
import { FaFilter } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { IoIosPricetag } from "react-icons/io";
import { FaMobile } from "react-icons/fa";
import { BaseUrl } from "../../Constants";
import { useSelector } from "react-redux";
import AxiosUserInstance from "./AxiosUserInstance";
export const SearchResult = () => {
  //   style={{ color: "#212121" }}
  const location = useLocation();
  const { id } = useParams();
  const { searchResults } = location.state;
  const navigate = useNavigate();
  const { userDetails } = useSelector((state) => state.user);
  const [loading, setloading] = useState(true);
  const [brandLoading, setbrandLoading] = useState(true);
  const [brands, setbrands] = useState(["all"]);
  const [brand, setbrand] = useState("all");
  const [sortBy, setSortBy] = useState({
    newestFirst: true,
    lowToHigh: false,
    highToLow: false,
  });
  const [wishlistProducts, setWishlistProducts] = useState([]);
  useEffect(() => {
    getInitialData();
  }, [id]);
  const getInitialData = async () => {
    try {
      setbrandLoading(true);
      setloading(true);
      searchResults.forEach((item) => {
        if (brands.length > 0) {
          const index = brands.findIndex(
            (brandName) => brandName === item?.brand
          );
          if (index === -1) {
            brands.push(item?.brand);
          }
        } else {
          // brands.push(item?.brand);
          setbrands([...brands, item?.brand]);
        }
      });
      if (userDetails.email) {
        const resultTwo = await AxiosUserInstance.get("/getWishlist");
        if (resultTwo?.data?.success) {
          setWishlistProducts(resultTwo?.data?.wishlist);
        }
      }
      setbrandLoading(false);
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getLowToHighProducts = async () => {
    function sortByIdThenName(a, b) {
      const n = a.offer_price - b.offer_price;
      // sort by listId
      if (n !== 0) {
        return n;
      }
      // if listId is equal then sort by name
      return a.offer_price.localeCompare(b.offer_price);
    }
    const sorted = searchResults.filter((item) => item).sort(sortByIdThenName);
    console.log(sorted);
  };
  return (
    <div
      //   onClick={() => {
      //     showSortByModal === true && setShowSortByModal(false);
      //   }}
      style={{ backgroundColor: "#f0f0f0" }}
    >
      <div className="">
        <Header />
      </div>
      <div className="bg- flex gap-3 md:pl-2  md:pr-2 md:py-2">
        <div className="w-[20%] hidden md:block h-screen shadow-lg drop-shadow-lg bg-white">
          <div className="p-5 border-b">
            <h2
              style={{ fontSize: "18px" }}
              className="font-semibold uppercase text-blue-600"
            >
              Filters
            </h2>
          </div>
          <div className="border-b-4 pb-4">
            <h2
              style={{ fontSize: "18px" }}
              className="px-5 py-3  font-semibold uppercase text-blue-600"
            >
              Price
            </h2>
            <div className="flex gap-2 flex-wrap justify-center items-center px-5">
              <div className="px- border">
                <select
                  //   onChange={handleMiniumPrice}
                  className="border-none"
                  //   value={minimumPrice}
                  name="minimum"
                  style={{ color: "#212121" }}
                  id=""
                >
                  <option value="0">Min</option>
                  <option value="10000">10000</option>
                  <option value="20000">20000</option>
                  <option value="30000">30000</option>
                </select>
              </div>
              <span style={{ color: "#212121" }}>to</span>
              <div className="px- border">
                <select
                  //   value={maximumPrice}
                  //   onChange={handleMaximumPrice}
                  className="border-none"
                  name=""
                  id=""
                >
                  <option value="10000">10000</option>
                  <option value="20000">20000</option>
                  <option value="30000">30000</option>
                  <option value="30000+">30000+</option>
                </select>
              </div>
            </div>
          </div>
          <div style={{ color: "#212121" }} className="border-b-4">
            <div className="flex justify-between px-5 py-3">
              <div className="uppercase  font-semibold">
                <h2 style={{ color: "#212121" }}>Brand</h2>
              </div>
              <div className="text-gray-600">
                <IoIosArrowDown />
              </div>
            </div>
            {brandLoading ? (
              <div className="w-full  h-60 flex justify-center items-center">
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
            ) : (
              <div className="">
                {brands.map((brandName, index) => {
                  return (
                    <div
                      style={{ color: "#212121" }}
                      className="px-5 flex gap-4 my-2 items-center "
                      key={index}
                    >
                      <input
                        type="radio"
                        onClick={() => handleBrandFilter(brandName?.brand_name)}
                        checked={brandName === brand ? true : false}
                        className="w-4"
                        name=""
                        id=""
                      />
                      <h2>{brandName.toUpperCase()}</h2>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="md:w-[80%] border-t md:border-0 w-full text-black font-bold h-screen md:shadow-lg md:drop-shadow-lg bg-white ">
          <div className="flex md:hidden border-b-2 py-3">
            <div
              //   onClick={() => setShowSortByModal(true)}
              className="w-[50%] flex justify-center text-gray-700 items-center gap-1 cursor-pointer"
            >
              <span>
                <HiSortDescending />
              </span>
              <h2>Sort</h2>
            </div>
            <div
              //   onClick={() => setShowFilterModal(true)}
              className="w-[50%] flex justify-center text-gray-700 items-center gap-1 cursor-pointer"
            >
              <span>
                <FaFilter />
              </span>
              <h2>Filter</h2>
            </div>
          </div>
          <div className="px-5 hidden md:block pt-5">
            <h2 style={{ fontSize: "18px" }} className="text-blue-600">
              Showing {searchResults.length} Results for "{id.toUpperCase()}"
            </h2>
          </div>
          <div className="md:flex hidden border-b">
            <span className="px-5 text-sm text-gray-600 mb-1 pt-3">
              Sort By
            </span>
            <span
              //   onClick={getNewestFirst}
              style={{ color: sortBy.newestFirst === false && "#212121" }}
              className={`px-5 cursor-pointer ${
                sortBy.newestFirst && "text-blue-600 border-blue-600"
              } border-b text-sm mb- pt-3`}
            >
              Relevance
            </span>
            <span
              onClick={getLowToHighProducts}
              style={{ color: sortBy.newestFirst === false && "#212121" }}
              className={`px-5 cursor-pointer ${
                sortBy.lowToHigh && "text-blue-600 border-blue-600"
              } border-b text-sm mb- pt-3`}
            >
              Price -- Low to High
            </span>
            <span
              //   onClick={getHighToLowProducts}
              style={{ color: sortBy.newestFirst === false && "#212121" }}
              className={`px-5 cursor-pointer ${
                sortBy.highToLow && "text-blue-600 border-blue-600"
              } border-b text-sm mb- pt-3`}
            >
              Price -- High to Low
            </span>
          </div>
          <div className="">
            {loading ? (
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
            ) : (
              <>
                {" "}
                <div className="border-b md:pb-0 pb-10">
                  {searchResults.map((product, index) => {
                    let status = wishlistProducts?.findIndex(
                      (pro) => pro.product._id === product._id
                    );
                    return (
                      <div key={index} className="md:flex border-b-4">
                        <div style={{flex:0.3}} className=" flex  md:block w-[100%] relative">
                          <Link
                            to={`/mobile/${product?.product_name}/${product?._id}`}
                          >
                            <div className=" w-40 h-40 md:mx-auto  md:h-60">
                              <img
                                className="w-full p-4 h-full"
                                src={`${BaseUrl}/images/${product?.image}`}
                                alt=""
                              />
                            </div>
                          </Link>

                          {status === -1 ? (
                            <div
                              onClick={() =>
                                handleWishlist(product?._id, "add")
                              }
                              className="absolute top-4 md:top-8 text-gray-300 right-5"
                            >
                              <FaHeart />
                            </div>
                          ) : (
                            <div
                              onClick={() =>
                                handleWishlist(product?._id, "remove")
                              }
                              className="absolute top-4 md:top-8 text-red-600 right-5"
                            >
                              <FaHeart />
                            </div>
                          )}

                          <div className="md:hidden py-4">
                            <h2 className="text-blue-600">
                              {product?.product_name}
                            </h2>
                            <div className="flex gap-10 mt-5">
                              <h2 className="text-gray-800">
                                {product?.offer_price}
                              </h2>
                              {product?.original_price ===
                              product?.offer_price ? (
                                ""
                              ) : (
                                <h2 className="text-gray-500 line-through">
                                  {product?.original_price}
                                </h2>
                              )}
                            </div>
                          </div>
                        </div>
                        <div style={{flex:0.7}} className="  w-[100%] md:pt-6 px-7 md:pr-5">
                          <div className="md:flex justify-between hidden  pr-14">
                            <h2 className="text-blue-600">
                              {product?.product_name}
                            </h2>
                            <div className="flex gap-10">
                              <h2 className="text-gray-800">
                                {product?.offer_price}
                              </h2>
                              {product?.original_price ===
                              product?.offer_price ? (
                                ""
                              ) : (
                                <h2 className="text-gray-500 line-through">
                                  {product?.original_price}
                                </h2>
                              )}
                            </div>
                          </div>

                          <div className="md:mt-2  flex items-cente gap-2">
                            <span className="text-sm text-gray-400">
                              <GoDotFill />
                            </span>
                            <span className="text-sm text-gray-400">
                              {" "}
                              {product?.ram} | {product?.rom}{" "}
                            </span>
                          </div>
                          <div
                            style={{ fontSize: "13px" }}
                            className="mt-1 flex items-center gap-2"
                          >
                            <span className="text-sm text-gray-400">
                              <GoDotFill />
                            </span>
                            <span className=" text-gray-400">
                              {" "}
                              {product?.display}{" "}
                            </span>
                          </div>
                          <div
                            style={{ fontSize: "13px" }}
                            className="mt-1 flex items-center gap-2"
                          >
                            <span className="text-sm text-gray-400">
                              <GoDotFill />
                            </span>
                            <span className=" text-gray-400">
                              {" "}
                              {product?.back_camera} | {product?.front_camera}{" "}
                            </span>
                          </div>
                          <div
                            style={{ fontSize: "13px" }}
                            className="mt-1 flex items-center gap-2"
                          >
                            <span className="text-sm text-gray-400">
                              <GoDotFill />
                            </span>
                            <span className=" text-gray-400">
                              {" "}
                              {product?.battery}{" "}
                            </span>
                          </div>
                          <div
                            style={{ fontSize: "13px" }}
                            className="mt-1 flex items-center gap-2"
                          >
                            <span className="text-sm text-gray-400">
                              <GoDotFill />
                            </span>
                            <span className=" text-gray-400">
                              {" "}
                              {product?.processor}{" "}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
