import imageAE from "../UI/assits/AE.jpg";
import { useFormik } from "formik";
import * as yup from "yup";
import ErrorComponet from "../UI/ErrorComponet";

import axios from "axios";
import Loader from "../UI/Loader";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { reciveToken } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";



export default function Signin() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch()
const navigate = useNavigate()


    
  
  async function createUser(data) {
    setIsLoading(true);
    await axios
      .post(`https://ae-back-end.vercel.app/api/v1/AE/user/signin`, data)
      .then((res) => {
        setErrorMessage("")
        
        // auth(res.data.token) 
        dispatch(reciveToken(res.data.token))
        navigate("/")
        
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message)
        console.log(err)

      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  let validationSchema = yup.object({
    email: yup.string().email("email not valid").required(),
    password: yup.string().required(),

  });
  const formiksignIN = useFormik({
    initialValues: {
      
      password: "",
      email: "",
      
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
      <div className=" w-4/5 sm:w-2/3 mt-8 mx-auto ">
        {errorMessage?<div><ErrorComponet message={errorMessage} deco={"text-white bg-red-400 text-center px-2 py-1 w-1/2 mx-auto"}/></div> :null}
        <h3 className="text-xl mt-10 pb-2   font-semibold border-b-2 border-[#eee]">
        Sign In
        </h3>
        <div className="flex lg:flex-row flex-col  ">
          <form
            onSubmit={formiksignIN.handleSubmit}
            className="mt-16 lg:w-1/2 w-full border-r-[1px] border-r-[#eee] pe-2"
          >
            <h4 className="font-semibold mb-4 ">SIGN IN WITH EMAIL ADDRESS</h4>

            <div>
              

              <input
                onChange={formiksignIN.handleChange}
                onBlur={formiksignIN.handleBlur}
                value={formiksignIN.values.email}
                type="text"
                name="email"
                placeholder="john@gmail.com"
                className="px-3 py-2 mt-4 border-b-[1px] border-black w-full sm:w-2/3 focus:outline-none"
              />
              {formiksignIN.errors.email && formiksignIN.touched.email ? (
                <ErrorComponet message={formiksignIN.errors.email} />
              ) : null}

              <input
                onChange={formiksignIN.handleChange}
                onBlur={formiksignIN.handleBlur}
                value={formiksignIN.values.password}
                type="password"
                name="password"
                placeholder="1234"
                className="px-3 py-2 mt-4 border-b-[1px] border-black w-full sm:w-2/3 focus:outline-none"
              />
              {formiksignIN.errors.password &&
              formiksignIN.touched.password ? (
                <ErrorComponet message={formiksignIN.errors.password} />
              ) : null}

              
              <button
              disabled={!formiksignIN.isValid || !formiksignIN.dirty}
                type=""
                className={`${
                  isLoading ? "w-2/3 me-3" : "w-2/3"
                } bg-black text-white font-semibold px-3 py-2 rounded-sm mt-4 disabled:bg-[#00000094] disabled:cursor-not-allowed`}
              >
                {isLoading ? <Loader h={30} w={50} /> : "Sign in"}
              </button>
               
              <p className="text-semibold my-3 text-center w-2/3 "><Link to={"/register"}>Create New Email ?</Link></p>
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
