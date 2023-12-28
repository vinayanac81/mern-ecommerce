import { Fragment } from "react";
import { FaAngleRight } from "react-icons/fa";
export const Root = ({ root }) => {
  return (
    <>
      <div
        style={{ fontSize: "12px" }}
        className="px-6 pt-7 pb-2 flex items-center gap-2 text-gray-400"
      >
        {root?.map((item, index) => {
          return (
            <Fragment key={index}>
              <div className="flex items-center ">{item?.name}</div>
              {root.length - 1 !== index && (
                <span>
                  <FaAngleRight />
                </span>
              )}
            </Fragment>
          );
        })}
      </div>
    </>
  );
};
