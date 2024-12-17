import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { addToCart, getProduct } from "./../utilities/api";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import Button from "../components/Button";
import ProductMainMabyKnow from "../components/mapyknow/ProductMainMabyKnow";
import Loader from "../UI/Loader";
import toast from "react-hot-toast";

const qunatity = [1, 2, 3, 4, 5, 6];
export default function SpecProduct() {
  const { id } = useParams();

  const [visible, setVisible] = useState(false);
  const [indexImage, setIndexImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("s");
  const [amount, setAmount] = useState(1);

  const QueryClient = useQueryClient();
  const { mutate, isLoading: lodaingMutation } = useMutation({
    mutationKey: ["addtocart"],
    mutationFn: () => addToCart(id, selectedSize, amount),
    onSuccess: () => {
      QueryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      toast.success("added to basket successfully");
    },
    onError: (err) => {
      console.log(err);
    },
  });
  async function onclick() {
    mutate();
  }

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["productss", id],
    queryFn: () => getProduct(id),
    
  });
  useEffect(() => {}, [id, data]);
  if (isLoading || isFetching  )
    return (
      <div className=" fixed bg-[#0000003c] h-[200vh] w-full top-0 left-0 bottom-0 flex justify-center items-center">
       
        <Loader h={120} w={120} />{" "}
      </div>
    );

  return (
    <div>
        
      <div className="max-w-5xl flex md:flex-row flex-col items-center mx-auto justify-between py-10  ">
        <div className=" sm:w-2/3 w-full  px-5 md:px-0  h-[356px] mb-5">
          <img
            className=" md:w-2/3 w-full mx-auto h-[100%] "
            src={data.data.data.images[indexImage].secure_url}
            alt="img1"
          />
        </div>
        <div className=" md:w-1/2 w-full px-10 ">

          <p className=" uppercase text-sm sm:text-lg">
            {data.data.data.title}
          </p>
          <div className="flex gap-x-3 flex-wrap ">
            {data.data.data.discount && (
              <p className="text-[#252525] line-through">
                EGP{" "}
                {Math.floor(
                  data.data.data.price +
                    data.data.data.price * (data.data.data.discount / 100)
                )}
                .00
              </p>
            )}
            {data.data.data.discount && (
              <p className={`${data.data.data.discount && "text-red-500"}`}>
                EGP {data.data.data.price}
                .00{" "}
              </p>
            )}
            {!data.data.data.discount && (
              <p className={`${data.data.data.discount && "text-red-500"}`}>
                EGP {Math.floor(data.data.data.price)}.00{" "}
              </p>
            )}
            <p className="text-red-600 text-sm w-full">
              {data.data.data.discount
                ? `(save ${data.data.data.discount}%)`
                : "(no discount)"}
            </p>
           
          </div>
          <ul className="flex gap-x-5 mt-5 justify-center">
            {data.data.data.colors.map((color, index) => (
              <button
                onClick={() => setIndexImage(index)}
                className="rounded-full w-8 h-8  border-2 border-[#dcdbdb]  focus:border-none focus:ring-[1px] focus:ring-black transition-all duration-75"
                key={index}
                style={{ backgroundColor: `#${color}` }}
              ></button>
            ))}
          </ul>
          <div className="flex mt-5 mb-2 justify-between items-center text-sm font-thin">
            <p className="border-b-[1px] border-[#333]">Select Size</p>
            <p className="border-b-[1px] border-[#333]">Quantity</p>
          </div>
          <div className="flex gap-x-3 relative justify-between  ">
            <Listbox value={selectedSize} onChange={setSelectedSize}>
              <ListboxButton
                className={
                  "border-[1px] border-[#3333] mt-0 w-[270px] h-[30px]  py-0"
                }
              >
                {selectedSize}
              </ListboxButton>
              <ListboxOptions
                anchor="bottom"
                className=" border-[1px] border-[#eee] w-[260px] text-center "
              >
                {data.data.data.size.map((size) => (
                  <ListboxOption
                    key={size}
                    value={size}
                    className="border-b-[1px] py-1 hover:bg-[#eee] transition-all duration-75 cursor-pointer bg-white border-[#eee] w-full"
                  >
                    {size}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Listbox>

            <Listbox value={amount} onChange={setAmount}>
              <ListboxButton
                className={
                  "border-[1px] border-[#3333] mt-0 w-[70px] h-[30px]  py-0"
                }
              >
                {amount}
              </ListboxButton>
              <ListboxOptions
                anchor="bottom"
                className=" border-[1px] border-[#eee] w-[70px] bg-white text-center "
              >
                {qunatity.map((number) => (
                  <ListboxOption
                    key={number}
                    value={number}
                    className="border-b-[1px] py-1 hover:bg-[#eee] transition-all duration-75 cursor-pointer border-[#eee] w-full"
                  >
                    {number}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Listbox>
          </div>
          {!lodaingMutation?<Button
            text={"Add To Basket"}
            decoration={"bg-black py-2 px-4 text-white w-full my-5 "}
            fn={onclick}
          />: <p className="bg-black py-2 px-4 text-white w-full my-5"><Loader w={30} h={30}/></p>}

          {data.data.data.description && (
            <div className="py-3 border-t-[1px] border-[#333]">
              <h5 className="font-semibold">Product Description</h5>
              {data.data.data.description.split("").length > 50 ? (
                <p className="font-thin ">
                  <span>
                    {!visible
                      ? data.data.data.description
                          .split("")
                          .splice(0, 50)
                          .join("")
                      : data.data.data.description}
                  </span>{" "}
                  <span
                    className="font-semibold text-[#838383] cursor-pointer"
                    onClick={() => setVisible(!visible)}
                  >
                    {!visible ? "read more...." : "read less"}
                  </span>
                </p>
              ) : (
                <p className="font-thin "> {data.data.data.description}</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mb-10 md:mt-32 ">
        <p className="font-semibold mx-auto w-fit px-3 py-4 text-lg">
          You May Also Like
        </p>
        <ProductMainMabyKnow subCategory={data.data.data.subCategory} />
      </div>
    </div>
  );
}
