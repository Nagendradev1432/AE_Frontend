import React from "react";
import { useParams } from "react-router-dom";
import ProductsAll from "../components/products/ProductsAll";

export default function EachSubCategory() {
  const { gender, id } = useParams();
  return (
    <div>
      <ProductsAll search={"subCategory"} value={id} />
    </div>
  );
}
