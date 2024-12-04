import React, { useEffect, useState } from "react";
import LeftLayout from "../../Components/Admin/LeftLayout";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../Constants";
import Header from "../../Components/Admin/Header";

const Coupen = () => {
  const navigate = useNavigate();
  // const history = useHistory();
  const [coupens, setcoupens] = useState([]);
  const handleNavigate = () => {
    navigate("/admin/add-coupen");
  };
  const getCoupens = async () => {
    try {
      const { data } = await AxiosInstance.get("/admin/get-coupens");
      if (data.success) {
        setcoupens(data?.coupens);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCoupens();
  }, []);
  console.log(coupens);
  return (
    <div>
      <div x-data="setup()" class="{ 'dark': isDark }">
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
        <Header/>
          <LeftLayout active="coupon" />
          <div className="h-full  flex flex-col ml-14 mt-14 mb-10 md:ml-64">
            <div className="flex px-7 py-10">
              <button
                onClick={handleNavigate}
                className="bg-emerald-400 rounded hover:bg-emerald-700 px-5 py-2 "
              >
                Add coupen
              </button>
            </div>
            <div className="mt-4 mx-4">
              <div className="w-full overflow-hidden rounded-lg shadow-xs">
                <div className="w-full overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                        <th className="px-4 py-3">Coupon Name</th>
                        <th className="px-4 py-3">Coupon Code</th>
                        <th className="px-4 py-3">Discount percentage</th>
                        <th className="px-4 py-3">Minimum purchase amount</th>
                        <th className="px-4 py-3">Maximum discount</th>
                        <th className="px-4 py-3">Create date</th>
                        <th className="px-4 py-3">Expiry date</th>
                        <th className="px-4 py-3"></th>
                        <th className="px-4 py-3"></th>{" "}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                      {coupens.map((coupen) => {
                        return (
                          <>
                            <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                              <td className="px-4 py-3 text-sm">
                                {coupen?.name.toUpperCase()}
                              </td>
                              <td className="px-4 py-3 text-xs">
                                <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                                  {coupen?.code}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {coupen?.discount}%
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {coupen?.min_amount}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {coupen?.max_discount}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {coupen?.create_date.slice(0, 10)}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {coupen?.expiry_date.slice(0, 10)}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <button 
                                  onClick={() =>
                                    navigate(
                                      `/admin/${coupen?.name}/${coupen?._id}`
                                    )
                                  }
                                  className="px-4 py-2 bg-blue-800 rounded"
                                >
                                  Edit
                                </button>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <button className="px-4 py-2 bg-emerald-800 rounded">
                                  Delete
                                </button>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupen;
