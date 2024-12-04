import React, { useState } from "react";
import LeftLayout from "../../Components/Admin/LeftLayout";
import AxiosInstance from "../../Constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Admin/Header";

const AddCoupen = () => {
    const navigate=useNavigate()
  const [coupenData, setcoupenData] = useState({
    coupenName: "",
    coupenCOde: "",
    discountPercentage: "",
    minimumPurchaseAmount: "",
    maximumDiscount: "",
    createDate: "",
    expiryDate: "",
  });
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await AxiosInstance.post("/admin/add-coupen", {
        coupenData,
      });
      if(data.success){
        toast.success(data?.message)
        navigate("/admin/coupen")
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div x-data="setup()" class="{ 'dark': isDark }">
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
          <Header/>
          <LeftLayout active="coupen" />
          <div className="h-full  flex flex-col ml-14 mt-14 mb-10 md:ml-64">
            <div className="flex px-10 py-5">
              <h2 className="font-bold text-xl">Add Coupen</h2>
            </div>
            <div className="flex px-10 flex-col">
              <label htmlFor="coupenName">Coupen Name</label>
              <input
                type="text"
                onChange={(e) =>
                  setcoupenData({ ...coupenData, coupenName: e.target.value })
                }
                value={coupenData.coupenName}
                className="mt-1 text-gray-700 py-2 px-2 rounded max-w-lg"
                name=""
                id=""
              />
            </div>
            <div className="flex px-10 flex-col">
              <label htmlFor="coupenName">Coupen Code</label>
              <input
                type="text"
                className="mt-1 text-gray-700 py-2 px-2 rounded max-w-lg"
                name=""
                onChange={(e) =>
                  setcoupenData({ ...coupenData, coupenCOde: e.target.value })
                }
                value={coupenData.coupenCOde}
                id=""
              />
            </div>
            <div className="flex px-10 flex-col">
              <label htmlFor="coupenName">Discount Percentage</label>
              <input
                type="text"
                onChange={(e) =>
                  setcoupenData({
                    ...coupenData,
                    discountPercentage: e.target.value,
                  })
                }
                value={coupenData.discountPercentage}
                className="mt-1 text-gray-700 py-2 px-2 rounded max-w-lg"
                name=""
                id=""
              />
            </div>
            <div className="flex px-10 flex-col">
              <label htmlFor="coupenName">Minimum Percentage Amount</label>
              <input
                type="text"
                onChange={(e) =>
                  setcoupenData({
                    ...coupenData,
                    minimumPurchaseAmount: e.target.value,
                  })
                }
                value={coupenData.minimumPercentageAmount}
                className="mt-1 text-gray-700 py-2 px-2 rounded max-w-lg"
                name=""
                id=""
              />
            </div>
            <div className="flex px-10 flex-col">
              <label htmlFor="coupenName">Maximum Discount</label>
              <input
                type="text"
                onChange={(e) =>
                  setcoupenData({
                    ...coupenData,
                    maximumDiscount: e.target.value,
                  })
                }
                value={coupenData.maximumDiscount}
                className="mt-1 text-gray-700 py-2 px-2 rounded max-w-lg"
                name=""
                id=""
              />
            </div>
            <div className="flex px-10 flex-col">
              <label htmlFor="createDate">Create Date</label>
              <input
                type="date"
                onChange={(e) =>
                  setcoupenData({ ...coupenData, createDate: e.target.value })
                }
                value={coupenData.createDate}
                className="mt-1 text-gray-700 py-2 px-2 rounded max-w-lg"
                name=""
                id=""
              />
            </div>
            <div className="flex px-10 flex-col">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input
                type="date"
                onChange={(e) =>
                  setcoupenData({ ...coupenData, expiryDate: e.target.value })
                }
                value={coupenData.expiryDate}
                className="mt-1 text-gray-700 py-2 px-2 rounded max-w-lg"
                name=""
                id=""
              />
            </div>
            <div className="flex px-10">
              <button
                onClick={handleSubmit}
                className="mt-3 bg-emerald-500 hover:bg-emerald-800 py-2 rounded px-10"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCoupen;
