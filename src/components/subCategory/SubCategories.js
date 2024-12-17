
import React from 'react'
import { useQuery } from 'react-query'
import { getAllSubCategorys } from '../../utilities/api'
import SubCategory from './SubCategory'
import Loader from '../../UI/Loader'

export default function SubCategories({search,value}) {

        
    const {data,isFetching,isError,isLoading} = useQuery({
        queryKey:["sub",value],
        queryFn:()=>getAllSubCategorys(search,value),
        


    })
    if (isLoading ||isFetching ) return <div className=" fixed bg-[#0000003c] z-50 w-full top-0 left-0 bottom-0 flex justify-center items-center"> <Loader h={120} w={120}/> </div>;

  return (
    <ul className='flex flex-wrap justify-center gap-x-10 my-10'>
            {data.data.data.map(sub=><SubCategory sub={sub} key={sub._id}/>)}
    </ul>
  )
}
