import { SearchBar } from "../SearchBar";
import { AllOrder } from "./AllOrders";

export const OrderList = ({ from,status }) => {
   
  return (
    <div className="flex gap-4 w-[80%] flex-col">
      <SearchBar   from={from} />
      <AllOrder status={status}/>
    </div>
  );
};
