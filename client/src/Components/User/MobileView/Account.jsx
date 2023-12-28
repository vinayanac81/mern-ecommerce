import { FaRegHeart } from "react-icons/fa";
import { FiBox } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
export const MyAccount = () => {
  return (
    <div className="">
      <div style={{ backgroundColor: "#f0f0f0" }} className="">
        <div className="flex bg-white px-5 py-4 gap-4 items-center">
          <div className="">
            <Link to={"/"}>
              {" "}
              <FaArrowLeft />
            </Link>
          </div>
          <div className="font-semibold">Hey! Vinayan AC</div>
        </div>
        <div className="flex py-2 border-b-8 bg-white gap-4 px-5 justify-between ">
          <div className="border-2 w-[50%] rounded px-5 py-2">
            <button className="flex gap-2 items-center">
              <span className="text-blue-600 font-semibold">
                <FiBox />
              </span>
              <span className="font-semibold">Orders</span>
            </button>
          </div>
          <div className="border-2 w-[50%] rounded px-5 py-2">
            <button className="flex gap-2 items-center">
              <span className="text-blue-600 font-semibold">
                <FaRegHeart />
              </span>
              <span className="font-semibold">Wishlist</span>
            </button>
          </div>
        </div>
      
      </div>
    </div>
  );
};
