import { IoMdMenu } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { IoTriangle } from "react-icons/io5";
import G from "../../assets/5G.png";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineLogin } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setUserCart, setUserDetails } from "../../Toolkit/UserSlice";
import { FaSearch } from "react-icons/fa";
import { LuBox } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import { RiCoupon3Fill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { SideBar } from "./SideBar";
import { FaMobile } from "react-icons/fa";
import AxiosUserInstance from "../../Pages/User/AxiosUserInstance";
export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userDetails, userCart } = useSelector((state) => state.user);
  const [showMenu, setShowMenu] = useState(false);
  const [products, setproducts] = useState([]);
  const [showSideBar, setShowSideBar] = useState(false);
  const [showMobileBrands, setShowMobileBrands] = useState(false);
  const [brands, setBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    getInitialData();
  }, []);
  const getInitialData = async () => {
    try {
      const { data } = await AxiosUserInstance.get("/getBrands");
      const productData = await AxiosUserInstance.get("/get-all-products");
      if (userDetails.email) {
        const cartData = await AxiosUserInstance.get("/getCartProductsData");

        if (cartData?.data?.success) {
          if (cartData?.data?.cartProducts.length === 0) {
            dispatch(setUserCart(0));
            localStorage.setItem("cart", 0);
          } else {
            dispatch(setUserCart(cartData?.data?.cartProducts?.length));
            localStorage.setItem("cart", cartData?.data?.cartProducts?.length);
          }
        }
      }
      if (productData?.data?.success) {
        setproducts(productData?.data?.products);
      }
      if (data.success) {
        setBrands(data?.brands);
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
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    // Filter the data based on the search term
    const filteredResults = products.filter((item) =>
      item.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredResults);
  };
  const handleLogout = () => {
    // googleLogout();
    console.log("OK");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    navigate("/");
    dispatch(setUserDetails(""));
    dispatch(setUserCart(0));
    toast.success("Logout Successfully");
    setShowMenu(false);
  };
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <>
      <div
        // onClick={() => setShowSideBar(!showSideBar)}
        className="flex relative  justify-between px-2  md:px-48  bg-white h-16 w-full"
      >
        {showSideBar && (
          <>
            <SideBar hide={() => setShowSideBar(false)} />
          </>
        )}
        <div className="flex cursor-pointer gap-4 md:gap-10 items-center w-[60%] ">
          <div
            onClick={() => setShowSideBar(true)}
            className="text-gray-500 md:hidden text-3xl"
          >
            <IoMdMenu />
          </div>
          <div className="flex  items-center justify-center">
            <Link to={"/"}>
              <span className="self-center flex flex-col items-center text-white hover:text-gray-300 cursor-pointer whitespace-nowrap text-md md:text-xl font-extrabold ">
                <img src={G} className="w-7 h-7  " alt="" />{" "}
                <span className="text-sm text-blue-600">WORLD</span>
              </span>
            </Link>
          </div>
          <div className="w-full relative lg:block hidden">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search for Products , Brands and More"
              className="py-2 px-12 text-gray-400 outline-none border-none bg-blue-100 shadow-sm drop-shadow-sm rounded-lg w-[100%]"
              name=""
              id=""
            />
            <span className="absolute z-10 top-3 text-lg px-4 text-gray-400 left-0">
              <FaSearch />
            </span>
          </div>
        </div>
        <div className="flex gap-5 md:gap-14 items-center ">
          <Link to={"/viewcart"}>
            <div className="text-blue-600 hover:text-blue-800 cursor-pointer relative text-3xl">
              <FaShoppingCart />
              <div
                style={{
                  top: "-6px",
                  right: "-5px",
                  position: "absolute",
                  borderRadius: "5px",
                }}
                className="bg-red-600 h-4 w-4 border   text-sm text-center  "
              >
                <span
                  style={{
                    top: "-3px",
                    fontSize: "12px",
                    position: "absolute",
                    right: "3.5px",
                  }}
                  className="text-white "
                >
                  {userDetails.email ? userCart : 0}
                </span>
              </div>
            </div>
          </Link>

          <div>
            <button
              onMouseEnter={() => setShowMobileBrands(true)}
              onMouseLeave={() => setShowMobileBrands(false)}
              type="button"
              className="inline-flex text-md items-center w-full justify-center gap-x-1 rounded-md  text-blue-600 px-3 py-2  font-semibold   shadow-sm "
            >
              <span>
                <FaMobile />
              </span>
              Mobiles
              <svg
                className="-mr-1 h-5 w-5 text-blue-600"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {showMobileBrands && (
              <>
                <div
                  className="flex  justify-center"
                  onMouseEnter={() => setShowMobileBrands(true)}
                >
                  {" "}
                  <span className="absolute text-blue-600">
                    {" "}
                    <IoTriangle />
                  </span>
                </div>
              </>
            )}

            {showMobileBrands && (
              <div className="flex justify-center">
                <div
                  onMouseEnter={() => setShowMobileBrands(true)}
                  onMouseLeave={() => setShowMobileBrands(false)}
                  className="absolute  z-10 mt-3 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div className="py-1" role="none">
                    {brands.map((brand, index) => {
                      return (
                        <div key={index}>
                          <Link
                            to={`/mobiles/${brand?.brand_name}`}
                            className={`flex ${
                              index !== 0 && "border-t"
                            } gap-2 items-center text-sm px-4 uppercas font-extrabol hover:text-blue-800 text-blue-600 py-2`}
                            role="menuitem"
                            tabindex="-1"
                            id="menu-item-1"
                          >
                            <span>
                              <FaMobile />
                            </span>{" "}
                            {brand?.brand_name}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="relative inline-block text-left">
            {userDetails.email ? (
              <>
                <div>
                  <button
                    onMouseEnter={() => setShowMenu(true)}
                    onMouseLeave={() => setShowMenu(false)}
                    type="button"
                    className="inline-flex text-md items-center w-full justify-center gap-x-1 rounded-md  text-blue-600 px-3 py-2  font-semibold   shadow-sm "
                  >
                    <span>
                      <FaUserCircle />
                    </span>
                    {userDetails.first_name.charAt(0).toUpperCase() +
                      userDetails.first_name.slice(1)}
                    <svg
                      className="-mr-1 h-5 w-5 text-blue-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  className="px-4 py-2 g bg-blue-600 flex rounded text-white items-center hover:bg-blue-800"
                  onClick={handleLogin}
                >
                  Login
                  <HiOutlineLogin className="ml-1 h-5 w-5" />
                </button>
              </>
            )}

            {showMenu && (
              <>
                <div
                  className="flex  justify-center"
                  onMouseEnter={() => setShowMenu(true)}
                >
                  {" "}
                  <span className="absolute text-blue-600">
                    {" "}
                    <IoTriangle />
                  </span>
                </div>
              </>
            )}

            {showMenu && (
              <div className="flex justify-center">
                <div
                  onMouseEnter={() => setShowMenu(true)}
                  onMouseLeave={() => setShowMenu(false)}
                  className="absolute  z-10 mt-3 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div className="py-1" role="none">
                    <a
                      href="/account"
                      className="flex  gap-2 items-center text-sm px-4 uppercas font-extrabol text-blue-600 py-2"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-0"
                    >
                      <span>
                        {" "}
                        <FaUserCircle />
                      </span>{" "}
                      My Profile
                    </a>
                    <a
                      href="/account/orders"
                      className="flex border-t gap-2 items-center text-sm px-4 uppercas font-extrabol text-blue-600 py-2"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-1"
                    >
                      <span>
                        <LuBox />
                      </span>{" "}
                      Orders
                    </a>
                    <a
                      href="#"
                      className="flex border-t gap-2 items-center text-sm px-4 uppercas font-extrabol text-blue-600 py-2"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-1"
                    >
                      <span>
                        <FaHeart />
                      </span>{" "}
                      Wishlist
                    </a>
                    <a
                      href="#"
                      className="flex border-t gap-2 items-center text-sm px-4 uppercas font-extrabol text-blue-600 py-2"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-1"
                    >
                      <span>
                        <RiCoupon3Fill />
                      </span>{" "}
                      Coupons
                    </a>

                    <button
                      type="submit"
                      onClick={handleLogout}
                      className=" flex border-t gap-2 items-center text-blue-600 w-full px-4 py-2 text-left text-sm"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-3"
                    >
                      <span>
                        <LuLogOut />
                      </span>{" "}
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
