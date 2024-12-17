import React from "react";
import { useQuery } from "react-query";
import { getAllProductsSearch } from "../../utilities/api";

import NormalProduct from './NormalProduct';
import Loader from "../../UI/Loader";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/userSlice";

export default function ProductsAll({ search, value }) {
  const dipatch = useDispatch()
  const { data, isLoading } = useQuery({
    queryKey: ["proo",value],
    queryFn: () => getAllProductsSearch(search, value),

    onSuccess:()=>{
     
      dipatch(getUser())
    }
  });

  if (isLoading  ) return <div className=" fixed bg-[#0000003c] w-full top-0 left-0 bottom-0 flex z-50 justify-center items-center"> <Loader h={120} w={120}/> </div>;
  
  return (
    <div>
      <ul className="flex flex-wrap">
        {data.data.data.map((product) => (
          <NormalProduct  product={product} key={product._id} />
        ))}
      </ul>
    </div>
  );
}
