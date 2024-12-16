
import React from "react";
import { ImBin } from "react-icons/im";
import { useMutation, useQueryClient } from "react-query";
import {  deleteFromCart, updateCart } from "../utilities/api";
import toast from "react-hot-toast";
import Loader from "../UI/Loader";

const qunatity = [1, 2, 3, 4, 5, 6];
export default function ItemCart({ product }) {
  let pro = product.product;
  
  
  const queryClient = useQueryClient();
  const { mutate: mutationRemove, isLoading: removeLoading } = useMutation({
    mutationKey: ["deletefromCart"],
    mutationFn: () => deleteFromCart(pro._id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      toast.success("deleted item successfully");
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const { mutate: mutationUpdate, isLoading: updateLoading } = useMutation({
    mutationKey: ["deletefromCart"],
    mutationFn: updateCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      toast.success("update item successfully");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  if (removeLoading)
    return (
      <div className=" absolute    w-full top-0 left-0 bottom-0 flex justify-center items-center">
        
        <Loader h={120} w={120} />
      </div>
    );
  return (
    <div className="bg-white mb-5 px-5 py-4">
      <div className="flex flex-col md:flex-row mb-4 ">
        <div className=" md:w-1/3 w-full sm:w-1/2  me-2">
          <img
            className="w-full h-[150px]"
            src={pro.imageCover.secure_url}
            alt="prdouct"
          />
        </div>
        <div className="text-sm font-semibold  ">
          <div>
            <p className=" mb-2">{pro.title}</p>
            <div className="flex gap-x-3 flex-wrap mb-2">
              {pro.discount && (
                <p className="text-[#252525] line-through">
                  EGP {Math.floor(pro.price + pro.price * (pro.discount / 100))}
                  .00
                </p>
              )}
              {pro.discount && (
                <p className={`${pro.discount && "text-red-500"}`}>
                  EGP {Math.floor(pro.price)}
                  .00{""}
                </p>
              )}
              {!pro.discount && (
                <p className={`${pro.discount && "text-red-500"}`}>
                  EGP {Math.floor(pro.price)}.00{" "}
                </p>
              )}
              <p className="text-red-600 text-sm w-full">
                {pro.discount ? `(save ${pro.discount}%)` : "(no discount)"}
              </p>
            </div>
            <div className="text-xs text-[#bababa]">
              <p>item code: {pro._id}</p>
              <p>quantity: {product.amount}</p>
              <p>size: {product.size}</p>
            </div>
          </div>
        </div>
        <button
          onClick={mutationRemove}
          className="block mt-3 sm:mt-0  self-start text-xl hover:text-black text-[#BABDC9]"
        >
          <ImBin />
        </button>
      </div>
      <div className="flex justify-between">
        <p>Move to Favorites</p>
        {!updateLoading?<select onChange={(e)=>mutationUpdate({id:pro._id,size:product.size,amount:+e.target.value})} className=" border-2 border-[#eee] focus:outline-none w-1/5 px-3 py-1" defaultValue={product.amount}>
          {qunatity.map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>: <p className="bg-black w-1/5 px-3 py-1"><Loader w={30} h={20}/></p> }
      </div>
    </div>
  );
}
