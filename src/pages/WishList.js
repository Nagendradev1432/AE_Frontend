import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { clearWishList, getWishList } from "../utilities/api";
import NormalProduct from "../components/products/NormalProduct";
import { useNavigate } from 'react-router-dom';
import Loader from "../UI/Loader";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/userSlice";

export default function WishList() {
  const navigeta = useNavigate()
  const dispatch = useDispatch()
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["wishList"],
    queryFn: getWishList,
  });

  const queryClient = useQueryClient()
  const {mutate,isLoading:mutationLoding} = useMutation({
        mutationFn:clearWishList,
        mutationKey:["clearWishList"],
        onSuccess:()=>{
          dispatch(getUser())
          queryClient.invalidateQueries({
            queryKey:["wishList"]
          })
        }

  })

  if (isLoading || isFetching) return <div className=" absolute bg-[#0000003c] w-full top-0 left-0 bottom-0 flex justify-center items-center">
          <Loader h={120} w={120} />{" "}
        </div>;
  if(!data.data.data.wishList.length){
     return (
      <div className="text-center">
        <p className="text-lg font-semibold my-5">
          Your wishlist bag is empty !
        </p>
        <button
          onClick={() => navigeta("/")}
          className="bg-black py-1 px-3 text-white"
        >
          Shoppin Now
        </button>
      </div>
    );
  }

  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="my-5 flex justify-between items-center px-3">
        <p className="text-xl font-semibold px-3">My Favorites</p>
       { !mutationLoding?<button onClick={mutate} className="block py-1 px-3 rounded-lg w-[150px] bg-black text-white ">Clear WishList</button>:<p className="bg-black py-1  rounded-lg px-3 text-white w-[150px] my-5"><Loader w={30} h={30}/></p>}
      </div>
      <ul className="flex flex-wrap">
        {data.data.data.wishList.map((product) => (
          <NormalProduct key={product._id} product={product.product} />
        ))}
      </ul>
    </div>
  );
}
