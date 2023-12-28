import { Link } from "react-router-dom";
import { MdTask } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoMdWallet } from "react-icons/io";
import { MdFolderShared } from "react-icons/md";
import { FaPowerOff } from "react-icons/fa";
export const LeftMenuCard = ({ leftActiveTab }) => {
  return (
    <>
      <div className="bg-white">
        <div className="flex justify-between py-4 border-b-2 px-4 ">
          <div className="flex items-center gap-4 ">
            <span style={{ fontSize: "24px" }} className="text-blue-600">
              <MdTask />
            </span>
            <span style={{ color: "#212121" }} className=" font-bold">
              MY ORDERS
            </span>
          </div>
          <div
            style={{ color: "#212121", fontSize: "24px" }}
            className=" text-slate-500 font-semibold"
          >
            <MdOutlineArrowForwardIos />
          </div>
        </div>
        <div className="pb-2 pt-2 border-b-2">
          <div className="flex px-4 pt-2 pb-2 ">
            <div className="flex items-center gap-4 ">
              <span style={{ fontSize: "24px" }} className="text-blue-600">
                <FaUser />
              </span>
              <span
                style={{ color: "#212121" }}
                className=" uppercase font-semibold"
              >
                Account Settings
              </span>
            </div>
          </div>
          <div className="">
            <h2
              className={`pt-2 pb-2 text-sm px-14 ${
                leftActiveTab === "profileInfo" && "text-blue-500 bg-blue-50"
              }   hover:text-blue-500 hover:bg-blue-50`}
            >
              <Link to={"/account"}> Profile Information</Link>
            </h2>
          </div>
          <div className="">
            <h2
              className={`pt-2 pb-2 text-sm px-14 ${
                leftActiveTab === "addresses" && "text-blue-500 bg-blue-50"
              }   hover:text-blue-500 hover:bg-blue-50`}
            >
              <Link to={"/account/addresses"}> Manage Addresses</Link>
            </h2>
          </div>
        </div>
        <div className="py-2 border-b-2 ">
          <div className="flex px-4 pt-2 pb-2 ">
            <div className="flex items-center gap-4 ">
              <span style={{ fontSize: "24px" }} className="text-blue-600">
                <IoMdWallet />
              </span>
              <span className=" uppercase font-semibold">Payments</span>
            </div>
          </div>
          <div className="">
            <h2 className="pt-2 pb-2  text-sm px-14  ">Wallet</h2>
          </div>
        </div>
        <div className="py-2 border-b-2 ">
          <div className="flex px-4 pt-2 pb-2 ">
            <div className="flex items-center gap-4 ">
              <span style={{ fontSize: "24px" }} className="text-blue-600">
                <MdFolderShared />
              </span>
              <span className=" uppercase font-semibold">My stuff</span>
            </div>
          </div>
          <div className="">
            <h2 className="pt-2 pb-2  text-sm px-14 ">My Coupons</h2>
          </div>
          <div className="">
            <h2 className="pt-2 pb-2  text-sm px-14 ">My Reviews & Ratings</h2>
          </div>
          <div className="">
            <h2
              className={`pt-2 pb-2 text-sm px-14 ${
                leftActiveTab === "wishlist" && "text-blue-500 bg-blue-50"
              }   hover:text-blue-500 hover:bg-blue-50`}
            >
              <Link to={"/wishlist"}> Wishlist</Link>
            </h2>
          </div>
        </div>
        <div className="py-2  ">
          <div className="flex px-4 pt-2 pb-2 ">
            <div className="flex items-center gap-4 ">
              <span style={{ fontSize: "24px" }} className="text-blue-600">
                <FaPowerOff />
              </span>
              <span className=" pb-1 uppercase font-semibold">Logout</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
