import React, { useState } from "react";
import { AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";
import { FaBars, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import SideNav from "./SideNav";
import Back from "../components/Back";

export default function ResponsiveNav() {
    const [active,setActive] = useState(false)
  return (
    <div>
    
    <div className="flex justify-between items-center px-3 py-4 text-3xl  ">
      
      <div className=" cursor-pointer" onClick={()=>setActive(!active)}>
        {active?<AiOutlineClose />: <FaBars />}
        
      </div>
      
      <div className="flex items-center gap-x-4 ps-32">
        <div className="text-xs"><Back/></div>
        <Link to={"/wishList"} className="text-[25px]">
          <FaRegHeart />
        </Link>
        <Link to={"/cart"} className="text-[25px]">
          <AiOutlineShoppingCart />
        </Link>
      </div>
    </div>
    <SideNav setActive = {setActive} active  = {active} />
    </div>
  );
}

