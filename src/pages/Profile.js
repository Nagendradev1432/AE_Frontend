import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { getUser } from "../utilities/api";
import { setImage } from "../redux/userSlice";
import UserImage from "../components/UserImage";
import { Link } from "react-router-dom";
import Loader from "../UI/Loader";

export default function Profile() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const {
    
    isLoading: getLoading,
    
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    onSuccess: (data) => {
      dispatch(setImage(data.data.data.image));
      
    },
  });

  if (getLoading )
    return (
      <div className=" absolute bg-[#0000003c] w-full top-0 left-0 bottom-0 flex justify-center items-center">
        <Loader h={120} w={120} />{" "}
      </div>
    );

  return (
    <div className="h-auto pb-5 bg-[#EEEEEE] px-4">
      <div>
        <UserImage show={show} />
      </div>

      <div className="max-w-xl mx-auto ">
        <p>{user.name}</p>
        <h2 className="text-5xl font-thin ">Profile</h2>
        <hr className="bg-black text-black h-[1.5px] w-[10%] mb-4 mt-8" />
        <hr className="bg-black text-black h-[1.5px] w-[80%] mb-2" />
        <hr className="bg-black text-black h-[1.5px] w-[10%] mb-2" />
      </div>

      <div className="max-w-xl mx-auto mt-7 ">
        <ul>
          <li className="mb-0 py-5 sm:py-0 bg-[#EEEEEE] sm:mb-3">
            <Link
              to={"/cart"}
              className="flex bg-[#CAD6D6] rounded-2xl items-center font-semibold gap-x-5"
            >
              <div className="bg-[#AFC3C2] w-[10%] py-5  rounded-2xl rounded-e-none ">
                <p className="border-[1px] border-black w-[15px] mx-auto  rounded-full h-[15px]"></p>
              </div>

              <p> CART </p>
            </Link>
          </li>
          <li className="mb-0 py-5 sm:py-0 bg-[#EEEEEE] sm:mb-3">
            <Link
              to={"/wishList"}
              className="flex bg-[#CAD6D6] rounded-2xl items-center font-semibold gap-x-5"
            >
              <div className="bg-[#AFC3C2] w-[10%] py-5 rounded-e-none  rounded-2xl">
                <p className="border-[1px] border-black w-[15px] mx-auto  rounded-full h-[15px]"></p>
              </div>

              <p> WISHLIST </p>
            </Link>
          </li>
          <li className="mb-0 py-5 sm:py-0 bg-[#EEEEEE] sm:mb-3">
            <Link
              to={"/orders"}
              className="flex bg-[#CAD6D6] rounded-2xl items-center font-semibold gap-x-5"
            >
              <div className="bg-[#AFC3C2] w-[10%] py-5 rounded-e-none rounded-2xl">
                <p className="border-[1px] border-black w-[15px] mx-auto  rounded-full h-[15px]"></p>
              </div>

              <p> ORDERS </p>
            </Link>
          </li>
          <li
            onClick={() => setShow(!show)}
            className="mb-0 py-5 sm:py-0 bg-[#EEEEEE] sm:mb-3 "
          >
            <div className="flex cursor-pointer relative bg-[#CAD6D6] rounded-2xl items-center font-semibold gap-x-5">
              <div className="bg-[#AFC3C2] w-[10%] py-5 rounded-e-none  rounded-2xl">
                <p className="border-[1px] border-black w-[15px] mx-auto  rounded-full h-[15px]"></p>
              </div>

              <p> INFO </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
