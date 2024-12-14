import React from "react";
import { Link } from "react-router-dom";

export default function SmallNav() {
  return (
    <div className="  justify-center border-t-[0.5px] hidden sm:flex ">
      <ul className="flex  py-3   ">
        <li className="px-8 py-1 text-[#00000093] hover:text-black transition-all duration-75">
          <Link to={"/topic/gender/female"}>Women</Link>
        </li>
        <li className="px-8 py-1 text-[#00000093] hover:text-black transition-all duration-75">
          <Link to={"/topic/gender/male"}>Men</Link>
        </li>
        <li className="px-8 py-1 text-[#00000093] hover:text-black transition-all duration-75">
          <Link to={"/Tops"}>Tops</Link>
        </li>
        <li className="px-8 py-1 text-[#00000093] hover:text-black transition-all duration-75">
          <Link to={"/Bottoms"}>Bottoms</Link>
        </li>
        
      </ul>
    </div>
  );
}
