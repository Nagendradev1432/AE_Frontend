
    import React from 'react'
import { getAllProductsSearch } from '../utilities/api';
import NormalProduct from '../components/products/NormalProduct';
import Loader from '../UI/Loader';
import { useQuery } from 'react-query';
    
    export default function Search({searchValue}) {
      const { data, isLoading,isFetching } = useQuery({
          queryKey: ["proo",searchValue],
          queryFn: () => getAllProductsSearch("title", searchValue),
        });
      
        if (isLoading ||isFetching ) return <div className=" fixed bg-[#0000003c] w-full top-0 left-0 bottom-0 flex justify-center items-center"> <Loader h={120} w={120}/> </div>;
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
    