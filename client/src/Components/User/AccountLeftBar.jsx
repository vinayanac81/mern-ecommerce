import { useEffect, useState } from "react";
import AxiosUserInstance from "../../Pages/User/AxiosUserInstance";
import { NameCard } from "./Account/NameCard";
import { LeftMenuCard } from "./Account/LeftMenuCard";
export const AccountLeftBar = ({ leftActiveTab }) => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    mobileNumber: "",
  });
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
    <>
      <div className="w-[30%] ">
        <NameCard />
        <LeftMenuCard leftActiveTab={leftActiveTab} />
      </div>
    </>
  );
};
