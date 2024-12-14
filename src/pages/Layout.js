import React, { useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import Header from "../UI/Header";
import WideNav from "../components/WideNav";
import SmallNav from "../components/SmallNav";
import ResponsiveNav from "../UI/ResponsiveNav";
import Option from "../components/Option";
import Search from "./Search";

export default function Layout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue,setSearchValue] = useState("")
  const toggle = searchParams.get("Toggle")
  return (
    <div>
      <header className="w-full  ">
        <Header />
      </header>
      {localStorage.getItem("token")&&<div className="w-full hidden md:block ">
        <WideNav searchValue={searchValue}  setSearchValue ={setSearchValue} />
      </div>}
      
      <div className="w-full block md:hidden">
        <ResponsiveNav />
      </div>
      <SmallNav />
      <main className="">
        { toggle =="true" && <Option/>}
        {searchValue && <Search searchValue = {searchValue}/>}
        <Outlet />
      </main>
    </div>
  );
}
