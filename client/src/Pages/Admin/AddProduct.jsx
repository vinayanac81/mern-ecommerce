import React, { useEffect, useState } from "react";
import LeftLayout from "../../Components/Admin/LeftLayout";
import AxiosInstance from "../../Constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Admin/Header";
import { Loader } from "../../Components/Common/Loading";
const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [productData, setproductData] = useState({
    productName: "",
    offerPrice: "",
    battery: "",
    ROM: "",
    RAM: "",
    processor: "",
    front: "",
    back: "",
    stock: "",
    display: "",
    originalPrice: "",
    brand: "",
  });
  const [brands, setbrands] = useState([]);
  const [imageUploaded, setimageUploaded] = useState(false);
  const [image, setimage] = useState("");
  useEffect(() => {
    getCategoryAndBrand();
  }, []);
  const getCategoryAndBrand = async () => {
    try {
      setloading(true);
      const { data } = await AxiosInstance.get("/admin/get-category-and-brand");
      console.log(data);
      setloading(false);
      if (data.success) {
        setbrands(data.brand);
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message === "unauthorized user") {
        localStorage.removeItem("admin");
        localStorage.removeItem("admin-token");

        navigate("/admin");
        toast.error("Please login");
      }
    }
  };
  const handleClick = async (e) => {
    try {
      e.preventDefault();
      let fileData = new FormData();
      fileData.append("image", image);
      const { data } = await AxiosInstance.post(
        "/admin/add-product",
        fileData,
        {
          params: { productData, image },
        },

        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        navigate("/admin/products");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleImage = (e) => {
    setimage(e.target.files[0]);
    setimageUploaded(true);
  };
  return (
    <div>
      <div>
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
          <Header />
          <LeftLayout active="products" />
          {loading ? (
            <>
              <Loader />
            </>
          ) : (
            <>
              <div className="h-full  ml-14 mt-14 mb-10 md:ml-64">
                <div className="flex md:max-w-lg  mx-auto mt-10 max-w-sm  flex-col">
                  <h2 className="text-2xl font-bold flex justify-center">
                    Add Product
                  </h2>
                  <div className="mt-4 flex flex-col gap-3 px-4">
                    <label htmlFor="productName">Name</label>
                    <input
                      name="productName"
                      className="rounded bg-gray-600 py-2 px-2 "
                      type="text"
                      onChange={(e) =>
                        setproductData({
                          ...productData,
                          productName: e.target.value,
                        })
                      }
                      value={setproductData.productName}
                    />
                  </div>
                  <div className="mt-4 flex flex-col gap-3 px-4">
                    <label htmlFor="description">Display</label>
                    <input
                      name="description"
                      className="rounded bg-gray-600 py-2 px-2 "
                      type="text"
                      onChange={(e) =>
                        setproductData({
                          ...productData,
                          display: e.target.value,
                        })
                      }
                      value={setproductData.display}
                    />
                  </div>

                  <div className="mt-4 flex flex-col gap-3 px-4">
                    <label htmlFor="subCategory">Brand</label>
                    <select
                      name="subCategory"
                      className="rounded bg-gray-600 py-2 px-2 "
                      type="text"
                      onChange={(e) =>
                        setproductData({
                          ...productData,
                          brand: e.target.value.toLowerCase(),
                        })
                      }
                      value={setproductData.brand}
                    >
                      <option value="select">Select</option>
                      {brands.map((brand) => {
                        return (
                          <>
                            <option value={brand.brand_name}>
                              {brand.brand_name}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex w-full">
                    <div className="mt-4 w-[50%]  flex flex-col gap-3 pl-4">
                      <label htmlFor="price">Original Price</label>
                      <input
                        name="price"
                        className="rounded bg-gray-600 py-2 px-2 "
                        type="text"
                        onChange={(e) =>
                          setproductData({
                            ...productData,
                            originalPrice: e.target.value,
                          })
                        }
                        value={setproductData.originalPrice}
                      />
                    </div>
                    <div className="mt-4 flex w-[50%]  flex-col gap-3 px-4">
                      <label htmlFor="price">Offer Price</label>
                      <input
                        name="price"
                        className="rounded bg-gray-600 py-2 px-2 "
                        type="text"
                        onChange={(e) =>
                          setproductData({
                            ...productData,
                            offerPrice: e.target.value,
                          })
                        }
                        value={setproductData.offerPrice}
                      />
                    </div>
                  </div>
                  <div className="flex w-full">
                    <div className="mt-4 w-[50%]  flex flex-col gap-3 pl-4">
                      <label htmlFor="price">Front Camera</label>
                      <input
                        name="price"
                        className="rounded bg-gray-600 py-2 px-2 "
                        type="text"
                        onChange={(e) =>
                          setproductData({
                            ...productData,
                            front: e.target.value,
                          })
                        }
                        value={setproductData.front}
                      />
                    </div>
                    <div className="mt-4 flex w-[50%]  flex-col gap-3 px-4">
                      <label htmlFor="price">Rear Camera</label>
                      <input
                        name="price"
                        className="rounded bg-gray-600 py-2 px-2 "
                        type="text"
                        onChange={(e) =>
                          setproductData({
                            ...productData,
                            back: e.target.value,
                          })
                        }
                        value={setproductData.back}
                      />
                    </div>
                  </div>
                  <div className="flex w-full">
                    <div className="mt-4 w-[50%]  flex flex-col gap-3 pl-4">
                      <label htmlFor="price">Ram</label>
                      <input
                        name="price"
                        className="rounded bg-gray-600 py-2 px-2 "
                        type="text"
                        onChange={(e) =>
                          setproductData({
                            ...productData,
                            RAM: e.target.value,
                          })
                        }
                        value={setproductData.RAM}
                      />
                    </div>
                    <div className="mt-4 flex w-[50%]  flex-col gap-3 px-4">
                      <label htmlFor="price">Rom</label>
                      <input
                        name="price"
                        className="rounded bg-gray-600 py-2 px-2 "
                        type="text"
                        onChange={(e) =>
                          setproductData({
                            ...productData,
                            ROM: e.target.value,
                          })
                        }
                        value={setproductData.ROM}
                      />
                    </div>
                  </div>
                  <div className="flex w-full">
                    <div className="mt-4 w-[50%]  flex flex-col gap-3 pl-4">
                      <label htmlFor="price">Battery Capacity</label>
                      <input
                        name="price"
                        className="rounded bg-gray-600 py-2 px-2 "
                        type="text"
                        onChange={(e) =>
                          setproductData({
                            ...productData,
                            battery: e.target.value,
                          })
                        }
                        value={setproductData.battery}
                      />
                    </div>
                    <div className="mt-4 flex w-[50%]  flex-col gap-3 px-4">
                      <label htmlFor="price">Stock</label>
                      <input
                        name="price"
                        className="rounded bg-gray-600 py-2 px-2 "
                        type="text"
                        onChange={(e) =>
                          setproductData({
                            ...productData,
                            stock: e.target.value,
                          })
                        }
                        value={setproductData.stock}
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-3 px-4">
                    <label htmlFor="stock">Processor</label>
                    <input
                      name="stock"
                      onChange={(e) =>
                        setproductData({
                          ...productData,
                          processor: e.target.value,
                        })
                      }
                      value={setproductData.processor}
                      className="rounded bg-gray-600 py-2 px-2 "
                      type="text"
                    />
                  </div>
                  {imageUploaded ? (
                    <>
                      <div className="mt-4 flex flex-col gap-3 px-4">
                        <img
                          className="w-20"
                          src={URL.createObjectURL(image)}
                          alt=""
                        />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  <div className="mt-4 flex flex-col gap-3 px-4">
                    <label htmlFor="image">Image</label>
                    <input
                      name="image"
                      className="rounded bg-gray-600 py-2 px-2 "
                      type="file"
                      onChange={handleImage}
                    />
                  </div>
                  <div className="flex px-4 mt-2 justify-center">
                    <button
                      onClick={handleClick}
                      className="py-2 w-full px-4 bg-green-500 rounded mt-3 mb-3 hover:bg-green-600"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
