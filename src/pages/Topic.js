import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import SataicBackGround from "../UI/SataicBackGround";
import SubCategories from "../components/subCategory/SubCategories";
import ProductsAll from "../components/products/ProductsAll";

export default function Topic() {
  const { search, value } = useParams();
    
  useEffect(()=>{
      
  },[value,search])
  return (
       <div>
<SataicBackGround />

<SubCategories value={value} search={search} />
<ProductsAll value={value} search={search} />
</div> 
  );
}
