import React from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

export default function Rating({ rate }) {
  let fillStar = [];
  let emptyStar = [];

  for (let i = 0; i < rate; i++) {
    fillStar.push("x");
  }
  for (let i = 0; i < 5 - rate; i++) {
    emptyStar.push("x");
  }
  return (
    <div className="flex items-center">
      {fillStar.map((ele) => {
        return (
          <p key={Math.random()}>
            <FaStar />
          </p>
        );
      })}
      {emptyStar.map((ele) => {
        return (
          <p key={Math.random()}>
            <CiStar />
          </p>
        );
      })}
      <p className="ms-2">({rate})</p>
    </div>
  );
}
