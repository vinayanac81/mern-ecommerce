import { Fragment } from "react";

export const Filter = ({ changeStatus }) => {
  const status = [
    {
      type: "Shipped",
    },
    {
      type: "Delivered",
    },
    {
      type: "Cancelled",
    },
    {
      type: "Returned",
    },
  ];
  return (
    <div className="w-[20%] h-60 mb-2 pb-5 bg-white">
      <h2 className="font-semibold uppercase pt-2 pb-2 border-b px-4">
        Filters
      </h2>
      <div className="">
        <h2
          style={{ fontSize: "13px" }}
          className="uppercase pt-2 pb-3 px-4 font-semibold"
        >
          Order status
        </h2>
        <div className="flex px-4  pb-  flex-col gap-4">
          {status.map((item, index) => {
            return (
              <Fragment key={index}>
                <div className=" flex gap-4 text-sm items-center">
                  <input
                    type="checkbox"
                    onChange={() => changeStatus(item.type)}
                    className="border-2 w-5 h-5  border-gray-200"
                  />
                  <span>{item.type}</span>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
