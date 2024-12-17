import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Back({ deco }) {
  const navigate = useNavigate();
  return (
    <div
      className={` ${deco} text-[25px] sm:text-3xl  flex items-center flex-row-reverse gap-x-4 cursor-pointer    rounded-lg`}
      onClick={() => navigate(-1)}
    >
      <div>
        <FaArrowLeftLong />
      </div>
    </div>
  );
}
