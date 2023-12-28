import { useEffect, useState } from "react";
import { Header } from "../../Components/User/Header";
import AxiosUserInstance from "./AxiosUserInstance";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../Toolkit/UserSlice";
import { IoIosClose } from "react-icons/io";
import { AccountLeftBar } from "../../Components/User/AccountLeftBar";
import { useMediaQuery } from "../../Hooks/MediaQuery";
import { MyAccount } from "../../Components/User/MobileView/Account";
export const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    mobileNumber: "",
  });
  const [changedUserInfo, setChangedUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    mobileNumber: "",
  });
  const [editFirstOrLastName, seteditFirstOrLastName] = useState(false);
  const [editEmailAddress, setEditEmailAddress] = useState(false);
  const [showModalForOtp, setShowModalForOtp] = useState(false);
  const [emailOtpInputBoxClicked, setEmailOtpInputBoxClicked] = useState(false);
  const [otpForChangeEmail, setOtpForChangeEmail] = useState("");
  useEffect(() => {
    getInitialData();
  }, []);
  const getInitialData = async () => {
    try {
      const userData = await AxiosUserInstance.get("/getUserInfo");
      if (userData?.data?.success) {
        setUserInfo({
          ...userInfo,
          firstName: userData?.data?.userInfo?.first_name,
          lastName: userData?.data?.userInfo?.last_name,
          email: userData?.data?.userInfo?.email,
          mobileNumber: userData?.data?.userInfo?.mobile,
          gender: userData?.data?.userInfo?.gender,
        });
        setChangedUserInfo({
          ...changedUserInfo,
          firstName: userData?.data?.userInfo?.first_name,
          lastName: userData?.data?.userInfo?.last_name,
          email: userData?.data?.userInfo?.email,
          mobileNumber: userData?.data?.userInfo?.mobile,
          gender: userData?.data?.userInfo?.gender,
        });
        seteditFirstOrLastName(false);
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
  const updateFirstOrLastName = async () => {
    try {
      const { data } = await AxiosUserInstance.post(
        "/updateFirstOrLastNameOrGender",
        {
          firstName: changedUserInfo.firstName,
          lastName: changedUserInfo.lastName,
          gender: changedUserInfo.gender,
        }
      );
      if (data?.success) {
        dispatch(setUserDetails(data.user));
        localStorage.setItem("user", JSON.stringify(data.user));
        getInitialData();
        toast.success(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateEmail = async () => {
    try {
      if (changedUserInfo.email === userInfo.email) {
        toast.error("New email is same as existing email");
        setEditEmailAddress(false);
      } else {
        const { data } = await AxiosUserInstance.post("/updateEmailAddress", {
          email: changedUserInfo.email,
        });
        if (data.success) {
          toast.success(data.message);
          setShowModalForOtp(true);
          setEditEmailAddress(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const verifyOtpForUpdateEmailAddress = async () => {
    try {
      const { data } = await AxiosUserInstance.post(
        "/verifyOtpForUpdateEmailAddress",
        { otp: otpForChangeEmail, email: changedUserInfo.email }
      );
      if (data.success) {
        setShowModalForOtp(false);
        dispatch(setUserDetails(data.user));
        localStorage.setItem("user", JSON.stringify(data.user));
        getInitialData();
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const isRowBased = useMediaQuery("(min-width: 768px)");
  console.log(isRowBased);
  return (
    <div>
      {showModalForOtp && (
        <>
          <div className="h-screen absolute z-10 w-full bg-opacity-60 bg-slate-600">
            <div className="h-screen w-full flex justify-center items-center">
              {" "}
              <div className="w-[30rem] relative h-64 bg-white mx-auto ">
                <h2 className="uppercase font-extrabold pt-10 px-10">
                  Verify OTP
                </h2>
                <div
                  onClick={() => {
                    setShowModalForOtp(false),
                      setChangedUserInfo({
                        ...changedUserInfo,
                        email: userInfo.email,
                      });
                  }}
                  className="absolute cursor-pointer top-0 right-0 text-4xl"
                >
                  <IoIosClose />
                </div>
                <div className="py-8 relative px-10">
                  <input
                    type="number"
                    placeholder={` Enter OTP sent to ${changedUserInfo.email}`}
                    className={"py-4   px-4 border-2 w-full"}
                    name=""
                    onChange={(e) => setOtpForChangeEmail(e.target.value)}
                    onClick={() => setEmailOtpInputBoxClicked(true)}
                    id=""
                  />
                </div>
                <div className="px-10">
                  <button
                    onClick={verifyOtpForUpdateEmailAddress}
                    className="w-full uppercase bg-blue-600 py-2 text-white font-semibold"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {isRowBased && <Header />}

      {isRowBased ? (
        <div
          style={{ backgroundColor: "#f0f0f0" }}
          className=" py-2 h-scree px-10"
        >
          <div className="gap-3 h-screen flex">
            <AccountLeftBar leftActiveTab={"profileInfo"} />
            <div className="w-[70%] h-[89%] bg-white">
              <div className="flex items-center gap-6 pt-6 px-8">
                <h2 className="font-semibold uppercase">
                  Personal Information
                </h2>
                {editFirstOrLastName ? (
                  <span
                    onClick={() => {
                      seteditFirstOrLastName(false),
                        setChangedUserInfo({
                          ...changedUserInfo,
                          firstName: userInfo.firstName,
                          lastName: userInfo.lastName,
                          gender: userInfo.gender,
                        });
                    }}
                    className="text-sm text-blue-600 cursor-pointer font-semibold"
                  >
                    Cancel
                  </span>
                ) : (
                  <span
                    onClick={() => seteditFirstOrLastName(true)}
                    className="text-sm text-blue-600 cursor-pointer font-semibold"
                  >
                    Edit{" "}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap relative gap-2 px-8 mt-6">
                {editFirstOrLastName ? (
                  <div className="">
                    <input
                      type="text"
                      onChange={(e) =>
                        setChangedUserInfo({
                          ...changedUserInfo,
                          firstName: e.target.value,
                        })
                      }
                      value={changedUserInfo?.firstName}
                      className="border-2 text-sm font-semibold border-gray-300 px-4 ${
                pt-5 pb-1 bg-white"
                    />
                    {editFirstOrLastName && (
                      <div
                        style={{ fontSize: "10px" }}
                        className="absolute    z-10 px-4 text-gray-800 top-2"
                      >
                        First Name
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="">
                    <input
                      type="text"
                      value={userInfo?.firstName}
                      disabled
                      className="border-2 text-gray-400 text-sm font-semibold border-gray-300 px-4 
                py-2.5
                pb- bg-gray-200"
                    />
                    {editFirstOrLastName && (
                      <div
                        style={{ fontSize: "10px" }}
                        className="absolute    z-10 px-4 text-gray-800 top-2"
                      >
                        First Name
                      </div>
                    )}
                  </div>
                )}
                {editFirstOrLastName ? (
                  <div className="">
                    <input
                      type="text"
                      value={changedUserInfo?.lastName}
                      onChange={(e) =>
                        setChangedUserInfo({
                          ...changedUserInfo,
                          lastName: e.target.value,
                        })
                      }
                      className="border-2  text-sm font-semibold border-gray-300 px-4
                pt-5 pb-1 bg-white"
                    />
                    {editFirstOrLastName && (
                      <div
                        style={{ fontSize: "10px" }}
                        className="absolute    z-10 px-4 text-gray-800 top-2"
                      >
                        Last Name
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="">
                    <input
                      type="text"
                      value={userInfo?.lastName}
                      disabled
                      className="border-2 text-gray-400 text-sm font-semibold border-gray-300 px-4 
                py-2.5
                pb- bg-gray-200"
                    />
                    {editFirstOrLastName && (
                      <div
                        style={{ fontSize: "10px" }}
                        className="absolute    z-10 px-4 text-gray-800 top-2"
                      >
                        First Name
                      </div>
                    )}
                  </div>
                )}
                {editFirstOrLastName && (
                  <div className="">
                    <button
                      onClick={updateFirstOrLastName}
                      className="bg-blue-600 text-white py-3 px-10 rounded uppercase font-bold"
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
              <div className="px-8 mt-6">
                <h2
                  style={{ fontFamily: "Robert,Arial,sans-serif" }}
                  className="font-semibold text-gray-400"
                >
                  Your Gender
                </h2>
                {editFirstOrLastName ? (
                  <div className="flex gap-12 mt-2">
                    <div className="flex gap-2 items-center text-gray-400 font-semibold">
                      <input
                        type="radio"
                        checked={
                          changedUserInfo.gender === "Male" ? true : false
                        }
                        className="w-4 h-4 checked:bg-blue-600"
                        name=""
                        onChange={() =>
                          setChangedUserInfo({
                            ...changedUserInfo,
                            gender: "Male",
                          })
                        }
                        id=""
                      />
                      <span>Male</span>
                    </div>
                    <div className="flex gap-2 items-center text-gray-400 font-semibold">
                      <input
                        type="radio"
                        onChange={() =>
                          setChangedUserInfo({
                            ...changedUserInfo,
                            gender: "Female",
                          })
                        }
                        checked={
                          changedUserInfo.gender === "Female" ? true : false
                        }
                        className="w-4 h-4 checked:bg-blue-600"
                        name=""
                        id=""
                      />
                      <span>Female</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-12 mt-2">
                    <div className="flex gap-2 items-center text-gray-400 font-semibold">
                      <input
                        type="radio"
                        checked={
                          changedUserInfo.gender === "Male" ? true : false
                        }
                        className="w-4 h-4 checked:bg-gray-400"
                        name=""
                        disabled
                        id=""
                      />
                      <span>Male</span>
                    </div>
                    <div className="flex gap-2 items-center text-gray-400 font-semibold">
                      <input
                        type="radio"
                        disabled
                        checked={
                          changedUserInfo.gender === "Female" ? true : false
                        }
                        className="w-4 h-4 checked:bg-gray-400"
                        name=""
                        id=""
                      />
                      <span>Female</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-6 pt-8 px-8 ">
                <h2 className="font-semibold uppercase">Email Address</h2>
                {editEmailAddress ? (
                  <span
                    onClick={() => {
                      setEditEmailAddress(false),
                        setChangedUserInfo({
                          ...changedUserInfo,
                          email: userInfo.email,
                        });
                    }}
                    className="text-sm text-blue-600 cursor-pointer font-semibold"
                  >
                    Cancel
                  </span>
                ) : (
                  <span
                    onClick={() => setEditEmailAddress(true)}
                    className="text-sm text-blue-600 cursor-pointer font-semibold"
                  >
                    Edit{" "}
                  </span>
                )}
              </div>
              <div className="flex relative gap-2 px-8 mt-6">
                {editEmailAddress ? (
                  <div className="">
                    <input
                      type="email"
                      onChange={(e) =>
                        setChangedUserInfo({
                          ...changedUserInfo,
                          email: e.target.value,
                        })
                      }
                      value={changedUserInfo?.email}
                      className="border-2 text-sm font-semibold border-gray-300 px-4 ${
                pt-5 pb-1 bg-white"
                    />
                    {editEmailAddress && (
                      <div
                        style={{ fontSize: "10px" }}
                        className="absolute    z-10 px-4 text-gray-800 top-2"
                      >
                        Email Address
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="">
                    <input
                      type="text"
                      value={changedUserInfo?.email}
                      disabled
                      className="border-2 text-sm text-gray-400 font-semibold border-gray-300 px-4 
                py-2.5
                pb- bg-gray-200"
                    />
                    {editEmailAddress && (
                      <div
                        style={{ fontSize: "10px" }}
                        className="absolute    z-10 px-4 text-gray-800 top-2"
                      >
                        Email Address
                      </div>
                    )}
                  </div>
                )}

                {editEmailAddress && (
                  <div className="">
                    <button
                      onClick={updateEmail}
                      className="bg-blue-600 text-white py-3 px-10 rounded uppercase font-bold"
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
      <MyAccount/>
      )}
    </div>
  );
};
