import React from "react";
import { useQuery } from "react-query";
import { getWishList } from "../utilities/api";
import NormalProduct from "../components/products/NormalProduct";
import { useNavigate } from 'react-router-dom';
import Loader from "../UI/Loader";

export default function WishList() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["wishList"],
    queryFn: getWishList,
  });

  const navigeta = useNavigate()

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
      <div className="mb-3">
        <p className="text-xl font-semibold px-3">My Favorites</p>
      </div>
      <ul className="flex flex-wrap">
        {data.data.data.wishList.map((product) => (
          <NormalProduct key={product._id} product={product.product} />
        ))}
      </ul>
    </div>
  );
}
