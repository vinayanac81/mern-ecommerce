import React, { useEffect, useState } from "react";
import LeftLayout from "../../Components/Admin/LeftLayout";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import AdminNav from "../../Components/Admin/AdminNav";
import AxiosInstance, { BaseUrl } from "../../Constants";

import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../../Components/Admin/Header";
const AdminCategory = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const [showAddLatest5G, setShowAddLatest5G] = useState(false);
  const [deletePopup, setdeletePopup] = useState(false);
  const [deleteProductDetails, setdeleteProductDetails] = useState({
    productId: "",
    _id: "",
  });
  const [latestMobiles, setLatestMobiles] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    getLatest5GMobiles();
  }, []);
  const getLatest5GMobiles = async () => {
    try {
      setloading(true);
      const { data } = await AxiosInstance.get("/admin/latest5GMobiles");
      setloading(false);
      console.log(data);
      if (data.success) {
        setLatestMobiles(data?.latest);
        setAllProducts(data?.allProducts);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = (id, productId) => {
    console.log(productId, id);
    setdeleteProductDetails({
      ...deleteProductDetails,
      productId: productId,
      _id: id,
    });
    setdeletePopup(true);
  };
  const confirmDelete = async () => {
    try {
      const { data } = await AxiosInstance.post("/admin/deleteLatestMobile", {
        deleteProductDetails,
      });
      if (data.success) {
        toast.success(data.message);
        getLatest5GMobiles();
        setdeletePopup(false)
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addToLatest = async (id) => {
    try {
      const { data } = await AxiosInstance.post("/admin/addToLastestMobiles", {
        id,
      });
      if (data?.success) {
        setShowAddLatest5G(false);
        getLatest5GMobiles();
        toast.success("Added successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
          <Header />
          <LeftLayout active="latest5G" />
          {loading && (
            <>
              <div className="w-full  h-screen flex justify-center items-center">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </>
          )}
          <div className="h-full flex flex-col ml-14 mt-14 mb-10 md:ml-64">
            <div className="py-4 px-8">
              <Card className="max-w-sm ml-auto">
                <Button
                  onClick={() => setShowAddLatest5G(true)}
                  color="green"
                  type="submit"
                >
                  ADD LATEST 5G MOBILES
                </Button>
              </Card>
            </div>
            <div className="px-8">
              <div className="w-full overflow-hidden rounded-lg shadow-xs">
                <div className="w-full overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                        <th className="px-4 text-center py-3">Sl No</th>
                        <th className="px-4 text-center py-3">Mobile Name</th>
                        <th className="px-4 text-center py-3">Image</th>
                        <th className="px-4 text-center py-3">Option</th>
                      </tr>
                    </thead>
                    <div className="">
                      <Modal
                        show={showAddLatest5G}
                        size="4xl"
                        onClose={() => setShowAddLatest5G(false)}
                        popup
                      >
                        <Modal.Header />
                        <Modal.Body>
                          <div className="px-8 mb-4">
                            <div className="w-full overflow-hidden rounded-lg shadow-xs">
                              <div className="w-full overflow-x-auto">
                                <table className="w-full">
                                  <thead>
                                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                      <th className="px-4 text-center py-3">
                                        Sl No
                                      </th>
                                      <th className="px-4 text-center py-3">
                                        Mobile Name
                                      </th>
                                      <th className="px-4 text-center  py-3">
                                        Image
                                      </th>
                                      <th className="px-4 text-center  py-3">
                                        Option
                                      </th>
                                    </tr>
                                  </thead>

                                  <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                    {allProducts.map((product, id) => {
                                      product?.latestFiveGMobiles === false && (
                                        <></>
                                      );
                                      return (
                                        <>
                                          {product?.latestFiveGMobiles ===
                                            false && (
                                            <>
                                              <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                                                <td className="px-4  py-3">
                                                  <div className="flex items-center text-sm">
                                                    <div>
                                                      <p className="font-semibold">
                                                        {id + 1}
                                                      </p>
                                                    </div>
                                                  </div>
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                  {product?.product_name}
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                  <div className="w-20 h-20 py-2">
                                                    <img
                                                      src={`${BaseUrl}/images/${product?.image}`}
                                                      className="w-full h-full"
                                                      alt=""
                                                    />
                                                  </div>
                                                </td>
                                                <td className="px-4 py-3 justify-center flex gap-4 text-xs">
                                                  <Button
                                                    onClick={() =>
                                                      addToLatest(product?._id)
                                                    }
                                                    color="blue"
                                                    type="submit"
                                                  >
                                                    Add
                                                  </Button>
                                                </td>
                                              </tr>
                                            </>
                                          )}
                                        </>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </Modal.Body>
                      </Modal>
                    </div>
                    <div className="">
                      <Modal
                        show={deletePopup}
                        size="md"
                        onClose={() => setdeletePopup(false)}
                        popup
                      >
                        <Modal.Header />
                        <Modal.Body>
                          <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                              Are you sure you want to delete this category?
                            </h3>
                            <div className="flex justify-center gap-4">
                              <Button color="failure" onClick={confirmDelete}>
                                {"Yes, I'm sure"}
                              </Button>
                              <Button
                                color="gray"
                                onClick={() => setdeletePopup(false)}
                              >
                                No, cancel
                              </Button>
                            </div>
                          </div>
                        </Modal.Body>
                      </Modal>
                    </div>
                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                      {latestMobiles?.length === 0 ? (
                        <></>
                      ) : (
                        <>
                          {latestMobiles.map((mobile, id) => {
                            return (
                              <>
                                <tr className="bg-gray-50  dark:bg-gray-800  dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                                  <td className="px-4  py-3">
                                    <div className="flex items-center justify-center text-sm">
                                      <div>
                                        <p className="font-semibold">
                                          {id + 1}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 text-center text-sm">
                                    {mobile?.product?.product_name}
                                  </td>
                                  <td className="px-4 py-3 flex justify-center text-sm">
                                    <div className="w-20 h-20 py-2">
                                      <img
                                        src={`${BaseUrl}/images/${mobile?.product?.image}`}
                                        className="w-full h-full"
                                        alt=""
                                      />
                                    </div>
                                  </td>
                                  <td className="px-4  py-3">
                                    <div className="flex items-center justify-center text-sm">
                                      <Button
                                        onClick={() =>
                                          handleDelete(
                                            mobile?._id,
                                            mobile?.product?._id
                                          )
                                        }
                                        color="red"
                                        type="submit"
                                      >
                                        Remove
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </>
                      )}
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

export default AdminCategory;
