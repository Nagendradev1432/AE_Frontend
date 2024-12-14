import React from "react";
import { Link } from "react-router-dom";

export default function SubCategory({sub}) {
  return (
    <li className="text-center">
      <Link to={`/${sub.gender}/${sub.name}/${sub._id}`}>
            <img className="rounded-full w-[120px] h-[120px]" src={sub.image.secure_url} alt="sub"/>

      </Link>
      <p>{sub.name}</p>
    </li>
  );
}
