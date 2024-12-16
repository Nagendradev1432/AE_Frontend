import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getCart } from "../utilities/api";
import Loader from "../UI/Loader";
import { useNavigate } from "react-router-dom";
import ItemCart from "../components/ItemCart";
import ProductMainMabyKnow from "../components/mapyknow/ProductMainMabyKnow";
import { checkCoupon } from "./../utilities/api";
import { useDispatch } from "react-redux";
import { addCode } from "../redux/userSlice";
import Back from "../components/Back";

export default function Cart() {
  const dispatch =useDispatch()
  const [cart, SetCart] = useState([]);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [codeValue,setCodeValue] = useState("")
  const navigeta = useNavigate();

  const { mutate, isLoading: checkerLoading } = useMutation({
    mutationKey: ["checker"],
    mutationFn: () => checkCoupon(code),
    onSuccess: (data) => {
      
      setCodeValue(data.data.data.amount)
      setError("")
      dispatch(addCode(data.data.data.code))
    },
    onError: (err) => {
      console.log(err.response.data.message);
      setError(err.response.data.message);
      setCodeValue("")
      setCode("")
      dispatch(addCode(""))
    },
  });

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    onSuccess: (data) => {
      SetCart(data?.data.data.cart);
    },
  });

  if (isLoading || isFetching || isError )
    return (
      <div className=" absolute bg-[#0000003c] w-full top-0 left-0 bottom-0 flex justify-center items-center">
       
        <Loader h={120} w={120} />{" "}
      </div>
    );

  if (!cart.length)
    return (
      <div className="text-center">
        <p className="text-lg font-semibold my-5">
          Your shopping bag is empty !
        </p>
        <button
          onClick={() => navigeta("/")}
          className="bg-black py-1 px-3 text-white"
        >
          Shoppin Now
        </button>
      </div>
    );

  let totalPrice = cart.reduce(
    (acc, item) => item.product.price * item.amount + acc,
    0
  );

  return (
    <div className="bg-[#eee] relative max-w4xl">
    
      <div className="lg:flex justify-between  py-5 ">
        <div className="lg:w-1/3 w-2/3 mx-auto">
          <p className="font-semibold text-lg mb-2">
            My Shopping Bag ({cart.length} items)
          </p>
          <ul>
            {cart.map((product) => (
              <ItemCart key={product._id} product={product} />
            ))}
          </ul>
        </div>
        <div className="lg:w-1/3 w-2/3 mx-auto ">
          <p className="font-semibold text-lg mb-2">
            
            Do you have a Promotional Code?
          </p>
          <div className="flex flex-wrap">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              type="text"
              placeholder="Promo Code"
              className="py-3 px-4 block w-4/6"
            />
            <button
            disabled ={!code}
              onClick={mutate}
              className="py-3 px-4 bg-black w-2/6 text-white block disabled:cursor-not-allowed"
            >
            { checkerLoading ? <Loader w={30} h={30}/> : "APPLY"}
              
            </button>
            {error && (
              <div className="w-full text-red-500 font-thin"> {error} </div>
            )}
            {codeValue && (
              <div className="w-full text-red-500 font-thin mt-3"> Save {codeValue} %</div>
            )}
          </div>
          <div className="mt-5 font-thin">
            <p className="mb-3">Order Summary</p>
            <div className="bg-white px-3 py-1">
              <div className="flex  justify-between items-center my-3 pb-2 border-b-[1px] border-b-[#DADADA]">
                <p>Subtotal</p>
                <p>EGP {totalPrice}.00</p>
              </div>
              <div>
                <div className="flex  justify-between items-center font-semibold mb-2">
                  <p>Order Total</p>
                  <p>EGP {totalPrice}.00</p>
                </div>
                <div>
                  <div className="flex  justify-between items-center text-s">
                    <p>Excluding delivery</p>
                    <p>Inclusive of VAT</p>
                  </div>
                  <button
                    onClick={() => navigeta("/createOrder")}
                    className="text-white bg-blue-600 py-2 px-4 block mx-auto my-6 w-full font-semibold "
                  >
                    CONTINUE TO CHECK OUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="my-4 font-semibold text-lg text-center">
          
          You May Also Like
        </h3>
        <ProductMainMabyKnow
          subCategory={cart[cart.length - 1].product.subCategory}
        />
      </div>
    </div>
  );
}
