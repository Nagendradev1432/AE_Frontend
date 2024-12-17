import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addToCart, getProduct } from "../utilities/api";
import Loader from "./../UI/Loader";
import { AiOutlineClose } from "react-icons/ai";


import Button from "./Button";
import { GoArrowRight } from "react-icons/go";
import toast from "react-hot-toast";

const qunatity = [1, 2, 3, 4, 5, 6];
export default function Option() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [indexImage, setIndexImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("s");
  const [amount, setAmount] = useState(1);
  const navigate = useNavigate()
  const toggle = searchParams.get("Toggle");
  const ProductId = searchParams.get("productId") || "6753ab7310309326dbd8f865";
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["productID", ProductId],
    queryFn: () => getProduct(ProductId),
    onError:(err)=>{
      console.log(err)
      navigate("/login")
    }
  });


  const QueryClient = useQueryClient();
  const { mutate, isLoading: lodaingMutation } = useMutation({
    mutationKey: ["addtocart"],
    mutationFn: () => addToCart(ProductId, selectedSize, amount),
    onSuccess: () => {
      QueryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      toast.success("added to basket successfully");
    },
    onError: (err) => {
      console.log(err);
    },
  });
  async function onclick() {
    mutate();
  }
  if (isLoading || isFetching)
    return (
      <div className=" fixed z-50  w-full bg-[#0000003c] top-0 left-0 bottom-0  translate-[-50%,-50%] flex justify-center items-center">
        
        <Loader h={120} w={120} c={"#333"} />{" "}
      </div>
    );

  if (searchParams.get("Toggle") !== "true") return <div></div>;
  return (
    <div className="optionBare">
      <div className="option w-2/3 sm:w-1/5  overflow-auto">
        <div className="flex justify-between py-4 items-center px-2">
          <h4 className="w-5/6 text-center font-semibold">Quick View</h4>
          <button
            className="text-2xl w-1/6 cursor-pointer text-right"
            onClick={() => setSearchParams({ Toggle: "false" })}
          >
            <AiOutlineClose />
          </button>
        </div>
        <div>
          <div>
            <img src={data.data.data.images[indexImage].secure_url} alt="pic" />
          </div>
          <p className=" uppercase text-sm md:text-lg px-3">
            {data.data.data.title}
          </p>
          <div className="flex gap-x-3 flex-wrap  px-3">
            {data.data.data.discount && (
              <p className="text-[#252525] line-through">
                EGP{" "}
                {Math.floor(
                  data.data.data.price +
                    data.data.data.price * (data.data.data.discount / 100)
                )}
                .00
              </p>
            )}
            {data.data.data.discount && (
              <p className={`${data.data.data.discount && "text-red-500"}`}>
                EGP {data.data.data.price}
                .00{" "}
              </p>
            )}
            {!data.data.data.discount && (
              <p className={`${data.data.data.discount && "text-red-500"}`}>
                EGP {Math.floor(data.data.data.price)}.00{" "}
              </p>
            )}
            <p className="text-red-600 text-sm w-full">
              {data.data.data.discount
                ? `(save ${data.data.data.discount}%)`
                : "(no discount)"}
            </p>
          </div>
          <div className="flex justify-between items-center px-3">
            <p>size</p>
            <p>quantity</p>
          </div>
          <div className="flex px-3 justify-between gap-x-2">
                <select className="w-2/3 bg-[#eeeeeeb5] py-1 px-3" value={selectedSize} onChange={(e)=>setSelectedSize(e.target.value)}>
                      {data.data.data.size.map(size=><option key={size} value={size}>{size}</option>)}
                </select>
                <select className="w-1/3 bg-[#eeeeee97] py-1 px-3" value={amount} onChange={(e)=>setAmount(e.target.value)}>
                      {qunatity.map(quan=><option key={quan} value={quan}>{quan}</option>)}
                </select>
          </div>
          <ul className="flex gap-x-5 mt-5 justify-center">
            {data.data.data.colors.map((color, index) => (
              <button
                onClick={() => setIndexImage(index)}
                className="rounded-full w-8 h-8  border-2 border-[#dcdbdb]  focus:border-none focus:ring-[1px] focus:ring-black transition-all duration-75"
                key={index}
                style={{ backgroundColor: `#${color}` }}
              ></button>
            ))}
          </ul>
          <div className="px-3">
            {!lodaingMutation?<Button
              text={"Add To Basket"}
              decoration={"bg-black py-2 px-4 text-white w-full my-5 "}
              fn={onclick}
            />:<p className="bg-black py-2 px-4 text-white w-full my-5"><Loader w={30} h={30}/></p>}
          </div>
          <div onClick={()=>navigate(`/product/${ProductId}`)} className="flex justify-between items-center border-[1px] border-black mx-3 px-3 py-1 cursor-pointer">
            <span className="block">View Full Product</span>
            <span className="block">
              <GoArrowRight />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
