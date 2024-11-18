import { useEffect, useState } from "react";
import { AccountLeftBar } from "../../Components/User/AccountLeftBar";
import { Footer } from "../../Components/User/Footer";
import { Header } from "../../Components/User/Header";
import AxiosUserInstance from "./AxiosUserInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
export const Addresses = () => {
  const navigate = useNavigate();
  const [addresses, setaddresses] = useState([]);
  const [noAddress, setnoAddress] = useState(false);
  const [addAddress, setaddAddress] = useState(false);
  const [addressData, setaddressData] = useState({
    name: "",
    mobileNumber: "",
    district: "",
    pincode: "",
    address: "",
    place: "",
    state: "",
  });
  useEffect(() => {
    getInitialData();
  }, []);
  const getInitialData = async () => {
    try {
      const addressData = await AxiosUserInstance.get("/getAddressData");
      if (addressData?.data?.noAddress) {
        setnoAddress(true);
      } else {
        setnoAddress(false);
        setaddresses(addressData?.data?.address);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddress = async () => {
    try {
      const { data } = await AxiosUserInstance.post("/addAddress", {
        addressData,
      });
      if (data?.success) {
        getInitialData();
        setaddAddress(false);
        toast.success(data?.message);
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
        navigate("/");
        toast.error("Please login");
      }
    }
  };
  return (
    <div>
      <Header />
      <div className="bg-gray-300 pt-4 h-screen px-40">
        <div className="gap-3 h-screen flex">
          <AccountLeftBar leftActiveTab={"addresses"} />
          <div
            style={{
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
            className="w-[70%] h-[89%] bg-white"
          >
            {addAddress ? (
              <div className="px-8 py-8">
                <h2 style={{ color: "#1c2841" }} className="font-bold pb-4">
                  Manage Addresses
                </h2>
                <div className="border-2 bg-blue-100 px-4 py-4">
                  <h2
                    className="text-blue-600 uppercase font-bold"
                  >
                    add a new address
                  </h2>
                  <div className="flex mt-5 w-full gap-5">
                    <div className="w-[35%]">
                      <input
                        type="text"
                        placeholder="Name"
                        onChange={(e) =>
                          setaddressData({
                            ...addressData,
                            name: e.target.value,
                          })
                        }
                        value={addressData.name}
                        className="rounded w-full border-2 pt-3 pb-3 border-gray-300"
                        name=""
                        id=""
                      />
                    </div>
                    <div className="w-[35%]">
                      <input
                        type="text"
                        onChange={(e) =>
                          setaddressData({
                            ...addressData,
                            mobileNumber: e.target.value,
                          })
                        }
                        value={addressData.mobileNumber}
                        placeholder="Mobile number"
                        className="rounded w-full border-2 pt-3 pb-3 border-gray-300"
                        name=""
                        id=""
                      />
                    </div>
                  </div>
                  <div className="flex mt-5 w-full gap-5">
                    <div className="w-[35%]">
                      <input
                        type="text"
                        onChange={(e) =>
                          setaddressData({
                            ...addressData,
                            pincode: e.target.value,
                          })
                        }
                        value={addressData.pincode}
                        placeholder="Pincode"
                        className="rounded w-full  border-2 pt-3 pb-3 border-gray-300"
                        name=""
                        id=""
                      />
                    </div>
                    <div className="w-[35%]">
                      <input
                        type="text"
                        placeholder="Place"
                        onChange={(e) =>
                          setaddressData({
                            ...addressData,
                            place: e.target.value,
                          })
                        }
                        value={addressData.place}
                        className="rounded  w-full border-2 pt-3 pb-3 border-gray-300"
                        name=""
                        id=""
                      />
                    </div>
                  </div>
                  <div className="flex mt-5 w-full gap-5">
                    <div className="w-[73%]">
                      <textarea
                        type="text"
                        placeholder="Address"
                        onChange={(e) =>
                          setaddressData({
                            ...addressData,
                            address: e.target.value,
                          })
                        }
                        value={addressData.address}
                        className="rounded w-full  border-2 pt-3 pb-3 border-gray-300"
                        name=""
                        id=""
                      />
                    </div>
                  </div>
                  <div className="flex mt-3 w-full gap-5">
                    <div className="w-[35%]">
                      <input
                        type="text"
                        placeholder="District"
                        onChange={(e) =>
                          setaddressData({
                            ...addressData,
                            district: e.target.value,
                          })
                        }
                        value={addressData.district}
                        className="rounded w-full  border-2 pt-3 pb-3 border-gray-300"
                        name=""
                        id=""
                      />
                    </div>
                    <div className="w-[35%]">
                      <select
                        className="rounded w-full text-gray-500  border-2 pt-3 pb-3 border-gray-300"
                        name=""
                        onChange={(e) =>
                          setaddressData({
                            ...addressData,
                            state: e.target.value,
                          })
                        }
                        value={addressData.state}
                        id=""
                      >
                        <option value="select">Select state</option>
                        <option value="kerala">Kerala</option>
                        <option value="tamilnadu">Tamilnadu</option>
                        <option value="karnataka">Karnataka</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex mt-5 w-full gap-10 items-center">
                    <button
                      onClick={handleAddress}
                      className="uppercase bg-blue-600 px-16 rounded-sm py-2 text-white"
                    >
                      Save
                    </button>
                    <span
                      onClick={() => setaddAddress(false)}
                      className="uppercase cursor-pointer text-sm text-blue-600 font-bold"
                    >
                      Cancel
                    </span>
                  </div>
                </div>
              </div>
            ) : noAddress ? (
              <div className="h-full flex flex-col justify-center items-center  w-full">
                <h2
                  style={{ fontFamily: "Robert,Arial,sans-serif" }}
                  className="font-semibold text-lg text-slate-800 "
                >
                  No Addresses found in your account!
                </h2>
                <div className="">
                  <button
                    onClick={() => setaddAddress(true)}
                    className="uppercase mt-3 bg-blue-700 py-2 px-10 text-white font-semibold rounded-sm"
                  >
                    Add addresses
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-8 py-8">
                <h2 style={{ color: "#1c2841" }} className="font-bold pb-4">
                  Manage Addresses
                </h2>
                <div  onClick={() => setaddAddress(true)} className="flex items-center gap-5 border-2 rounded-sm py-3 text-blue-600 font-bold px-6">
                  <span>
                    <FaPlus />
                  </span>
                  <span className="uppercase">Add a new address</span>
                </div>
                {addresses.map((address) => {
                  return (
                    <>
                      <div className=" mt-6 items-center gap-5 border-2 rounded-sm py-3 text-blue-600 font-bold px-6">
                        <div className="flex justify-between w-full items-center">
                          <h2 className="bg-gray-200 text-slate-500 px-2 py-1 text-sm">
                            HOME
                          </h2>
                          <div className="text-gray-600">
                            <HiDotsVertical />
                          </div>
                        </div>
                        <div className="flex mt-3 text-black  gap-6">
                          <h2>{address?.name}</h2>
                          <h2>{address.mobile_number}</h2>
                        </div>
                        <div className="text-gray-600">{address?.address}</div>
                        <div className="text-gray-600">
                          {address?.district} District,{" "}
                          <span>
                            {address?.state} - {address?.pincode}
                          </span>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bg-black py-10">
        <Footer />
      </div>
    </div>
  );
};
