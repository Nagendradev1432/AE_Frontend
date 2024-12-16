import React from "react";
import { useQuery } from "react-query";
import { getAllProductsSearch } from "../../utilities/api";

import NormalProduct from './NormalProduct';
import Loader from "../../UI/Loader";

export default function ProductsAll({ search, value }) {
  const { data, isLoading } = useQuery({
    queryKey: ["proo",value],
    queryFn: () => getAllProductsSearch(search, value),
  });

  if (isLoading  ) return <div className=" fixed bg-[#0000003c] w-full top-0 left-0 bottom-0 flex justify-center items-center"> <Loader h={120} w={120}/> </div>;
  console.log(data.data.data.product)
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
