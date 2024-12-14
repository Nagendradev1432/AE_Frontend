import React from "react";
import { Link } from "react-router-dom";

export default function SideNav({active,setActive}) {
  return (
    <div className={`sideNav ${active?"active":""} `}  >
            <p className="w-1/2 mx-auto font-semibold py-3 px-3">SHOP NOW</p>

            <ul className="mt-10">
                    <Link onClick={()=>setActive(!active)} to={"/topic/gender/female"}><li className="py-2 hover:bg-[#eee] px-3 font-semibold  border-b-[.5px] border-[#">Women</li></Link>
                    <Link onClick={()=>setActive(!active)} to={"/topic/gender/male"}><li className="py-2 hover:bg-[#eee] px-3 font-semibold  border-b-[.5px] border-[#">Men</li></Link>
                    <Link onClick={()=>setActive(!active)} to={"tops"}><li className="py-2 hover:bg-[#eee] px-3 font-semibold  border-b-[.5px] border-[#">Tops</li></Link>
                    <Link onClick={()=>setActive(!active)} to={"bottoms"}><li className="py-2 hover:bg-[#eee] px-3 font-semibold  border-b-[.5px] border-[#">Bottom</li></Link>
            </ul>
    </div>
    
  );
}
