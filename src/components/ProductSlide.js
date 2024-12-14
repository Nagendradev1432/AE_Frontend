import React from "react";
import { useQuery } from "react-query";
import { getAllProducts } from "../utilities/api";

import Product from "./Product";
import Slider from "react-slick";

const CustomArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{
      ...style,
      display: "block",
      color: "black",
      background: "#333",
      borderRadius: "50%",
    }}
    onClick={onClick}
  />
);

export default function ProductSlide() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <CustomArrow />, // Custom next arrow
    prevArrow: <CustomArrow />, // Custom 
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, // For tablets and small desktops
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots:true
        },
      },
      {
        breakpoint: 2524, // For tablets and small desktops
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          dots:true
        },
      },
      {
        breakpoint: 768, // For tablets
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 480, // For mobile devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  };
  const { data, isError, isFetching } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  
  if (isError || isFetching) {
    return <p>LoadINg</p>;
  }
  return (
    <div className=" mb-10  md:overflow-auto overflow-hidden mx-auto ">
      <Slider {...settings} className="m">
        {data.data.data.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </Slider>
    </div>
  );
}
