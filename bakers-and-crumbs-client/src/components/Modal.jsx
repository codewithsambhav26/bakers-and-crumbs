
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from '../contexts/AuthProvider';
import axios from 'axios';

const Modal = () => {
  const { login, signUpWithGmail } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL; // Using environment variable

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    login(email, password)
      .then((result) => {
        const user = result.user;
        const userInfor = {
          name: data.name,
          email: data.email,
        };
        axios.post(`${API_BASE_URL}/users`, userInfor)
          .then((response) => {
            alert("Account Created Successfully");
            navigate(from, { replace: true });
          });
        alert("Login successful");
        navigate(from);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage("Please provide a valid email & password");
      });
    reset();
  };

  const handleLogin = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfor = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };

        axios.post(`${API_BASE_URL}/users`, userInfor)
          .then((response) => {
            alert("Account Created Successfully");
            navigate("/");
          });
      })
      .catch((error) => console.log(error));
  };

  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="bg-white modal-box">
        <div className="modal-action flex flex-col justify-center mt-0">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
            <h3 className='font-bold text-lg'>Please Login!</h3>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="email" className="bg-white input input-bordered"
                {...register("email", { required: true })} />
              {errors.email && <span className="text-red-500 text-xs">Email is required</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="password" className="bg-white input input-bordered"
                {...register("password", { required: true })} />
              {errors.password && <span className="text-red-500 text-xs">Password is required</span>}
              <label className="label mt-1">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>

            {errorMessage && <p className='text-red-500 text-xs'>{errorMessage}</p>}

            <div className="form-control mt-6">
              <input type="submit" value="Login" className="btn bg-pink text-white border-pink" />
            </div>

            <p className='text-center my-2'>Don't have an account? <Link to="/signup" className="underline text-red ml-1">Signup Now</Link></p>

            <button
              htmlFor="my_modal_5"
              onClick={() => document.getElementById("my_modal_5").close()}
              className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
            >X</button>
          </form>

          <div className="text-center space-x-3 mb-5">
            <button className="btn btn-circle bg-grey hover:bg-pink hover:text-white" onClick={handleLogin}>
              <FaGoogle />
            </button>
            <button className="btn btn-circle bg-grey hover:bg-pink hover:text-white">
              <FaFacebook />
            </button>
            <button className="btn btn-circle bg-grey hover:bg-pink hover:text-white">
              <FaGithub />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
