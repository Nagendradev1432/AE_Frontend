import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signout } from "../redux/userSlice";
import axios from "axios";
import { baseUrl } from "../utilities/api";

import protImage from "../UI/assits/Userimage.png";

export default function Header() {
  let location = useLocation();

  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handlesignOut() {
    await axios
      .post(
        `${baseUrl}user/signout`,
        {},
        {
          headers: {
            token: user.token,
          },
        }
      )
      .then((res) => {
        
        dispatch(signout());
        navigate("/login");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="flex justify-between md:px-16  bg-[#EEEEEE] items-center  ">
      <div className="logo -tracking-tighter bg-white px-2 py-7 ">
        AMERICAN EAGLE
      </div>
      {!user.token && (
        <ul className="flex ">
          <li
            className={`${
              location.pathname === "/register" ? "bg-white" : ""
            }   py-4 px-3`}
          >
            <Link to={"/register"}> Register </Link>
          </li>
          <li
            className={`${
              location.pathname === "/login" ? "bg-white" : ""
            }   py-4 px-3`}
          >
            <Link to={"/login"}> signin </Link>
          </li>
        </ul>
      )}
      {user.token && (
        <ul className="flex  items-center">
          <li className="py-7 px-3 hidden md:block hover:bg-white transition-all duration-75 text-sm  font-thin">
            <Link to={"/"}>welcome,{user.name}</Link>
          </li>
          <li className="py-7 px-3 hidden md:block hover:bg-white transition-all duration-75 text-sm  font-thin">
            <Link to={"/profile"}>my account</Link>
          </li>

          <li className=" px-3 block md:hidden  transition-all duration-75 text-3xl  font-thin">
            <Link to={"/profile"}>
              <img
                className="h-[50px] rounded-full w-[50px]"
                src={user.image ? user.image.secure_url : protImage}
                alt="portfolio"
              />
            </Link>
          </li>
          <li
            onClick={handlesignOut}
            className={`${
              location.pathname === "/login" ? "bg-white" : ""
            }   py-7 px-3 hover:bg-white transition-all duration-75  md:text-sm  font-thin`}
          >
            <Link to={"/login"}> logout </Link>
          </li>
          <li className=" px-3 hidden md:block  transition-all duration-75 text-sm    font-thin">
          <Link to={"/profile"}>
          <img
          className="h-[50px] rounded-full w-[50px]"
          src={user.image ? user.image.secure_url : protImage}
          alt="portfolio"
          />
          </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
