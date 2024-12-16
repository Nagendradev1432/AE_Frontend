import React from 'react'
function convertToDayMonthYear(dateInput) {
  const date = new Date(dateInput); // Convert input to a Date object
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}


export default function EachOrder({order}) {
 
  return (
    <div>
    
    <li className='text-black flex justify-between text-xs items-center border-[1px] border-b-[#3333331f] py-3'>
          <p className='w-1/4 text-center'>{order.products.length }</p>
          <p className='w-1/4 text-center'>{Math.floor(order.totalPrice)}$</p>
          <p className='w-1/4 text-center'>{Math.floor(order.finalPrice)}$</p>
          <p className='w-1/4 text-center'>{convertToDayMonthYear(order.date)}</p>
    </li>
    
    
    </div>
  )
}
