import React from "react";
import { useQuery } from "react-query";
import { getOrders } from "../utilities/api";
import EachOrder from "../components/EachOrder";
import Loader from "../UI/Loader";
import { useNavigate } from "react-router-dom";
function convertToReadableDate(dateInput) {
  const date = new Date(dateInput); // Convert input to a Date object
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return date.toLocaleDateString("en-US", options);
}

// Example usage:

export default function Orders() {
  const navigate =useNavigate()
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  if (isLoading || isFetching)
    return (
      <div className=" absolute bg-[#0000003c] w-full top-0 left-0 bottom-0 flex justify-center items-center">
        <Loader h={120} w={120} />{" "}
      </div>
    );

    if(!data.data.data.length ) return <div>
    <p className="text-lg font-semibold text-center py-3 tracking-wider"> There are no orders  </p>
    <button onClick={()=>navigate("/")} className="bg-black text-white rounded-lg  px-3 py-1 block mx-auto">Go Shopping & Make orders</button>
    </div>
    

  let orders = data.data.data;
    
  return (
    <div className="w-full  mx-auto flex flex-col items-center lg:flex-row gap-x-10  justify-center">
      <div className="new  overflow-y-auto shadow-lg rounded-md h-[250px] bg-[#eee] text-sm sm:text-base w-full sm:w-1/2 lg:w-1/3 py-3 px-4 mb-20 ">
        <div className="flex justify-between text-xs">
          <h2 className=" tracking-widest  text-lg font-semibold border-b-black border-b-[1px] w-1/3">
            New Order
          </h2>
          <p>{convertToReadableDate(orders[orders.length - 1].date)}</p>
        </div>

        <ul className="mt-4">
          {orders[orders.length - 1].products.map((product) => (
            <li
              className="px-3 py-2 flex justify-between"
              key={product.product._id}
            >
              <p>{product.product.title}</p>
              <p>{product.amount} X</p>
            </li>
          ))}
        </ul>

        <div className="ps-3 flex justify-between">
          <p>TotalPrice: {Math.floor(orders[orders.length - 1].totalPrice)}$</p>
          <p>FinalPrice: {Math.floor(orders[orders.length - 1].finalPrice)}$</p>
        </div>
      </div>
     { data.data.data.length >= 2 ? <div className="prev w-full sm:w-1/2 lg:w-1/3 shadow-lg rounded-md bg-[#eee]   h-[250px] overflow-y-auto">
        <div className="px-3">
          <h3 className="py-3  tracking-widest  text-lg font-semibold border-b-black border-b-[1px] w-1/2">
            previous orders
          </h3>
        </div>
        <ul>
          <li className="flex justify-between items-center font-semibold border-[1px] border-b-[#3333331f] py-3">
            <p className=" w-1/4 text-center">Items</p>
            <p className=" w-1/4 text-center">Total Price</p>
            <p className=" w-1/4 text-center">Final price</p>
            <p className=" w-1/4 text-center">Date</p>
          </li>
          {orders.map((order) => (
            <EachOrder key={order._id} order={order} />
          ))}
        </ul>
      </div>: null}
    </div>
  );
}
