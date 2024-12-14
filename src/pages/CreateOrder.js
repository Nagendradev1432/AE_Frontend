
import React, { useState } from 'react'
import Button from './../components/Button';
import { useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { makeOrder } from '../utilities/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function CreateOrder() {
    const user = useSelector(store=>store.user)
    const [address,setAddress] = useState(user.address)
    const [phone,setPhone] = useState(user.phone)
    const [method,setMethod] = useState("cash")

    const navigate = useNavigate()
    const {mutate} =useMutation({
        mutationKey:["makeOrder"],
        mutationFn:()=>user.code?makeOrder({address,phone,paymnetMethod:method,couponCode:user.code}):makeOrder({address,phone,paymnetMethod:method}),
        onSuccess:(res)=>{
                toast.success("order created successfully")
                navigate("/orders")

        },
        onError:(err)=>{
           
            toast.error(err.response.data.message)   
        }
    })

   
    function handleSumbit(e){

            e.preventDefault()
            if(!address|| !phone || !method){
                    return alert("please entre your info")
            }
            
            mutate()

    }
  return (
    <form onSubmit={handleSumbit} className=' max-w-3xl mx-auto'>
    <div className=' bg-[#eee] rounded-md shadow-lg  w-2/3 px-3 py-4 mx-auto'>
    
            <div>
                    <label className='block px-1'>Address</label>
                    <input  onChange={(e)=>setAddress(e.target.value)} defaultValue={user.address} type='text' className='px-3 py-1 border-[1px] border-[#cecece] focus:outline-none rounded-md w-full mb-3'/>
            </div>
            <div>
                    <label className='block px-1'>Phone</label>
                    <input onChange={(e)=>setPhone(e.target.value)} defaultValue={user.phone} type='text' className='px-3 py-1 border-[1px] border-[#cecece] focus:outline-none rounded-md w-full mb-3'/>
            </div>
            <div>
                    <label className='block px-1'>Payment method</label>
                    <select  className='px-3 py-1 border-[1px] border-[#cecece] focus:outline-none rounded-md w-full mb-3'>
                        <option value={"cash"}>Cash</option>
                    </select>
            </div>
            <Button  decoration={"text-white bg-black py-1 px-3 block ms-auto rounded-md"} text={"Confirm Order"}/>
            </div>
    </form>
  )
}
