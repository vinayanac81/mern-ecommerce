import { FaFacebook } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="">
      <div className="gap-20 text-white px-28 justify-between flex">
        <div className="w-[25%]">
          <h2 className="mb-5 font-extrabold">About Us</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto
            sunt recusandae natus placeat doloremque, excepturi praesentium
          </p>
        </div>
        <div className="w-[25%]">
          <h2 className="mb-5 font-extrabold">Newsletter</h2>
          <p className="mb-5">Stay update with our latest</p>
          <div className="flex">
            <input
              placeholder="Enter email"
              className="px-4 text-gray-600 outline-none"
              type="text"
              name=""
              id=""
            />
            <button className="bg-orange-600 hover:bg-orange-800 px-4 py-2">
              Submit
            </button>
          </div>
        </div>
        <div className="w-[25%]">
          <h2 className="mb-5 font-extrabold">Mail Us</h2>
          <p className="mb-5">
            5G WORLD Private Limited, Pattambi Road, Edappal, Malappuram,
            579678, Kerala, India
          </p>
        </div>
        <div className="w-[25%]">
          <h2 className="mb-5 font-extrabold">Follow Us</h2>
          <p className="mb-5">Let us be social</p>
          <div className="flex gap-2 text-2xl">
            <Link>
              <FaSquareGithub />
            </Link>
            <Link>
              <FaLinkedin />
            </Link>
            <Link>
              <FaInstagramSquare />
            </Link>
            <Link>
              <FaFacebook />
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full text-white mt-5 text-center">
      Copyright ©{new Date().getFullYear()} All rights reserved
      </div>
    </div>
  );
};
