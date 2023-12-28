import { Link, useNavigate, useParams } from "react-router-dom";
import { Header } from "../../Components/User/Header";
import { useEffect, useState } from "react";
import AxiosUserInstance from "./AxiosUserInstance";
import { BaseUrl } from "../../Constants";
import { FaHeart } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { HiSortDescending } from "react-icons/hi";
import { FaFilter } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { IoIosPricetag } from "react-icons/io";
import { FaMobile } from "react-icons/fa";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
export const BrandedMobiles = () => {
  let { brand } = useParams();
  const navigate = useNavigate();
  const { userDetails } = useSelector((state) => state.user);
  const [loading, setloading] = useState(true);
  const [products, setProducts] = useState([]);
  const [forFiltering, setForFiltering] = useState([]);
  const [sortBy, setSortBy] = useState({
    newestFirst: true,
    lowToHigh: false,
    highToLow: false,
  });
  const [minimumPrice, setMinimumPrice] = useState("0");
  const [maximumPrice, setMaximumPrice] = useState("30000+");
  const [brands, setBrands] = useState([]);
  const [showSortByModal, setShowSortByModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterModalObjects, setFilterModalObjects] = useState({
    price: true,
    brand: false,
  });
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [brandLoader, setbrandLoader] = useState(true);
  useEffect(() => {
    getProducts();
  }, [brand]);
  const getProducts = async () => {
    try {
      setloading(true);
      setbrandLoader(true);
      const { data } = await AxiosUserInstance.get(
        "/brandedProductsByNewestFirst",
        {
          params: { brandName: brand },
        }
      );
      const result = await AxiosUserInstance.get("/getBrands");
      if (userDetails.email) {
        const resultTwo = await AxiosUserInstance.get("/getWishlist");
        console.log(resultTwo);
        if (resultTwo?.data?.success) {
          setWishlistProducts(resultTwo?.data?.wishlist);
        }
      }

      if (result?.data?.success) {
        setBrands(result?.data?.brands);
      }
      if (data.success) {
        setProducts(data?.products);
        setForFiltering(data?.products);
      }
      setloading(false);
      setbrandLoader(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getNewestFirst = async () => {
    try {
      setloading(true);
      const { data } = await AxiosUserInstance.get(
        "/brandedProductsByNewestFirst",
        {
          params: { brandName: brand },
        }
      );
      if (data.success) {
        setProducts(data?.products);
        setSortBy({
          ...sortBy,
          newestFirst: true,
          lowToHigh: false,
          highToLow: false,
        });
        setForFiltering(data?.products);
        setMinimumPrice("0");
        setShowSortByModal(false);
      }
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getLowToHighProducts = async () => {
    try {
      setloading(true);
      const { data } = await AxiosUserInstance.get(
        "/brandedProductsByLowToHigh",
        { params: { brandName: brand } }
      );
      if (data.success) {
        setProducts(data?.products);
        setSortBy({
          ...sortBy,
          newestFirst: false,
          lowToHigh: true,
          highToLow: false,
        });
        setForFiltering(data?.products);
        setMinimumPrice("0");
        setShowSortByModal(false);
      }
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getHighToLowProducts = async () => {
    try {
      setloading(true);
      const { data } = await AxiosUserInstance.get(
        "/brandedProductsByHighToLow",
        { params: { brandName: brand } }
      );
      if (data.success) {
        setProducts(data?.products);
        setSortBy({
          ...sortBy,
          newestFirst: false,
          lowToHigh: false,
          highToLow: true,
        });
        setForFiltering(data?.products);
        setMinimumPrice("0");
        setShowSortByModal(false);
      }
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleMiniumPrice = (e) => {
    setloading(true);
    let val = e.target.value;
    val = parseInt(val);
    let newProducts = [];
    let maxPrice;
    if (maximumPrice === "30000+") {
      maxPrice = 1000000;
    } else {
      maxPrice = parseInt(maximumPrice);
    }
    for (let i of forFiltering) {
      if (parseInt(val) < i.offer_price && parseInt(maxPrice) > i.offer_price) {
        newProducts.push(i);
      }
    }
    setMinimumPrice(val);
    setProducts(newProducts);
    setShowFilterModal(false);
    setloading(false);
  };
  const handleMaximumPrice = (e) => {
    setloading(true);
    let val = e.target.value;
    if (val === "30000+") {
      val = 1000000;
    } else {
      val = parseInt(val);
    }
    let newProducts = [];
    for (let i of forFiltering) {
      if (
        parseInt(minimumPrice) < i.offer_price &&
        parseInt(val) > i.offer_price
      ) {
        console.log(i);
        newProducts.push(i);
      }
    }
    if (val === 1000000) {
      setMaximumPrice("30000+");
    } else {
      setMaximumPrice(val);
    }
    setProducts(newProducts);
    setShowFilterModal(false);
    setloading(false);
  };
  const handleBrandFilter = async (brandName) => {
    try {
      navigate(`/mobiles/${brandName}`);
      setShowFilterModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleWishlist = async (productId, status) => {
    try {
      if (status === "remove") {
        const { data } = await AxiosUserInstance.post(
          "/removeProductFromWishlist",
          {
            productId,
          }
        );
        if (data?.success) {
          getProducts();
          toast.success(data?.message);
        }
      } else {
        const { data } = await AxiosUserInstance.post("/addProductToWishlist", {
          productId,
        });
        if (data?.success) {
          getProducts();
          toast.success(data?.message);
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
  // style={{backgroundColor:"#f1f3f6"}}
  return (
    <div
      onClick={() => {
        showSortByModal === true && setShowSortByModal(false);
      }}
      className="bg-white"
    >
      <Header />
      {showSortByModal && (
        <>
          <div className=" absolute bottom-0 h-60 w-full z-10  bg-gray-100">
            <div className="border-b-4 ">
              <h2 className="py-3 px-5 text-gray-500   font-semibold">
                SORT BY
              </h2>
            </div>
            <div className="px-5 flex py-3 justify-between">
              <h2 className="text-gray-600 font-semibold">Newest First</h2>
              <input
                type="radio"
                onClick={getNewestFirst}
                checked={sortBy.newestFirst}
                className="w-4"
              />
            </div>
            <div className="px-5 flex py-3 justify-between">
              <h2 className="text-gray-600 font-semibold">
                Price -- Low to High
              </h2>
              <input
                type="radio"
                onClick={getLowToHighProducts}
                checked={sortBy.lowToHigh}
                className="w-4"
              />
            </div>
            <div className="px-5 flex py-3 justify-between">
              <h2 className="text-gray-600 font-semibold">
                Price -- High to Low
              </h2>
              <input
                type="radio"
                onClick={getHighToLowProducts}
                checked={sortBy.highToLow}
                className="w-4"
              />
            </div>
          </div>
        </>
      )}
      {showFilterModal && (
        <>
          <div className=" absolute top-0  w-full z-10 h-screen  bg-zinc-50">
            <div className="flex">
              <div className="w-[30%]">
                <div className="flex items-center gap-5 px-5 py-3">
                  <span
                    onClick={() => setShowFilterModal(false)}
                    className="text-slate-500"
                  >
                    <FaArrowLeft />
                  </span>
                  <h2 className="text-slate-700">Filters</h2>
                </div>
                <div className="bg-gray-400 h-[95vh]">
                  <div
                    onClick={() =>
                      setFilterModalObjects({
                        ...filterModalObjects,
                        brand: false,
                        price: true,
                      })
                    }
                    className={`flex ${
                      filterModalObjects.price
                        ? "text-blue-600 bg-white"
                        : "text-slate-900 "
                    } items-center gap-2 cursor-pointer px-5 py-2`}
                  >
                    <span className="">
                      <IoIosPricetag />
                    </span>
                    <h2 className="">Price</h2>
                  </div>
                  <div
                    onClick={() =>
                      setFilterModalObjects({
                        ...filterModalObjects,
                        brand: true,
                        price: false,
                      })
                    }
                    className={`flex ${
                      filterModalObjects.brand
                        ? "text-blue-600  bg-white"
                        : "text-gray-900"
                    } items-center gap-2 cursor-pointer px-5 py-2`}
                  >
                    <span className="">
                      <FaMobile />
                    </span>
                    <h2 className="">Brand</h2>
                  </div>
                </div>
              </div>
              <div className="w-[70%] pt-12 px-5">
                {filterModalObjects.price && (
                  <>
                    <div className="flex flex-wrap items-center justify-center gap-4 px-5">
                      <div className="px- border">
                        <select
                          onChange={handleMiniumPrice}
                          className="border-none"
                          value={minimumPrice}
                          name="minimum"
                          id=""
                        >
                          <option value="0">Min</option>
                          <option value="10000">10000</option>
                          <option value="20000">20000</option>
                          <option value="30000">30000</option>
                        </select>
                      </div>
                      <span>to</span>
                      <div className="px- border">
                        <select
                          value={maximumPrice}
                          onChange={handleMaximumPrice}
                          className=""
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
                  </>
                )}
                {filterModalObjects.brand && (
                  <>
                    <div className="">
                      {brands.map((brandName, index) => {
                        return (
                          <div
                            className="px-5 flex mb-2 gap-4 my- text-gray-600"
                            key={index}
                          >
                            <input
                              type="radio"
                              onClick={() =>
                                handleBrandFilter(brandName?.brand_name)
                              }
                              checked={
                                brandName.brand_name === brand ? true : false
                              }
                              className="w-4"
                              name=""
                              id=""
                            />
                            <h2>{brandName?.brand_name}</h2>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      <div
        style={{ backgroundColor: "#f0f0f0" }}
        className="bg- flex gap-3 md:pl-2  md:pr-2 md:py-2"
      >
        <div className="w-[20%] hidden md:block h-screen shadow-lg drop-shadow-lg bg-white">
          <div className="p-5 border-b">
            <h2
              style={{ color: "#212121" }}
              className="font-semibold uppercase "
            >
              Filters
            </h2>
          </div>
          <div className="border-b-4 pb-4">
            <h2
              style={{ color: "#212121" }}
              className="px-5 py-3  font-semibold uppercase"
            >
              Price
            </h2>
            <div className="flex gap-2 flex-wrap justify-center items-center px-5">
              <div className="px- border">
                <select
                  onChange={handleMiniumPrice}
                  className="border-none"
                  value={minimumPrice}
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
                  value={maximumPrice}
                  onChange={handleMaximumPrice}
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
            {brandLoader ? (
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
                        checked={brandName.brand_name === brand ? true : false}
                        className="w-4"
                        name=""
                        id=""
                      />
                      <h2>{brandName?.brand_name}</h2>
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
              onClick={() => setShowSortByModal(true)}
              className="w-[50%] flex justify-center text-gray-700 items-center gap-1 cursor-pointer"
            >
              <span>
                <HiSortDescending />
              </span>
              <h2>Sort</h2>
            </div>
            <div
              onClick={() => setShowFilterModal(true)}
              className="w-[50%] flex justify-center text-gray-700 items-center gap-1 cursor-pointer"
            >
              <span>
                <FaFilter />
              </span>
              <h2>Filter</h2>
            </div>
          </div>{" "}
          <div className="px-5 hidden md:block pt-5">
            <h2>{brand} Mobiles</h2>
          </div>
          <div className="md:flex hidden border-b">
            <span className="px-5 text-sm text-gray-600 mb-1 pt-3">
              Sort By
            </span>
            <span
              onClick={getNewestFirst}
              className={`px-5 cursor-pointer ${
                sortBy.newestFirst
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-600"
              } border-b text-sm mb- pt-3`}
            >
              Newest first
            </span>
            <span
              onClick={getLowToHighProducts}
              className={`px-5 cursor-pointer ${
                sortBy.lowToHigh
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-600"
              } border-b text-sm mb- pt-3`}
            >
              Price -- Low to High
            </span>
            <span
              onClick={getHighToLowProducts}
              className={`px-5 cursor-pointer ${
                sortBy.highToLow
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-600"
              } border-b text-sm mb- pt-3`}
            >
              Price -- High to Low
            </span>
          </div>
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
                {products.map((product, index) => {
                  let status = wishlistProducts.findIndex(
                    (pro) => pro.product._id === product._id
                  );
                  return (
                    <div key={index} className="md:flex border-b-4">
                      <div className="md:w-[40%] flex  md:block w-[100%] relative">
                        <Link
                          to={`/mobile/${product?.product_name}/${product?._id}`}
                        >
                          <div className="md:w-60 w-40 h-40 md:mx-auto  md:h-60">
                            <img
                              className="w-full p-4 h-full"
                              src={`${BaseUrl}/images/${product?.image}`}
                              alt=""
                            />
                          </div>
                        </Link>

                        {status === -1 ? (
                          <div
                            onClick={() => handleWishlist(product?._id, "add")}
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
                      <div className="md:w-[60%]   w-[100%] md:pt-6 px-7 md:pr-5">
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
  );
};
