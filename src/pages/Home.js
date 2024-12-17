
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from "../components/Button";
import wideImage from "../UI/assits/wideImage1.webp";
import ProductSlide from "../components/ProductSlide";
import { useNavigate } from "react-router-dom";
import SataicBackGround from "../UI/SataicBackGround";
import {getUser} from "../redux/userSlice"
export default function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  if(localStorage.getItem("token")){
    
    dispatch(getUser());
    console.log("welcome")
  }
  function handleClick(name,id){
    navigate(`/${name}/${id}`)
  }

  return (
    <div>
      <div className=" bg-[#333333]  mb-5 ">
        <div className="flex justify-between px-2 lg:px-5 py-1 text-[#eee] flex-wrap w:full  lg:w-2/3 mx-auto text-xs lg:text-base">
          <p>Fast delivery available in selected areas</p>
          <p>Shop online 24/7</p>
          <p>offers online</p>
        </div>
      </div>
      <SataicBackGround/>
      <div className="mt-4">
        <img src={wideImage} alt="imgBack" />
        <div className="text-center bg-[#004D43] text-white">
          <p className="text-3xl sm:text-5xl py-5  font-bold">Now Trending</p>
          <p className="text-xs sm:text-base">New Arrivals you need now.</p>
          <div className="flex flex-wrap justify-center py-4">
            
          <Button
          text={"Men Tops"}
          decoration={
            "bg-[#004D43] border-[.5px] border-[#EEE] text-white py-2 px-10 rounded-full block ms-3 my-3 mx-3 w-[60%] md:w-auto "
          }
          fn={()=>handleClick("topsmale","67536287793b503015d75ab7")}
        />
        
        <Button
          text={"Men Bottoms"}
          decoration={
            "bg-[#004D43] border-[.5px] border-[#EEE] text-white py-2 px-10 rounded-full block ms-3 my-3 mx-3 w-[60%] md:w-auto "
          }
          fn={()=>handleClick("bottomsMale","6753627d793b503015d75ab2")}

        />
        <Button
          text={"Women Top"}
          decoration={
            "bg-[#004D43] border-[.5px] border-[#EEE] text-white py-2 px-10 rounded-full block ms-3 my-3 mx-3 w-[60%] md:w-auto "
          }
          fn={()=>handleClick("femaleTop","67536231f615e7cfa18e90f2")}
        />
        <Button
          text={"Women Bottom"}
          decoration={
            "bg-[#004D43] border-[.5px] border-[#EEE] text-white py-2 px-10 rounded-full block ms-3 my-3 mx-3 w-[60%] md:w-auto "
          }
          fn={()=>handleClick("Feamlebottom","6753623bf615e7cfa18e90f6")}
        />
            
          </div>
        </div>
      </div>
      <ProductSlide />
    </div>
  );
}
