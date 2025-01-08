import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";

const Modal = () => {
  const [errorMessage, seterrorMessage] = useState("");
  const { user, setUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const form = location.state?.form?.pathname || "/";
  //react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const email = data.email;
      const password = data.password;
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/users/signin`,
        {
          email: data.email,
          password: data.password,
        }
      );
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify({ user: response.data.user }));
      localStorage.setItem("token", JSON.stringify({ token: response.data.token }));
      // const user = result.user;
      //console.log(user);
      alert("Login Was done");
      document.getElementById("my_modal_5").close();
      navigate(form, { replace: true });
    } catch (error) {
      const errorMessage = error.message;
      seterrorMessage("Please provide valid email & password!");
    }
  };
  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box ">
        <div className="modal-action flex-col justify-center mt-0">
          <form
            className="card-body"
            method="dialog"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="font-bold medium-text">Please Login!</h3>
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
                {...register("password", { required: true })}
              />
              <label className="label mt-1">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            {/* error text */}

            {errorMessage ? (
              <p className="text-red text-xs italic">{errorMessage}</p>
            ) : (
              ""
            )}

            <div className="form-control mt-4">
              <input
                type="submit"
                value="login"
                className="btn bg-green text-white"
              />
            </div>
            <div
              htmlFor="my_modal_5"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_5").close()}
            >
              ✕
            </div>
            <p className="text-center my-2 medium-text">
              Don't have an account ?{" "}
              <Link to="/signup" className="underline text-red mt-1">
                Signup Now
              </Link>
            </p>
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
      </div>
    </dialog>
  );
};

export default Modal;
