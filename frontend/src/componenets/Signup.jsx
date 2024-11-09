import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const form = location.state?.form?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const name = data.name;
      const email = data.email;
      const password = data.password;
      const result = await axios.post(
        `${process.env.REACT_APP_BASEURL}/users`,
        {
          email: data.email,
          name: data.name,
          password: data.password,
        }
      );
      console.log(result);
      alert("Account creation was successful");
      navigate(form, { replace: true });
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="modal-action flex-col justify-center mt-0">
        <form
          className="card-body"
          method="dialog"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="font-bold medium-text">Create a Account by raja</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="name"
              placeholder="Your name"
              className="input input-bordered"
              {...register("name")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register("password")}
            />
            <label className="label mt-1">
              <a href="/" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          {/* error text */}

          <div className="form-control mt-6">
            <input
              type="submit"
              value="Signup"
              className="btn bg-green text-white"
            />
          </div>
          <p className="text-center my-2 medium-text">
            Have a account ?{" "}
            <button
              className="underline text-red mt-1"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              Login
            </button>
          </p>
          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>
        </form>
        {/* social login */}
        <div className="text-center space-x-3 mb-5">
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaGoogle />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaGithub />
          </button>
        </div>
      </div>
      <Modal />
    </div>
    //   <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
    //   <div className="mb-5">
    //     <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
    //       <h3 className="font-bold text-lg">Please Create An Account!</h3>
    //       {/* name */}
    //       <div className="form-control">
    //         <label className="label">
    //           <span className="label-text">Name</span>
    //         </label>
    //         <input
    //           type="name"
    //           placeholder="Your name"
    //           className="input input-bordered"
    //           {...register("name")}
    //         />
    //       </div>

    //       {/* email */}
    //       <div className="form-control">
    //         <label className="label">
    //           <span className="label-text">Email</span>
    //         </label>
    //         <input
    //           type="email"
    //           placeholder="email"
    //           className="input input-bordered"
    //           {...register("email")}
    //         />
    //       </div>

    //       {/* password */}
    //       <div className="form-control">
    //         <label className="label">
    //           <span className="label-text">Password</span>
    //         </label>
    //         <input
    //           type="password"
    //           placeholder="password"
    //           className="input input-bordered"
    //           {...register("password")}
    //         />
    //         <label className="label">
    //           <a href="#" className="label-text-alt link link-hover mt-2">
    //             Forgot password?
    //           </a>
    //         </label>
    //       </div>

    //       {/* error message */}
    //       <p>{errors.message}</p>

    //       {/* submit btn */}
    //       <div className="form-control mt-6">
    //         <input
    //           type="submit"
    //           className="btn bg-green text-white"
    //           value="Sign up"
    //         />
    //       </div>

    //       <div className="text-center my-2">
    //         Have an account?
    //         <Link to="/login">
    //           <button className="ml-2 underline">Login here</button>
    //         </Link>
    //       </div>
    //     </form>
    //     <div className="text-center space-x-3">
    //       <button
    //         // onClick={handleRegister}
    //         className="btn btn-circle hover:bg-green hover:text-white"
    //       >
    //         <FaGoogle />
    //       </button>
    //       <button className="btn btn-circle hover:bg-green hover:text-white">
    //         <FaFacebookF />
    //       </button>
    //       <button className="btn btn-circle hover:bg-green hover:text-white">
    //         <FaGithub />
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Signup;
