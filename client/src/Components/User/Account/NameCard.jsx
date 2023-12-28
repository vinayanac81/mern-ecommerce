import { useSelector } from "react-redux";

export const NameCard = () => {
  const { userDetails } = useSelector((state) => state.user);
  return (
    <>
      <div className="flex mb-4 bg-white gap-2 ">
        <div className="p-4">
          <div className="w-16  h-16">
            <img
              className="rounded-full"
              src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg"
              alt=""
            />
          </div>
        </div>
        <div className="pt-4">
          <h2 style={{ color: "#212121" }}>Hello,</h2>
          <h2 style={{ color: "#212121" }} className="font-bold pt-1">
            {userDetails?.first_name.charAt(0).toUpperCase() +
              userDetails?.first_name.slice(1)}{" "}
            {userDetails?.last_name}
          </h2>
        </div>
      </div>
    </>
  );
};
