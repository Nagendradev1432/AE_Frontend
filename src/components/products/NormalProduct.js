import React from "react";
import Button from "../Button";
import Rating from "../../UI/Rating";
import { Link, useSearchParams } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useMutation, useQueryClient } from "react-query";
import { addToWhishList, deleteFromWishList } from "../../utilities/api";
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from "../../redux/userSlice";

export default function NormalProduct({ product }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const userWishList = useSelector(store => store.user.wishList) 
  let flage = false;

  const dispatch = useDispatch()

    if(userWishList.length){
      userWishList.forEach(element => {
            if(product._id == element.product){
              flage = true 
            }else{
             
            }
      });
    }else{

    }

  function handleClick(id) {
    setSearchParams({ productId: id, Toggle: true });
  }

  const QueryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["wishListPro"],
    mutationFn: () =>
      !flage
        ? addToWhishList(product._id)
        : deleteFromWishList(product._id),
    onSuccess: () => {
      dispatch(getUser())
      QueryClient.invalidateQueries({
        queryKey: ["wishList"],
       
      });

      QueryClient.invalidateQueries({
        queryKey: ["proo"],
      });
      QueryClient.invalidateQueries({
        queryKey: ["pro"],
      });
    },
    onError: (err) => {
      console.log("err", err);
    },
  });

  return (
    <div className="lg:w-1/4 sm:w-1/3 mx-auto px-3 py-4 relative">
      <div
        onClick={mutate}
        className="text-2xl absolute cursor-pointer  right-6 top-6 font-thin"
      >
        {!flage ? <FaRegHeart /> : <FaHeart />}
      </div>
      <Link to={`/product/${product._id}`}>
        <img src={product.imageCover.secure_url} alt="imageCover" />
        <div className="data ">
          <p className=" mb-1 text-sm">
            {product.title.split("").slice(0, 30).join("")}
          </p>
          <div className="flex gap-x-3 flex-wrap ">
            {product.discount && (
              <p className="text-[#252525] line-through">
                EGP
                {Math.floor(
                  product.price + product.price * (product.discount / 100)
                )}
                .00
              </p>
            )}
            {product.discount && (
              <p className={`${product.discount && "text-red-500"}`}>
                EGP {Math.floor(product.price)}
                .00
              </p>
            )}
            {!product.discount && (
              <p className={`${product.discount && "text-red-500"}`}>
                EGP {Math.floor(product.price)}.00{" "}
              </p>
            )}
            <p className="text-red-600 text-sm w-full">
              {product.discount
                ? `(save ${product.discount}%)`
                : "(no discount)"}
            </p>
          </div>
          <Rating rate={product.rate} />
        </div>
      </Link>
      <div className=" flex items-center justify-center">
        <Button
          text={"view options"}
          decoration={
            "px-3 py-1 border-[.5px] border-black my-5   rounded-sm block mx-auto w-2/3 "
          }
          fn={() => handleClick(product._id)}
        />
      </div>
    </div>
  );
}
