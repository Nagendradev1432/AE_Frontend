import React from 'react'
import { useQuery } from 'react-query';
import {  getAllProductsSearchByCategroy } from '../../utilities/api';
import NormalProduct from './NormalProduct';
import Loader from '../../UI/Loader';
import { useDispatch } from 'react-redux';
import { getUser } from '../../redux/userSlice';

export default function ProductByCat({search,value}) {
  const dispatch = useDispatch()
    const { data, isLoading ,isFetching} = useQuery({
        queryKey: ["proo",value[0]],
        queryFn: () => getAllProductsSearchByCategroy(search, value[0],value[1]),
        onSuccess:()=>{
          dispatch(getUser())
        }
      });
    
      if (isLoading  ) return <div className=" fixed bg-[#0000003c] z-50 w-full top-0 left-0 bottom-0 flex justify-center items-center"> <Loader h={120} w={120}/> </div>;

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
