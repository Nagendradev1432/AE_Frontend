import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Back from "./Back";

export default function WideNav({searchValue,setSearchValue}) {
  return (
    <div className="flex justify-between py-10 px-16">
      <div className="flex items-center relative">
        <input
          
          onKeyUp={(e)=>setSearchValue(e.target.value)}
          type="text"
          placeholder="what are you looking for?"
          className="py-1 px-3 border-[.5px] w-[300px] focus:outline-none  rounded-md  border-black placeholder:text-sm "
        />
        <div className=" absolute right-3 text-[20px] text-[#211f1f87] ">
          <FaMagnifyingGlass />
        </div>
      </div>

      <div className="">
        <p className="text-[20px] lg:text-[25px]  ms-5 font-semibold tracking-[4px]  uppercase">
          American Eagle
        </p>
      </div>

      <div className="flex gap-x-4 ps-32 items-center">
        <div><Back/></div>
        <Link to={"/wishList"} className="text-[30px]">
          <FaRegHeart />
        </Link>
        <Link to={"/cart"} className="text-[30px]">
          <AiOutlineShoppingCart />
        </Link>
      </div>
    </div>
  );
}
