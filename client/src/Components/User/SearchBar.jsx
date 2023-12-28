import { FaSearch } from "react-icons/fa";
export const SearchBar = ({ from }) => {
  return (
    <>
      {from === "orders" ? (
        <div className=" w-full flex items-center ">
          <input
            type="text"
            name=""
        
            className="w-[85%] text-gray-400 border-none outline-none rounded-sm"
            placeholder="Search by product name"
            id=""
          />
          <div className="bg-blue-600  w-[15%] h-full rounded-sm">
            <button className="flex items-center justify-center w-full h-full text-white gap-2">
              <span>
                <FaSearch />
              </span>
              <h2> Search Orders</h2>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
