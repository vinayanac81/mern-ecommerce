import mi from "../../assets/mi.png";
import google from "../../assets/google.png";
import apple from "../../assets/apple.png";
import sm from "../../assets/sm.png";
import onePlus from "../../assets/onePlus.png";
export const BrandSelect = () => {
  return (
    <>
      <div className="bg-gray-100 lg:block hidden  md:w-[100%] mx-auto ">
        <div className="md:py-5 py- px-20  justify-between flex">
          <div className="flex flex-col items-center cursor-pointer gap-1">
            <div className="w-14  flex items-center justify-center text-center h-5">
              <img src={sm} className="w-10 " alt="" />
            </div>
            <span className="uppercase font-extrabold text-blue-600 hover:text-blue-800">
              Samsung
            </span>
          </div>
          <div className="flex flex-col items-center cursor-pointer gap-1">
            <div className="w-14  flex items-center justify-center text-center h-5">
              <img src={apple} className="w-10 " alt="" />
            </div>
            <span className="uppercase text-blue-600 hover:text-blue-800 font-extrabold ">
              apple
            </span>
          </div>
          <div className="flex flex-col cursor-pointer items-center gap-1">
            <div className="w-14  flex items-center justify-center text-center h-5">
              <img src={google} className="w-5 " alt="" />
            </div>
            <span className="uppercase font-extrabold text-blue-600 hover:text-blue-800">
              Google
            </span>
          </div>
          <div className="flex flex-col items-center cursor-pointer gap-1">
            <div className="w-14  flex items-center justify-center text-center h-5">
              <img src={onePlus} className="w-5 " alt="" />
            </div>
            <span className="uppercase font-extrabold text-blue-600 hover:text-blue-800">
              One Plus
            </span>
          </div>
          <div className="flex flex-col cursor-pointer items-center gap-1">
            <div className="w-14  flex items-center justify-center text-center h-5">
              <img src={mi} className="w-10 " alt="" />
            </div>
            <span className="uppercase font-extrabold text-blue-600 hover:text-blue-800">
              Redmi
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
