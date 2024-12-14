import React from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'

export default function SataicBackGround() {
  const navigate = useNavigate()
  function handleClick(name,id){
    navigate(`/${name}/${id}`)
  }
  return (
    <div className="seltectedStyle">
        <p className="  py-3  text-[25px]  lg:text-[50px]  text-[#004D43] font-bold text-center px-4">
          30%-50% Off{" "}
        </p>
        <p className="  py-3 text-[25px] lg:text-[50px]  text-[#004D43] font-bold text-center px-4">
          On Selected Styles
        </p>
        <div className="flex flex-wrap  justify-center py-4">
          <Button
            text={"Men Tops"}
            decoration={
              "bg-[#004D43] text-white py-2 px-10 rounded-full block ms-3 my-3 mx-3 w-[60%] md:w-auto "
            }
            fn={()=>handleClick("topsmale","67536287793b503015d75ab7")}
          />
          
          <Button
            text={"Men Bottoms"}
            decoration={
              "bg-[#004D43] text-white py-2 px-10 rounded-full block ms-3 my-3 mx-3 w-[60%] md:w-auto "
            }
            fn={()=>handleClick("bottomsMale","6753627d793b503015d75ab2")}

          />
          <Button
            text={"Women Top"}
            decoration={
              "bg-[#004D43] text-white py-2 px-10 rounded-full block ms-3 my-3 mx-3 w-[60%] md:w-auto "
            }
            fn={()=>handleClick("femaleTop","67536231f615e7cfa18e90f2")}
          />
          <Button
            text={"Women Bottom"}
            decoration={
              "bg-[#004D43] text-white py-2 px-10 rounded-full block ms-3 my-3 mx-3 w-[60%] md:w-auto "
            }
            fn={()=>handleClick("Feamlebottom","6753623bf615e7cfa18e90f6")}
          />
        </div>
      </div>
  )
}
