import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ErrorPage() {
        const navigate = useNavigate()
  return (
    <div className='max-w-4xl bg-[#eee] mx-auto py-4 px-6 text-center shadow-lg rounded-lg'>
        <p className='mb-3 font-semibold text-3xl'>OOPS!</p>
        <p className='mb-3 font-semibold text-base'>404-PAGE NOT FOUND</p>
        <p className='mb-3 text-base'>The page you are looking for might have been removed or not exsit</p>
        <p onClick={()=>navigate(-1)} className='mb-3 text-base bg-black rounded-lg cursor-pointer w-fit mx-auto py-2 px-3 text-white'>GO BACK</p>
    </div>
  )
}
