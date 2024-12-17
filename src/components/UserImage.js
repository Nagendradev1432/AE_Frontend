import React, { useState } from "react";
import protImage from "../UI/assits/Userimage.png";
import { useMutation, useQueryClient } from "react-query";

import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../redux/userSlice";
import { IoMdAdd } from "react-icons/io";
import Loader from "../UI/Loader";
export default function UserImage({ show }) {
  const [image, setImage] = useState([]);
  const dispatch = useDispatch();
  function handleChange(e) {
    setImage(e.target.files[0]);
  }
  const user = useSelector((store) => store.user);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationKey: ["imageUpload"],
    mutationFn: () => dispatch(uploadFile(image)),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

    
  if (isLoading) return<div className=" absolute bg-[#0000003c] w-full top-0 left-0 bottom-0 flex justify-center items-center">
          <Loader h={120} w={120} />{" "}
        </div>;

  return (
    <div className=" rounded-full  py-4 flex flex-col flex-wrap  sm:flex-row items-center justify-between max-w-xl mx-auto pt-9 ">
      <div className="relative">
        <img
          className="  bg-white  h-[200px] rounded-full l w-[200px]"
          src={user.image ? user.image.secure_url : protImage}
          alt="mypic"
        />

        <div className="w-full">
        <label
          htmlFor="image"
          className="bg-[#AFC3C2] text-[#1D516D] rounded-full   text-3xl  absolute top-2/3 right-[-5%] cursor-pointer"
        >
        <IoMdAdd />
        </label>
        <input
          className="hidden"
          id="image"
          type="file"
          onChange={handleChange}
        />
        <button className="bg-[#AFC3C2] text-[#1D516D] py-1 px-3 rounded-lg mt-5 mx-auto block" onClick={mutate}>confirm change</button>
      </div>
      </div>

      <div
        className={`infoDiv ${
          show ? "show" : ""
        } mt-5 sm:mt-0 info text-[#1d514e] shadow-lg  py-3 px-6 rounded-md bg-[#cad6d6]`}
      >
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Address: {user.address}</p>
        <p>Gender: {user.gender}</p>
        <p>Role: {user.role}</p>
      </div>

    </div>
  );
}
