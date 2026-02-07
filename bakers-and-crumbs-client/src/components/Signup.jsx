import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Modal from './Modal';
import { AuthContext } from '../contexts/AuthProvider';
import axios from 'axios';
import useAxiosPublic from '../hooks/useAxiosPublic';

const Signup = () => {
    const { createUser, login, signUpWithGmail, updateUserProfile } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic(); 
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    const onSubmit = (data) => {
        const { name, email, password } = data;  // Destructure name here

        createUser(email, password)
            .then((result) => {
                const user = result.user;
                updateUserProfile(name, null).then(() => {  // Use name for profile update
                    const userInfo = {
                        name,
                        email,
                    };
                    axiosPublic.post('/users', userInfo)
                        .then(() => {
                            alert("Account Created Successfully");
                            navigate(from, { replace: true });
                        })
                        .catch((error) => {
                            console.error("Error creating user info:", error);
                        });
                });
            })
            .catch((error) => {
                console.error("Error creating user:", error);
                alert("Error creating user. Please try again.");
            });
    };

    const handleLogin = () => {
        signUpWithGmail()
            .then((result) => {
                const user = result.user;
                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                };
                axiosPublic.post('/users', userInfo)
                    .then(() => {
                        alert("Account Created Successfully");
                        navigate("/");  // Redirect to home
                    })
                    .catch((error) => {
                        console.error("Error creating user info:", error);
                    });
            })
            .catch((error) => {
                console.error("Error signing in with Google:", error);
                alert("Error signing in with Google. Please try again.");
            });
    };

    return (
        <div className='min-h-screen bg-white flex items-center justify-center'>
            <div className='max-w-md bg-white shadow w-full flex items-center justify-center'>
                <div className="modal-action flex flex-col justify-center mt-0 bg-white">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
                        <h3 className='font-bold text-lg'>Create an Account</h3>

                        {/* Name Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Name"
                                className="bg-white input input-bordered"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                        </div>

                        {/* Email Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Email"
                                className="bg-white input input-bordered"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                        </div>

                        {/* Password Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="bg-white input input-bordered"
                                {...register("password", { required: "Password is required" })}
                            />
                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                            <label className="label mt-1">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>

                        {/* Sign Up Button */}
                        <div className="form-control mt-6">
                            <input type="submit" value="Sign Up" className="btn bg-pink text-white border-pink" />
                        </div>

                        <p className='text-center my-2'>Have an account? <button
                            className="underline text-red-500 ml-1"
                            onClick={() => document.getElementById("my_modal_5").showModal()}
                        >
                            Login
                        </button>
                        </p>
                        <Link
                            to="/"
                            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
                        >
                            X
                        </Link>
                    </form>

                    {/* Social Sign-In */}
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
                <Modal />
            </div>
        </div>
    );
};

export default Signup;