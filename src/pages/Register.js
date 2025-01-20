import React, { useState } from "react";
import imageAE from "../UI/assits/AE.jpg";
import { useFormik } from "formik";
import * as yup from "yup";
import ErrorComponet from "../UI/ErrorComponet";
import { baseUrl } from "../utilities/api";
import axios from "axios";
import Loader from "../UI/Loader";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
 
  
  async function createUser(data) {
    setIsLoading(true);
    await axios
      .post(`${baseUrl}user/signup`, data)
      .then((res) => {
        setErrorMessage("")
        navigate("/login")
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message)
        

      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  let validationSchema = yup.object({
    name: yup.string().min(3, "too short").max(30, "too long").required(),
    email: yup.string().email("email not valid").required(),
    password: yup.string().required(),
    address: yup.string().required(),
    phone: yup
      .string()
      .matches(/^01[1250][0-9]{8}$/, "invalid number")
      .required(),
    gender: yup.string().required(),
  });
  const formikRegister = useFormik({
    initialValues: {
      name: "",
      phone: "",
      address: "",
      password: "",
      email: "",
      gender: "male",
    },
    onSubmit: (data) => {
      createUser(data);
    },
    validationSchema: validationSchema,
  });
  return (
    <div className="my-16 ">
      <h1 className="text-center font-bold text-2xl tracking-[10px]">
        AMERICAN EAGLE
      </h1>
      <div className="  w-4/5 sm:w-2/3 mt-8 mx-auto ">
        {errorMessage?<div><ErrorComponet message={errorMessage} deco={"text-white bg-red-400 text-center px-2 py-1 w-1/2 mx-auto"}/></div> :null}
        <h3 className=" text-lg sm:text-xl mt-10 pb-2   font-semibold border-b-2 border-[#eee]">
          Create An Account
        </h3>
        <div className="flex lg:flex-row flex-col  ">
          <form
            onSubmit={formikRegister.handleSubmit}
            className="mt-16 lg:w-1/2 w-full border-r-[1px] border-r-[#eee] pe-2"
          >
            <h4 className="font-semibold mb-4  ">SIGN UP WITH EMAIL ADDRESS</h4>

            <div>
              <input
                onChange={formikRegister.handleChange}
                onBlur={formikRegister.handleBlur}
                value={formikRegister.values.name}
                type="text"
                name="name"
                placeholder="john"
                className="px-3 py-2 mt-4 border-b-[1px] border-black w-full sm:w-2/3 focus:outline-none"
              />
              {formikRegister.errors.name && formikRegister.touched.name ? (
                <ErrorComponet message={formikRegister.errors.name} />
              ) : null}

              <input
                onChange={formikRegister.handleChange}
                onBlur={formikRegister.handleBlur}
                value={formikRegister.values.email}
                type="text"
                name="email"
                placeholder="john@gmail.com"
                className="px-3 py-2 mt-4 border-b-[1px] border-black w-full sm:w-2/3 focus:outline-none"
              />
              {formikRegister.errors.email && formikRegister.touched.email ? (
                <ErrorComponet message={formikRegister.errors.email} />
              ) : null}

              <input
                onChange={formikRegister.handleChange}
                onBlur={formikRegister.handleBlur}
                value={formikRegister.values.password}
                type="password"
                name="password"
                placeholder="1234"
                className="px-3 py-2 mt-4 border-b-[1px] border-black w-full sm:w-2/3 focus:outline-none"
              />
              {formikRegister.errors.password &&
              formikRegister.touched.password ? (
                <ErrorComponet message={formikRegister.errors.password} />
              ) : null}

              <input
                onChange={formikRegister.handleChange}
                onBlur={formikRegister.handleBlur}
                value={formikRegister.values.phone}
                type="text"
                name="phone"
                placeholder="01012453357"
                className="px-3 py-2 mt-4 border-b-[1px] border-black w-full sm:w-2/3 focus:outline-none"
              />
              {formikRegister.errors.phone && formikRegister.touched.phone ? (
                <ErrorComponet message={formikRegister.errors.phone} />
              ) : null}

              <input
                onChange={formikRegister.handleChange}
                onBlur={formikRegister.handleBlur}
                value={formikRegister.values.address}
                type="text"
                name="address"
                placeholder="hyderabad"
                className="px-3 py-2 mt-4 border-b-[1px] border-black w-full sm:w-2/3 focus:outline-none"
              />
              {formikRegister.errors.address &&
              formikRegister.touched.address ? (
                <ErrorComponet message={formikRegister.errors.address} />
              ) : null}
              <select
                name="gender"
                className="px-3 py-2 mt-4 border-b-[1px] border-black w-full sm:w-2/3 focus:outline-none"
                onChange={formikRegister.handleChange}
                onBlur={formikRegister.handleBlur}
                value={formikRegister.values.gender}
              >
                <option value={"male"}>male</option>
                <option value={"female"}>female</option>
              </select>
              {formikRegister.errors.gender && formikRegister.touched.gender ? (
                <ErrorComponet message={formikRegister.errors.gender} />
              ) : null}
              <button
              disabled={!formikRegister.isValid || !formikRegister.dirty}
                type=""
                className={`${
                  isLoading ? "w-2/3 me-3" : "w-2/3"
                } bg-black text-white font-semibold px-3 py-2 rounded-sm mt-4 disabled:bg-[#00000094] disabled:cursor-not-allowed`}
              >
                {isLoading ? <Loader h={30} w={50} /> : "Create An Account"}
              </button>
            </div>
          </form>
          <div className="lg:w-1/2 w-full  pt-10">
            <img alt="AE" src={imageAE} className=" h-[100%]" />
          </div>
        </div>
      </div>
    </div>
  );
}
