import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import logo from "../../assets/5G.png";
import { LuBox } from "react-icons/lu";
import { RiCoupon3Fill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { FaMobile } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { AiFillThunderbolt } from "react-icons/ai";
export const SideBar = ({ hide }) => {
  const sideBarData = [
    {
      name: "Latest 5G Mobiles",
      img: <FaMobile />,
    },
    {
      name: "Most Purchased",
      img: <AiFillThunderbolt />,
    },
    {
      name: "All Brands",
      img: <FaMobile />,
    },
    {
      name: "Coupons",
      img: <RiCoupon3Fill />,
    },
    {
      name: "My Account",
      img: <FaUser />,
    },
    {
      name: "My Orders",
      img: <LuBox />,
    },
    {
      name: "My Cart",
      img: <FaShoppingCart />,
    },
    {
      name: "My Wishlist",
      img: <FaHeart />,
    },
    {
      name: "My Notifications",
      img: <IoIosNotifications />,
    },
  ];
  const { userDetails } = useSelector((state) => state.user);
  const handleShow = () => {
    hide();
  };
  return (
    <>
      <div className="absolute h-screen left-0 w-[80%] top-0 bg-white z-20">
        <div className="flex bg-blue-500 justify-between py-4 px-4">
          <div className="flex  gap-4 items-center text-white font-bold uppercase">
            <span className="text-white">
              <FaUser />
            </span>{" "}
            {userDetails.email ? (
              userDetails.first_name
            ) : (
              <Link to={"/login"}>Login & Signup</Link>
            )}
          </div>
          <div className="">
            <img
              onClick={handleShow}
              src={logo}
              className="w-7 cursor-pointer"
              alt=""
            />
          </div>
        </div>
        <div className="">
          {sideBarData.map((data, index) => {
            return (
              <>
                <div
                  key={index}
                  className={`flex items-center py-4 px-4 gap-4 ${
                    index !== 0 && "border-t"
                  }`}
                >
                  <span className="text-gray-600">{data.img}</span>
                  <span className="text-gray-600">{data.name}</span>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
