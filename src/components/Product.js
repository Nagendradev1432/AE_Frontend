import React from "react";

import { Link } from "react-router-dom";

export default function Product({ product }) {
  const { discount } = product || 0;
  return (
    <Link to={`product/${product._id}`} className={` px-3 py-4 `}>
      <img src={product.imageCover.secure_url} alt="imageCover" />
      <div className="data h-[170px]">
        <p className="h-[50px] ">{product.title}</p>
        <div className="flex gap-x-3 flex-wrap h-[50px]">
          {product.discount && (
            <p className="text-[#252525] line-through">
              EGP {Math.floor(product.price / (product.discount / 100))}.00
            </p>
          )}
          {discount && (
            <p className={`${product.discount && "text-red-500"}`}>
              EGP {Math.floor(product.price / (discount / 100) - product.price)}
              .00{" "}
            </p>
          )}
          {!discount && (
            <p className={`${product.discount && "text-red-500"}`}>
              EGP {Math.floor(product.price)}.00{" "}
            </p>
          )}
          <p className="text-red-600 text-sm w-full">
            {product.discount ? `(save ${product.discount}%)` : "(no discount)"}
          </p>
        </div>
        <p>Rate:{product.rate}</p>
        
      </div>
    </Link>
  );
}
