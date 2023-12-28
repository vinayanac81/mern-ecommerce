import { useState } from "react";
import { Header } from "../../Components/User/Header";
import { Filter } from "../../Components/User/Orders/Filter";
import { OrderList } from "../../Components/User/Orders/OrderList";
import { Root } from "../../Components/User/Root";
import { Footer } from "../../Components/User/Footer";
export const UserOrders = () => {
  const root = [
    {
      name: "Home",
    },
    {
      name: "My Account",
    },
    {
      name: "My Orders",
    },
  ];
  const [filterStatus, setfilterStatus] = useState("All");
  const changeStatus = (name) => {
    setfilterStatus(name);
  };
  return (
    <div className="">
      <Header />
      <div style={{ backgroundColor: "#f0f0f0" }} className=" bg-black">
        <Root root={root} />
        <div className="flex px-4 gap-4">
          <Filter changeStatus={(name) => changeStatus(name)} />
          <OrderList status={filterStatus} from={"orders"} />
        </div>
      </div>
      <div className="py-20  dark:bg-black">
        <Footer />
      </div>
    </div>
  );
};
